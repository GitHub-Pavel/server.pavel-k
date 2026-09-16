import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ProjectInfrastructureModule } from "../infrastructure";
import { ProjectResolver } from "./graphpql/project.resolver";

@Module({
    imports: [CqrsModule, ProjectInfrastructureModule],
    providers: [ProjectResolver],
})
export class ProjectPresentationModule {}