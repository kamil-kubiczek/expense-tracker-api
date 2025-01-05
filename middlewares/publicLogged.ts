import { publicProcedure } from "../trpc"
import consola from "consola"
import { colorize } from "consola/utils"

export const publicLoggedProcedure = publicProcedure.use(async ({ next, path, type }) => {
   consola.log("----------------------------------------------------")
   consola.info("Request", colorize("green", path), colorize("blue", type))

   const start = Date.now()

   try {
      const result = await next()

      const durationMs = Date.now() - start

      consola.info(`Response took ${durationMs}ms`)

      return result
   } catch (error) {
      const durationMs = Date.now() - start
      consola.warn(`Response with error took ${durationMs}ms`)

      throw error
   }
})
