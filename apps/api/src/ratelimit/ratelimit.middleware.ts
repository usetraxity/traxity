import { HttpException, HttpStatus, Injectable, type NestMiddleware } from "@nestjs/common"
import { type NextFunction, type Request, Response } from "express"
import type { RatelimitService } from "./ratelimit.service"

@Injectable()
export class RatelimitMiddleware implements NestMiddleware {
  constructor(private readonly ratelimitService: RatelimitService) {}

  async use(req: Request, next: NextFunction) {
    const identifier = req.ip || "anonymous"

    const isAllowed = await this.ratelimitService.limit(identifier)

    if (!isAllowed) {
      throw new HttpException("Too Many Requests", HttpStatus.TOO_MANY_REQUESTS)
    }

    next()
  }
}
