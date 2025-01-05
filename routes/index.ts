import { router } from "../trpc"
import { loginProcedure } from "../procedures/auth/login.procedure"
import { registerProcedure } from "../procedures/auth/register.procedure"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { logoutProcedure } from "../procedures/auth/logout.procedure"
import { refreshTokenProcedure } from "../procedures/auth/refreshToken.procedure"
import { createExpenseProcedure } from "../procedures/expenses/createExpense.prodecure"
import { updateExpenseProcedure } from "../procedures/expenses/updateExpense.procedure"
import { deleteExpenseProcedure } from "../procedures/expenses/deleteExpense.procedure"
import { getExpenseProcedure } from "../procedures/expenses/getExpense.prodecure"
import { getExpensesProcedure } from "../procedures/expenses/getExpenses.prodecure"
import { removeUserProcedure } from "../procedures/auth/removeUser.procedure"

export const appRouter = router({
   login: loginProcedure,
   register: registerProcedure,
   logout: logoutProcedure,
   refreshToken: refreshTokenProcedure,
   removeUser: removeUserProcedure,
   createExpense: createExpenseProcedure,
   updateExpense: updateExpenseProcedure,
   deleteExpense: deleteExpenseProcedure,
   getExpense: getExpenseProcedure,
   getExpenses: getExpensesProcedure
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

// expenses
export type CreateExpenseRouterInput = RouterInput["createExpense"]
export type UpdateExpenseRouterInput = RouterInput["updateExpense"]
export type DeleteExpenseRouterInput = RouterInput["deleteExpense"]
export type GetExpenseRouterInput = RouterInput["getExpense"]

export type CreateExpenseRouterOutput = RouterOutput["createExpense"]
export type UpdateExpenseRouterOutput = RouterOutput["updateExpense"]
export type DeleteExpenseRouterOutput = RouterOutput["deleteExpense"]
export type GetExpenseRouterOutput = RouterOutput["getExpense"]
