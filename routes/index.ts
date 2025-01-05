import { router } from "../trpc"
import { loginProcedure } from "../procedures/auth/login.procedure"
import { registerProcedure } from "../procedures/auth/register.procedure"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { logoutProcedure } from "../procedures/auth/logout.procedure"
import { refreshTokenProcedure } from "../procedures/auth/refreshToken.procedure"

export const appRouter = router({
   login: loginProcedure,
   register: registerProcedure,
   logout: logoutProcedure,
   refreshToken: refreshTokenProcedure
})

export type AppRouter = typeof appRouter

type RouterInput = inferRouterInputs<AppRouter>
type RouterOutput = inferRouterOutputs<AppRouter>

// auth
export type RegisterRouterInput = RouterInput["register"]
export type LoginRouterInput = RouterInput["login"]
export type LogoutRouterInput = RouterInput["logout"]
export type RefreshTokenRouterInput = RouterInput["refreshToken"]

export type RegisterRouterOutput = RouterOutput["register"]
export type LoginRouterOutput = RouterOutput["login"]
export type LogoutRouterOutput = RouterOutput["logout"]
export type RefreshTokenRouterOutput = RouterInput["refreshToken"]
