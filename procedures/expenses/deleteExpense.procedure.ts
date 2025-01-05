import { string, z } from "zod"
import { authentificatedProcedure } from "../../middlewares/authentificated"
import deleteExpenseResolver from "../../resolvers/expenses/deleteExpense.resolver"

export const deleteExpenseInputSchema = z.object({
   id: string().uuid()
})

export const deleteExpenseProcedure = authentificatedProcedure.input(deleteExpenseInputSchema).mutation(async (opts) => {
   const result = await deleteExpenseResolver(opts)
   return result
})
