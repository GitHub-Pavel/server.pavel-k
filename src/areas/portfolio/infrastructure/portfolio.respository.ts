import { conditionalTransaction, PrismaService, runInTransaction } from "src/shared/database";
import { IPortfolioRepository } from "../application/ports";
import { Inject } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { eventsMapper } from "../application/events/mapper";
import { Portfolio } from "../domain";
import { PortfolioMapper } from "./portfolio.mapper";

export class PortfolioRepository implements IPortfolioRepository {
    constructor(
        @Inject(PrismaService) readonly prisma: PrismaService,
        @Inject(EventBus) readonly eventBus: EventBus
    ) {}

    async findFirst(): Promise<Portfolio | null> {
        return conditionalTransaction(this.prisma, async (tx) => {
            const portfolio = await tx.portfolio.findFirst();
            return portfolio ? PortfolioMapper.toDomain(portfolio) : null;
        });
    }

    async create(portfolio: Portfolio): Promise<void> {
        await runInTransaction(this.prisma, async (tx) => {
            await tx.portfolio.create({ data: PortfolioMapper.toEntity(portfolio) });
        });
        await this.eventBus.publishAll(eventsMapper(portfolio.flushEvents()));
    }

    async delete(portfolio: Portfolio): Promise<void> {   
        await runInTransaction(this.prisma, async (tx) => {
            await tx.portfolio.delete({ where: { id: portfolio.id } });
        });
        await this.eventBus.publishAll(eventsMapper(portfolio.flushEvents()));
    }
}