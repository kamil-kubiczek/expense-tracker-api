import { date, z } from "zod"
import { authentificatedProcedure } from "../../middlewares/authentificated"
import getExpensesResolver from "../../resolvers/expenses/getExpenses.resolver"

export const getExpensesInputSchema = z.object({
   filters: z
      .object({
         dateFrom: date(),
         dateTo: date()
      })
      .optional()
      .nullable()
})

export const getExpensesProcedure = authentificatedProcedure.input(getExpensesInputSchema).mutation(async (opts) => {
   const result = await getExpensesResolver(opts)
   return result
})
