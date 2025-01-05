import { TRPCError } from "@trpc/server"
import { ResolverOptsType } from "../../types"
import { publicLoggedProcedure } from "../../middlewares/publicLogged"
import { loginProcedure } from "../../procedures/auth/login.procedure"
import { JWTService } from "../../services/jwt.service"
import { AuthentificationService } from "../../services/authentification.service"
import { UserService } from "../../services/user.service"
import { User } from "@prisma/client"
import ms from "ms"

export default async function (opts: ResolverOptsType<typeof publicLoggedProcedure, typeof loginProcedure>) {
   const { email, password } = opts.input
   const ctx = opts.ctx

   const jwtService = new JWTService()
   const authService = new AuthentificationService(jwtService)
   const userService = new UserService()

   const user = await userService.getUserFromDatabaseByEmail(email)

   if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" })
   }

   const passwordMatches = await authService.verifyPassword({
      hashedPassword: user?.password,
      password: password
   })

   if (!passwordMatches) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" })
   }

   delete (user as unknown as Partial<User>).password

   assertUserHasNoPassword(user)

   const accessToken = authService.generateAccessToken(user)
   const refreshToken = await authService.generateRefreshTokenAndSaveInDatabase(user)

   ctx.cookieJar.set("Authentification", accessToken.token, {
      httpOnly: true,
      secure: !(process.env.NODE_ENV !== "production"),
      maxAge: ms(accessToken.expiresIn)
   })

   ctx.cookieJar.set("Refresh", refreshToken.token, {
      httpOnly: true,
      secure: !(process.env.NODE_ENV !== "production"),
      maxAge: ms(refreshToken.expiresAt)
   })

   return user.id
}

function assertUserHasNoPassword(user: Omit<User, "password">): asserts user is Omit<User, "password"> {
   if ("password" in user) {
      throw new Error("User has a password")
   }
}
