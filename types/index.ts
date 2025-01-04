import { AnyProcedure, inferProcedureBuilderResolverOptions, inferProcedureInput } from "@trpc/server"
import { AnyProcedureBuilder } from "@trpc/server/unstable-core-do-not-import"
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone"
import { JwtPayload } from "jsonwebtoken"
import Cookies from "cookies"
import { User } from "@prisma/client"

export type ResolverOptsType<MiddlewareProdecure extends AnyProcedureBuilder, Prodecure extends AnyProcedure> = {
   input: inferProcedureInput<Prodecure> & inferProcedureBuilderResolverOptions<MiddlewareProdecure>["input"]
   ctx: inferProcedureBuilderResolverOptions<MiddlewareProdecure>["ctx"]
   signal: inferProcedureBuilderResolverOptions<MiddlewareProdecure>["signal"]
}

export interface Context extends CreateHTTPContextOptions {
   currentUser?: JwtPayload & Omit<User, "password">
   cookieJar: Cookies
}
