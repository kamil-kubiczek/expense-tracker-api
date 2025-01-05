import { Expense, Prisma, PrismaClient } from "@prisma/client"
import client from "../prisma/client"

export class ExpenseService {
   createExpenseInDatabase(userId: Expense["userId"], data: { amount: Expense["amount"]; category: Expense["category"] }) {
      const { amount, category } = data
      return client.expense.create({
         data: {
            amount,
            category,
            userId
         }
      })
   }

   updateExpenseInDatabaseById(id: Expense["id"], data: { amount?: Expense["amount"]; category?: Expense["category"] }) {
      const { amount, category } = data
      return client.expense.update({ where: { id }, data: { amount, category } })
   }

   removeExpenseFromDatabaseById(id: Expense["id"]) {
      return client.expense.delete({ where: { id } })
   }

   getExpensesFromDatabaseByUserId(
      userId: Expense["userId"],
      filters: {
         where: Prisma.ExpenseWhereInput
      }
   ) {
      return client.expense.findMany({ where: { userId, ...filters.where } })
   }

   getExpenseFromDatabaseById(id: Expense["id"]) {
      return client.expense.findUnique({ where: { id } })
   }
}
