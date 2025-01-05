import { authentificatedProcedure } from "../../middlewares/authentificated"
import { createExpenseProcedure } from "../../procedures/expenses/createExpense.prodecure"
import { ExpenseService } from "../../services/expense.service"
import { ResolverOptsType } from "../../types"

export default async function (opts: ResolverOptsType<typeof authentificatedProcedure, typeof createExpenseProcedure>) {
   const { amount, category } = opts.input

   const expenseService = new ExpenseService()

   const result = await expenseService.createExpenseInDatabase(opts.ctx.currentUser.id, { amount, category })

   return result
}
