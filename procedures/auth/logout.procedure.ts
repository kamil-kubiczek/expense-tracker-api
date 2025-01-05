import { authentificatedProcedure } from "../../middlewares/authentificated"
import logoutResolver from "../../resolvers/auth/logout.resolver."

export const logoutProcedure = authentificatedProcedure.mutation(async (opts) => {
   const result = await logoutResolver(opts)
   return result
})
