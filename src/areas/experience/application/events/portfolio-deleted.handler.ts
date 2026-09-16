import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PortfolioDeletedEvent } from "src/areas/portfolio";
import { IExperienceRepository } from "../ports";

@EventsHandler(PortfolioDeletedEvent)
export class PortfolioDeletedHandler implements IEventHandler<PortfolioDeletedEvent> {
    constructor(
        @Inject(IExperienceRepository) private readonly experienceRepository: IExperienceRepository,
    ) {}

    async handle(event: PortfolioDeletedEvent) {
        const deletePromises: Promise<void>[] = [];
        const experiences = await this.experienceRepository.findManyById(event.id);
        for (const experience of experiences) {
            experience.delete();
            deletePromises.push(this.experienceRepository.delete(experience));
        }
        await Promise.all(deletePromises);
    }
}