import { ResolverOptsType } from "../../types"
import { authentificatedProcedure } from "../../middlewares/authentificated"
import { removeUserProcedure } from "../../procedures/auth/removeUser.procedure"
import { UserService } from "../../services/user.service"

export default async function (opts: ResolverOptsType<typeof authentificatedProcedure, typeof removeUserProcedure>) {
   const ctx = opts.ctx

   const userService = new UserService()

   await userService.removeUserFromDatabase(ctx.currentUser.id)

   ctx.cookieJar.set("Authentification", "")
   ctx.cookieJar.set("Refresh", "")
}
