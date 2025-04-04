import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import type { NestExpressApplication } from "@nestjs/platform-express"
import { AppModule } from "./app.module"
import { setupTrpcAdapter } from "./trpc/trpc.adapter"
import { TrpcRouter } from "./trpc/trpc.router"

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService: ConfigService = app.get(ConfigService)

  app.setGlobalPrefix("api")

  app.enableCors({
    origin:
      configService.get("NODE_ENV") === "prod"
        ? configService.get("FRONTEND_URL")
        : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  const trpcRouter = app.get(TrpcRouter)
  setupTrpcAdapter(app, trpcRouter)

  const port = configService.get("PORT")
  await app.listen(port)

  console.log(`App is running on: ${await app.getUrl()}`)
}

bootstrap()
