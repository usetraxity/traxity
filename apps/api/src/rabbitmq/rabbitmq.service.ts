import { Injectable, type OnModuleDestroy, type OnModuleInit } from "@nestjs/common"
import type { ConfigService } from "@nestjs/config"
import { type ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices"

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private client: ClientProxy

  constructor(private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>("RABBITMQ_URL") || "amqp://localhost:5672"],
        queue: this.configService.get<string>("RABBITMQ_QUEUE") || "default_queue",
        queueOptions: {
          durable: true,
        },
      },
    })
  }

  async onModuleInit() {
    await this.client.connect()
  }

  async onModuleDestroy() {
    await this.client.close()
  }

  getClient(): ClientProxy {
    return this.client
  }

  async publish<TInput>(pattern: string, data: TInput): Promise<void> {
    this.client.emit<void, TInput>(pattern, data).subscribe()
  }
}
