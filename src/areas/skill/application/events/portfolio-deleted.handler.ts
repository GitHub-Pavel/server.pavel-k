import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PortfolioDeletedEvent } from "../../../portfolio";
import { ISkillRepository } from "../ports";

@EventsHandler(PortfolioDeletedEvent)
export class PortfolioDeletedHandler implements IEventHandler<PortfolioDeletedEvent> {
    constructor(
        @Inject(ISkillRepository) private readonly skillRepository: ISkillRepository,
    ) {}

    async handle(event: PortfolioDeletedEvent) {
        const deletePromises: Promise<void>[] = [];
        const skills = await this.skillRepository.findManyById(event.id);
        for (const skill of skills) {
            skill.delete();
            deletePromises.push(this.skillRepository.delete(skill));
        }
        await Promise.all(deletePromises);
    }
}