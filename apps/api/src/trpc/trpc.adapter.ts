import type { INestApplication } from "@nestjs/common"
import * as trpcExpress from "@trpc/server/adapters/express"
import type { TrpcRouter } from "./trpc.router"

export function setupTrpcAdapter(app: INestApplication, router: TrpcRouter) {
  const expressApp = app.getHttpAdapter().getInstance()

  expressApp.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: router.appRouter,
      createContext: () => ({}),
    }),
  )
}
