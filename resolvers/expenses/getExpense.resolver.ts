import { TRPCError } from "@trpc/server"
import { authentificatedProcedure } from "../../middlewares/authentificated"
import { createExpenseProcedure } from "../../procedures/expenses/createExpense.prodecure"
import { deleteExpenseProcedure } from "../../procedures/expenses/deleteExpense.procedure"
import { ExpenseService } from "../../services/expense.service"
import { ResolverOptsType } from "../../types"

export default async function (opts: ResolverOptsType<typeof authentificatedProcedure, typeof deleteExpenseProcedure>) {
   const { id } = opts.input

   const expenseService = new ExpenseService()

   const expense = await expenseService.getExpenseFromDatabaseById(id)

   if (!expense) {
      throw new TRPCError({
         code: "NOT_FOUND"
      })
   }

   if (expense.userId !== opts.ctx.currentUser.id)
      throw new TRPCError({
         code: "UNAUTHORIZED"
      })

   return expense
}
