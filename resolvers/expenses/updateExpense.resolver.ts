import { authentificatedProcedure } from "../../middlewares/authentificated"
import { updateExpenseProcedure } from "../../procedures/expenses/updateExpense.procedure"
import { ExpenseService } from "../../services/expense.service"
import { ResolverOptsType } from "../../types"

export default async function (opts: ResolverOptsType<typeof authentificatedProcedure, typeof updateExpenseProcedure>) {
   const { id } = opts.input

   const expenseService = new ExpenseService()

   const result = await expenseService.updateExpenseInDatabaseById(id, {
      amount: opts.input?.amount,
      category: opts.input?.category
   })

   return result
}
