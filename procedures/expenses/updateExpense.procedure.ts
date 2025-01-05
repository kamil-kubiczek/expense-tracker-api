import { authentificatedProcedure } from "../../middlewares/authentificated"
import { createExpenseInputSchema } from "./createExpense.prodecure"
import { z } from "zod"
import updateExpenseResolver from "../../resolvers/expenses/updateExpense.resolver"

export const updateExpenseInputSchema = createExpenseInputSchema.partial().merge(
   z.object({
      id: z.string().uuid()
   })
)

export const updateExpenseProcedure = authentificatedProcedure.input(updateExpenseInputSchema).mutation(async (opts) => {
   const result = await updateExpenseResolver(opts)
   return result
})
