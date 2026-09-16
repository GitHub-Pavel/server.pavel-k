import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "./.generated/client";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  readonly #logger = new Logger(PrismaService.name);
  #client: PrismaClient;

  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set');
    }

    const pool = new Pool({
      connectionString: databaseUrl,
    });

    const adapter = new PrismaPg(pool);

    this.#client = new PrismaClient({
      log: ['warn', 'error'],
      adapter,
    });
  }

  async onModuleInit() {
    this.#logger.verbose('Connecting to database...');
    await this.#client.$connect();
    this.#logger.log('Connected to database');
  }

  async onModuleDestroy() {
    this.#logger.verbose('Disconnecting from database...');
    await this.#client.$disconnect();
    this.#logger.log('Disconnected from database');
  }

  get client() {
    return this.#client;
  }
}