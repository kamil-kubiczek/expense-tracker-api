import { string, z } from "zod"
import { publicLoggedProcedure } from "../../middlewares/publicLogged"
import registerResolver from "../../resolvers/auth/register.resolver"

export const registerInputSchema = z.object({
   email: string().email().min(4).max(254),
   password: string().min(8).max(64)
})

export const registerProcedure = publicLoggedProcedure.input(registerInputSchema).mutation(async (opts) => {
   const result = await registerResolver(opts)
   return result
})
