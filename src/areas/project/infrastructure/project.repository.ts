import { Inject } from "@nestjs/common";
import { IProjectRepository } from "../application/ports";
import { conditionalTransaction, PrismaService, runInTransaction } from "src/shared/database";
import { EventBus } from "@nestjs/cqrs";
import { Project } from "../domain";
import { ProjectMapper } from "./project.mapper";
import { eventsMapper } from "../application/events/mapper";

export class ProjectRepository implements IProjectRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService,
        @Inject(EventBus) private readonly eventBus: EventBus,
    ) {}

    async findById(projectId: string): Promise<Project | null> {
        return conditionalTransaction(this.prisma, async (tx) => {
            const project = await tx.project.findUnique({
                where: { id: projectId },
            });
            return project ? ProjectMapper.toDomain(project) : null;
        });
    }

    async findManyById(portfolioId: string): Promise<Project[]> {
        return conditionalTransaction(this.prisma, async (tx) => {
            const projects = await tx.project.findMany({
                where: { portfolioId },
            });
            return projects.map(ProjectMapper.toDomain);
        });
    }

    async create(project: Project): Promise<void> {
        await runInTransaction(this.prisma, async (tx) => {
            await tx.project.create({ data: ProjectMapper.fromDomain(project) });
        });
        this.eventBus.publish(eventsMapper(project.flushEvents()));
    }

    async delete(project: Project): Promise<void> {
        await runInTransaction(this.prisma, async (tx) => {
            await tx.project.delete({
                where: { id: project.id },
            });
        });
        this.eventBus.publish(eventsMapper(project.flushEvents()));
    }

}