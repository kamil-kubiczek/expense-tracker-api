import { string, z } from "zod"
import { publicLoggedProcedure } from "../../middlewares/publicLogged"
import loginResolver from "../../resolvers/auth/login.resolver"
import { registerInputSchema } from "./register.procedure"

export const loginInputSchema = registerInputSchema

export const loginProcedure = publicLoggedProcedure.input(loginInputSchema).mutation(async (opts) => {
   const result = await loginResolver(opts)
   return result
})
