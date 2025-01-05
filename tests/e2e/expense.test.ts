import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { trpcClient } from "./client"
import { generateMock } from "@anatine/zod-mock"
import { loginInputSchema } from "../../procedures/auth/login.procedure"
import { createExpenseInputSchema } from "../../procedures/expenses/createExpense.prodecure"

describe.sequential("Expense CRUD", () => {
   beforeAll(async () => {
      const user = generateMock(loginInputSchema)
      user.password = "12345678"

      await trpcClient.register.mutate(user)
      await trpcClient.login.mutate(user)
   })

   test(
      "create and update expense",
      {
         repeats: 5
      },
      async () => {
         const expenseToCreate = generateMock(createExpenseInputSchema)

         const createdResponse = await trpcClient.createExpense.mutate(expenseToCreate)

         expect(createdResponse.id).toBeTruthy()

         const updatedResponse = await trpcClient.updateExpense.mutate({
            id: createdResponse.id,
            amount: 200,
            category: "updated category"
         })

         expect(updatedResponse.id).toBe(createdResponse.id)
         expect(updatedResponse.amount).toBe(200)
         expect(updatedResponse.category).toBe("updated category")
      }
   )

   test("get expenses list and remove one", async () => {
      const expensesList = await trpcClient.getExpenses.query({})

      expect(expensesList[0]).toBeDefined()

      await trpcClient.deleteExpense.mutate({
         id: expensesList[0].id
      })
   })

   test("get expenses list with filters by date", async () => {
      const expensesList = await trpcClient.getExpenses.query({})

      expect(expensesList[0]).toBeDefined()

      await trpcClient.deleteExpense.mutate({
         id: expensesList[0].id
      })
   })

   test("get expense", async () => {
      const expensesList = await trpcClient.getExpenses.query({})

      expect(expensesList[0]).toBeDefined()

      const response = await trpcClient.getExpense.query({
         id: expensesList[0].id
      })

      expect(response.id).toBe(expensesList[0].id)
   })

   afterAll(async () => {
      await trpcClient.removeUser.mutate()
   })
})
