import { Injectable } from "@nestjs/common"
import type { ConfigService } from "@nestjs/config"
import { type SupabaseClient, createClient } from "@supabase/supabase-js"

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient

  constructor(private readonly configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>("SUPABASE_URL") || "",
      this.configService.get<string>("SUPABASE_KEY") || "",
    )
  }

  getClient(): SupabaseClient {
    return this.supabase
  }
}
