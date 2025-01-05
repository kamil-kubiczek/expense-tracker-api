import { z } from "zod"
import { authentificatedProcedure } from "../../middlewares/authentificated"
import getExpenseResolver from "../../resolvers/expenses/getExpense.resolver"

export const getExpenseInputSchema = z.object({
   id: z.string().uuid()
})

export const getExpenseProcedure = authentificatedProcedure.input(getExpenseInputSchema).mutation(async (opts) => {
   const result = await getExpenseResolver(opts)
   return result
})
