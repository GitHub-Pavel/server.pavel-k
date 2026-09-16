import { Inject } from "@nestjs/common";
import { IExperienceRepository } from "../application/ports";
import { conditionalTransaction, PrismaService, runInTransaction } from "src/shared/database";
import { EventBus } from "@nestjs/cqrs";
import { Experience } from "../domain";
import { ExperienceMapper } from "./experience.mapper";
import { eventsMapper } from "../application/events/mapper";

export class ExperienceRepository implements IExperienceRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService,
        @Inject(EventBus) private readonly eventBus: EventBus,
    ) {}

    async findById(experienceId: string): Promise<Experience | null> {
        return conditionalTransaction(this.prisma, async (tx) => {
            const experience = await tx.experience.findUnique({
                where: { id: experienceId },
            });
            return experience ? ExperienceMapper.toDomain(experience) : null;
        });
    }

    async findManyById(portfolioId: string): Promise<Experience[]> {
        return conditionalTransaction(this.prisma, async (tx) => {
            const experiences = await tx.experience.findMany({
                where: { portfolioId },
            });
            return experiences.map(ExperienceMapper.toDomain);
        });
    }

    async create(experience: Experience): Promise<void> {
        await runInTransaction(this.prisma, async (tx) => {
            await tx.experience.create({ data: ExperienceMapper.fromDomain(experience) });
        });
        this.eventBus.publish(eventsMapper(experience.flushEvents()));
    }

    async delete(experience: Experience): Promise<void> {
        await runInTransaction(this.prisma, async (tx) => {
            await tx.experience.delete({
                where: { id: experience.id },
            });
        });
        this.eventBus.publish(eventsMapper(experience.flushEvents()));
    }

}