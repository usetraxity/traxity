import { Injectable } from "@nestjs/common"
import { initTRPC } from "@trpc/server"
import { z } from "zod"

export type TrpcContext = {
  req?: Request
}

@Injectable()
export class TrpcRouter {
  trpc = initTRPC.context<TrpcContext>().create()

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        return {
          greeting: `Hello ${input.name || "world"}!`,
        }
      }),
  })
}

export type AppRouter = TrpcRouter["appRouter"]
