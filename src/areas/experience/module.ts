import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { queryHandlers } from "./application/queries/handlers";
import { ExperienceInfrastructureModule } from "./infrastructure";
import { commandHandlers } from "./application/commands/handlers";
import { ExperiencePresentationModule } from "./presentation";
import { eventHandlers } from "./application/events/handlers";

@Module({
  imports: [ExperienceInfrastructureModule, CqrsModule, ExperiencePresentationModule],
  providers: [...queryHandlers, ...commandHandlers, ...eventHandlers],
  exports: [],
})
export class ExperienceModule {}