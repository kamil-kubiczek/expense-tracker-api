import { describe, expect, test } from "vitest"
import { apiUrl, fetchCookie, trpcClient } from "./client"
import { generateMock } from "@anatine/zod-mock"
import { loginInputSchema } from "../../procedures/auth/login.procedure"

describe.sequential("Authentification flow", () => {
   const user = generateMock(loginInputSchema)
   user.password = "12345678"

   test("register", async () => {
      const response = await trpcClient.register.mutate(user)

      expect(response).toBeTypeOf("string")
   })

   test("login", async () => {
      const response = await trpcClient.login.mutate(user)

      expect(response).toBeTypeOf("string")
   })

   test("refresh access token", async () => {
      await fetchCookie.cookieJar.setCookie("Authentification=''", apiUrl, {
         ignoreError: false
      })

      const response = await trpcClient.refreshToken.mutate()

      const cookieString = await fetchCookie.cookieJar.getCookieString(apiUrl)
      const cookies = cookieString.split(";")

      cookies.forEach((cookie) => {
         const [name, value] = cookie.split("=")

         if (name == "Authentification") {
            expect(value).not.toBe("")
         }
      })
   })

   test("logout", async () => {
      await trpcClient.logout.mutate()

      const cookieString = await fetchCookie.cookieJar.getCookieString(apiUrl)
      const cookies = cookieString.split(";")

      cookies.forEach((cookie) => {
         const [name, value] = cookie.split("=")

         if (name == "Authentification" || name == "Refresh") {
            expect(value).toBe("")
         }
      })
   })
})
