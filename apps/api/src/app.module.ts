import { PrismaModule } from "@/prisma/prisma.module"
import { RabbitmqModule } from "@/rabbitmq/rabbitmq.module"
import { RatelimitMiddleware } from "@/ratelimit/ratelimit.middleware"
import { RatelimitModule } from "@/ratelimit/ratelimit.module"
import { RedisModule } from "@/redis/redis.module"
import { SupabaseModule } from "@/supabase/supabase.module"
import { TrpcModule } from "@/trpc/trpc.module"
import { type MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SupabaseModule,
    TrpcModule,
    RedisModule,
    RatelimitModule,
    RabbitmqModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RatelimitMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL })
  }
}
