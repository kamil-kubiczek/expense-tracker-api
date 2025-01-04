import { User } from "@prisma/client"
import jwt from "jsonwebtoken"

export class JWTService {
   private jwtSecret = process.env.JWT_SECRET as string
   private jwtRefreshSecret = process.env.JWT_REFRESH_SECRET as string

   constructor() {
      if (!this.jwtSecret) {
         throw new Error("Environment variable JWT_SECRET is not defined")
      }
      if (!this.jwtRefreshSecret) {
         throw new Error("Environment variable JWT_REFRESH_SECRET is not defined")
      }
   }

   generateAccessJWT(params: { payload: Omit<User, "password"> }) {
      const { payload } = params
      const expiresIn = "7d"

      return {
         token: jwt.sign(payload, this.jwtSecret, { expiresIn }),
         expiresIn
      }
   }

   generateRefreshJWT(params: { payload: Omit<User, "password"> }) {
      const { payload } = params
      const expiresIn = "7d"

      return {
         token: jwt.sign(payload, this.jwtRefreshSecret, { expiresIn }),
         expiresIn
      }
   }

   verifyAccessJWT(params: { token: string }) {
      const { token } = params
      return jwt.verify(token, this.jwtSecret) as jwt.JwtPayload & Omit<User, "password">
   }

   verifyRefreshJWT(params: { token: string }) {
      const { token } = params
      return jwt.verify(token, this.jwtRefreshSecret) as jwt.JwtPayload & Omit<User, "password">
   }
}
