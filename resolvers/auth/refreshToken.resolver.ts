import { TRPCError } from "@trpc/server"
import { publicLoggedProcedure } from "../../middlewares/publicLogged"
import { refreshTokenProcedure } from "../../procedures/auth/refreshToken.procedure"
import { AuthentificationService } from "../../services/authentification.service"
import { JWTService } from "../../services/jwt.service"
import { ResolverOptsType } from "../../types"
import { UserService } from "../../services/user.service"
import { User } from "@prisma/client"
import ms from "ms"

export default async function (opts: ResolverOptsType<typeof publicLoggedProcedure, typeof refreshTokenProcedure>) {
   const ctx = opts.ctx
   const refreshToken = ctx.cookieJar.get("Refresh")

   assertRefreshTokenIsString(refreshToken)

   const jwtService = new JWTService()
   const authService = new AuthentificationService(jwtService)
   const userService = new UserService()

   const decodedUser = authService.decodeUserFromRefreshToken(refreshToken)

   if (!decodedUser)
      throw new TRPCError({
         code: "NOT_FOUND"
      })

   const user = await userService.getUserFromDatabaseByEmail(decodedUser.email)

   if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" })
   }

   delete (user as unknown as Partial<User>).password

   assertUserHasNoPassword(user)

   const accessToken = authService.generateAccessToken(user)

   ctx.cookieJar.set("Authentification", accessToken.token, {
      httpOnly: true,
      secure: !(process.env.NODE_ENV !== "production"),
      maxAge: ms(accessToken.expiresIn)
   })
}

function assertRefreshTokenIsString(refreshToken: number | string | string[] | undefined): asserts refreshToken is string {
   if (typeof refreshToken !== "string") throw new TRPCError({ code: "BAD_REQUEST" })
}

function assertUserHasNoPassword(user: Omit<User, "password">): asserts user is Omit<User, "password"> {
   if ("password" in user) {
      throw new Error("User has a password")
   }
}
