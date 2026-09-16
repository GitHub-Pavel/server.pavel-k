import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { queryHandlers } from "./application/queries/handlers";
import { SkillInfrastructureModule } from "./infrastructure";
import { commandHandlers } from "./application/commands/handlers";
import { SkillPresentationModule } from "./presentation";
import { eventHandlers } from "./application/events/handlers";

@Module({
  imports: [SkillInfrastructureModule, CqrsModule, SkillPresentationModule],
  providers: [...queryHandlers, ...commandHandlers, ...eventHandlers],
  exports: [],
})
export class SkillModule {}