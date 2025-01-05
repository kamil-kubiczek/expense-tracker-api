import { TRPCError } from "@trpc/server"
import { ResolverOptsType } from "../../types"
import { publicLoggedProcedure } from "../../middlewares/publicLogged"
import { loginProcedure } from "../../procedures/auth/login.procedure"
import { JWTService } from "../../services/jwt.service"
import { AuthentificationService } from "../../services/authentification.service"

import { authentificatedProcedure } from "../../middlewares/authentificated"
import { logoutProcedure } from "../../procedures/auth/logout.procedure"

export default async function (opts: ResolverOptsType<typeof authentificatedProcedure, typeof logoutProcedure>) {
   const ctx = opts.ctx

   const authService = new AuthentificationService(new JWTService())

   await authService.removeRefreshTokenFromDatabase(ctx.currentUser.id)

   ctx.cookieJar.set("Authentification", "")
   ctx.cookieJar.set("Refresh", "")
}
