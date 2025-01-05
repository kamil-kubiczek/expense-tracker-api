import { authentificatedProcedure } from "../../middlewares/authentificated"
import removeUserResolver from "../../resolvers/auth/removeUser.resolver"

export const removeUserProcedure = authentificatedProcedure.mutation(async (opts) => {
   const result = await removeUserResolver(opts)
   return result
})
