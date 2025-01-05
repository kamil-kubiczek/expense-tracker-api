import { TRPCError } from "@trpc/server"

import { AuthentificationService } from "../services/authentification.service"
import { JWTService } from "../services/jwt.service"
import { publicLoggedProcedure } from "./publicLogged"
import { UserService } from "../services/user.service"

export const authentificatedProcedure = publicLoggedProcedure.use(async ({ next, ctx }) => {
   const accessToken = ctx.cookieJar.get("Authentification")

   if (!accessToken)
      throw new TRPCError({
         code: "UNAUTHORIZED"
      })

   const authService = new AuthentificationService(new JWTService())

   const decodedUser = authService.decodeUserFromToken(accessToken)

   if (!decodedUser)
      throw new TRPCError({
         code: "NOT_FOUND"
      })

   const userService = new UserService()
   const userExistsInDatabase = await userService.getUserFromDatabaseById(decodedUser.id)

   if (!userExistsInDatabase)
      throw new TRPCError({
         code: "NOT_FOUND"
      })

   return next({
      ctx: {
         currentUser: {
            ...decodedUser
         }
      }
   })
})
