import { authentificatedProcedure } from "../../middlewares/authentificated"
import { ExpenseService } from "../../services/expense.service"
import { ResolverOptsType } from "../../types"
import { getExpensesProcedure } from "../../procedures/expenses/getExpenses.prodecure"

export default async function (opts: ResolverOptsType<typeof authentificatedProcedure, typeof getExpensesProcedure>) {
   const { filters } = opts.input

   const expenseService = new ExpenseService()

   const expenses = await expenseService.getExpensesFromDatabaseByUserId(opts.ctx.currentUser.id, {
      where: {
         createdAt: { gte: filters?.dateFrom, lte: filters?.dateTo }
      }
   })

   return expenses
}
