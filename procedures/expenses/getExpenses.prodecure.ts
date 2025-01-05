import { date, string, z } from "zod"
import { authentificatedProcedure } from "../../middlewares/authentificated"
import getExpensesResolver from "../../resolvers/expenses/getExpenses.resolver"

export const getExpensesInputSchema = z.object({
   filters: z
      .object({
         dateFrom: z.string().datetime(),
         dateTo: z.string().datetime()
      })
      .optional()
      .nullable()
})

export const getExpensesProcedure = authentificatedProcedure.input(getExpensesInputSchema).query(async (opts) => {
   const result = await getExpensesResolver(opts)
   return result
})
