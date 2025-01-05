import { createTRPCClient, httpLink } from "@trpc/client"
import type { ResponseEsque } from "@trpc/client/dist/internals/types"
import makeFetchCookie from "fetch-cookie"
import type { AppRouter } from "../../routes"
import "dotenv/config"

export const apiUrl = `http://localhost:${process.env.API_PORT}/`

export const fetchCookie = makeFetchCookie(fetch)

export const trpcClient = createTRPCClient<AppRouter>({
   links: [
      httpLink({
         url: apiUrl,

         async fetch(url, options): Promise<ResponseEsque> {
            const response = await fetchCookie(url, {
               ...options,
               credentials: "include"
            })

            return response as unknown as Promise<ResponseEsque>
         }
      })
   ]
})
