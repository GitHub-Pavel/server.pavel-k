import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PortfolioDeletedEvent } from "src/areas/portfolio";
import { IProjectRepository } from "../ports";

@EventsHandler(PortfolioDeletedEvent)
export class PortfolioDeletedHandler implements IEventHandler<PortfolioDeletedEvent> {
    constructor(
        @Inject(IProjectRepository) private readonly projectRepository: IProjectRepository,
    ) {}

    async handle(event: PortfolioDeletedEvent) {
        const deletePromises: Promise<void>[] = [];
        const projects = await this.projectRepository.findManyById(event.id);
        for (const project of projects) {
            project.delete();
            deletePromises.push(this.projectRepository.delete(project));
        }
        await Promise.all(deletePromises);
    }
}