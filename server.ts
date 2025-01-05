import { createHTTPHandler } from "@trpc/server/adapters/standalone"
import consola from "consola"
import { colorize } from "consola/utils"
import cors from "cors"
import { createServer } from "http"
import { createContext } from "./trpc"
import { appRouter } from "./routes"

const port = Number(process.env.API_PORT || 3000)

const handler = createHTTPHandler({
   middleware: cors({
      origin: process.env.NODE_ENV !== "production" ? "*" : process.env.CLIENT_URL
   }),
   router: appRouter,
   createContext,
   onError({ error }) {
      consola.error("Request failed to complete: " + colorize("red", error.code) + " " + colorize("blue", error.message))
   }
})

const server = createServer((req, res) => {
   handler(req, res)
})

server.listen(port, "localhost", () => {
   consola.ready(
      `Server running at ${colorize("green", "http://localhost:" + port)} in ${colorize(
         "red",
         process.env.NODE_ENV || "unknown"
      )} mode`
   )
})
