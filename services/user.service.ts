import { User } from "@prisma/client"
import client from "../prisma/client"

export class UserService {
   createUserInDatabase(user: { email: User["email"]; hashedPassword: string }) {
      return client.user.create({ data: { email: user.email, password: user.hashedPassword } })
   }

   getUserFromDatabaseById(userId: User["id"]) {
      return client.user.findUnique({ where: { id: userId } })
   }

   getUserFromDatabaseByEmail(email: User["email"]) {
      return client.user.findUnique({ where: { email } })
   }
}
