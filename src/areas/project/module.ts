import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { queryHandlers } from "./application/queries/handlers";
import { ProjectInfrastructureModule } from "./infrastructure";
import { commandHandlers } from "./application/commands/handlers";
import { ProjectPresentationModule } from "./presentation";
import { eventHandlers } from "./application/events/handlers";

@Module({
  imports: [ProjectInfrastructureModule, CqrsModule, ProjectPresentationModule],
  providers: [...queryHandlers, ...commandHandlers, ...eventHandlers],
  exports: [],
})
export class ProjectModule {}