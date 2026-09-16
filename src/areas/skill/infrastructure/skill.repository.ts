import { Inject } from "@nestjs/common";
import { ISkillRepository } from "../application/ports";
import { conditionalTransaction, PrismaService, runInTransaction } from "src/shared/database";
import { EventBus } from "@nestjs/cqrs";
import { Skill } from "../domain";
import { SkillMapper } from "./skill.mapper";
import { eventsMapper } from "../application/events/mapper";

export class SkillRepository implements ISkillRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService,
        @Inject(EventBus) private readonly eventBus: EventBus,
    ) {}

    async findById(skillId: string): Promise<Skill | null> {
        return conditionalTransaction(this.prisma, async (tx) => {
            const skill = await tx.skill.findUnique({
                where: { id: skillId },
            });
            return skill ? SkillMapper.toDomain(skill) : null;
        });
    }

    async findManyById(portfolioId: string): Promise<Skill[]> {
        return conditionalTransaction(this.prisma, async (tx) => {
            const skills = await tx.skill.findMany({
                where: { portfolioId },
            });
            return skills.map(SkillMapper.toDomain);
        });
    }

    async create(skill: Skill): Promise<void> {
        await runInTransaction(this.prisma, async (tx) => {
            await tx.skill.create({ data: SkillMapper.fromDomain(skill) });
        });
        this.eventBus.publish(eventsMapper(skill.flushEvents()));
    }

    async delete(skill: Skill): Promise<void> {
        await runInTransaction(this.prisma, async (tx) => {
            await tx.skill.delete({
                where: { id: skill.id },
            });
        });
        this.eventBus.publish(eventsMapper(skill.flushEvents()));
    }

}