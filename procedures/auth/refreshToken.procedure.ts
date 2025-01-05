import { authentificatedProcedure } from "../../middlewares/authentificated"
import { publicLoggedProcedure } from "../../middlewares/publicLogged"
import logoutResolver from "../../resolvers/auth/logout.resolver."
import refreshTokenResolver from "../../resolvers/auth/refreshToken.resolver"

export const refreshTokenProcedure = publicLoggedProcedure.mutation(async (opts) => {
   const result = await refreshTokenResolver(opts)
   return result
})
