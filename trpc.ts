import { initTRPC } from "@trpc/server"
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone"
import { Context } from "./types"
import Cookies from "cookies"

const t = initTRPC.context<Context>().create({
   isDev: process.env.NODE_ENV === "development" ? true : false
})

export const createContext = async (opts: CreateHTTPContextOptions): Promise<Context> => {
   const cookieJar = new Cookies(opts.req, opts.res)

   return {
      req: opts.req,
      res: opts.res,
      info: opts.info,
      cookieJar: cookieJar
   }
}

export const router = t.router
export const publicProcedure = t.procedure
