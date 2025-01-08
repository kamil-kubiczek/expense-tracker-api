import { User } from "@prisma/client"
import { JWTService } from "./jwt.service"
import client from "../prisma/client"
import bcrypt from "bcrypt"
import ms from "ms"

export class AuthentificationService {
   constructor(private jwtService: JWTService) {}

   async hashPassword(password: string) {
      const hashed = await bcrypt.hash(password, 10)
      return hashed
   }

   async verifyPassword(params: { password: string; hashedPassword: string }) {
      const { password, hashedPassword } = params
      const result = await bcrypt.compare(password, hashedPassword)
      return result
   }

   generateAccessToken(user: Omit<User, "password">) {
      const accessToken = this.jwtService.generateAccessJWT({ payload: user })
      return { token: accessToken.token, expiresIn: accessToken.expiresIn }
   }

   generateRefreshTokenAndSaveInDatabase(user: Omit<User, "password">) {
      const { expiresIn, token } = this.jwtService.generateRefreshJWT({ payload: user })

      return client.refreshToken.upsert({
         where: {
            userId: user.id
         },
         create: {
            token: token,
            userId: user.id,
            expiresAt: String(ms(expiresIn))
         },
         update: {
            userId: user.id,
            expiresAt: String(ms(expiresIn)),
            token: token
         }
      })
   }

   removeRefreshTokenFromDatabase(userId: User["id"]) {
      return client.refreshToken.delete({
         where: {
            userId: userId
         }
      })
   }

   decodeUserFromToken(token: string) {
      try {
         const decodedUser = this.jwtService.verifyAccessJWT({ token })
         return decodedUser
      } catch (error) {
         throw error
      }
   }

   decodeUserFromRefreshToken(token: string) {
      try {
         const decodedUser = this.jwtService.verifyRefreshJWT({ token })
         return decodedUser
      } catch (error) {
         throw error
      }
   }
}
