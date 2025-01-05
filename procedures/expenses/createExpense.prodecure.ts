import { number, string, z } from "zod"
import { publicLoggedProcedure } from "../../middlewares/publicLogged"
import registerResolver from "../../resolvers/auth/register.resolver"
import createExpenseResolver from "../../resolvers/expenses/createExpense.resolver"
import { authentificatedProcedure } from "../../middlewares/authentificated"

export const createExpenseInputSchema = z.object({
   amount: number().min(0.1),
   category: string().min(1).max(254)
})

export const createExpenseProcedure = authentificatedProcedure.input(createExpenseInputSchema).mutation(async (opts) => {
   const result = await createExpenseResolver(opts)
   return result
})
