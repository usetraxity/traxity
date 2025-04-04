import { RedisModule } from "@/redis/redis.module"
import { Module } from "@nestjs/common"
import { RatelimitService } from "./ratelimit.service"

@Module({
  imports: [RedisModule],
  providers: [RatelimitService],
  exports: [RatelimitService],
})
export class RatelimitModule {}
