import { Injectable, type OnModuleInit } from "@nestjs/common"
import type { ConfigService } from "@nestjs/config"
import { Redis } from "@upstash/redis"

@Injectable()
export class RedisService implements OnModuleInit {
  private client!: Redis

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = new Redis({
      url: this.configService.get<string>("UPSTASH_REDIS_URL") || "",
      token: this.configService.get<string>("UPSTASH_REDIS_TOKEN") || "",
    })
  }

  getClient(): Redis {
    return this.client
  }
}
