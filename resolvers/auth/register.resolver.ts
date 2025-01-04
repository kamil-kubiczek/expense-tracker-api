import { publicLoggedProcedure } from "../../middlewares/publicLogged"
import { registerProcedure } from "../../procedures/auth/register.procedure"
import { AuthentificationService } from "../../services/authentification.service"
import { JWTService } from "../../services/jwt.service"
import { UserService } from "../../services/user.service"
import { ResolverOptsType } from "../../types"

export default async function (opts: ResolverOptsType<typeof publicLoggedProcedure, typeof registerProcedure>) {
   const { email, password } = opts.input

   const jwtService = new JWTService()
   const authService = new AuthentificationService(jwtService)
   const userService = new UserService()

   const hashedPassword = await authService.hashPassword(password)

   const user = await userService.createUserInDatabase({ email, hashedPassword })

   return user.id
}
