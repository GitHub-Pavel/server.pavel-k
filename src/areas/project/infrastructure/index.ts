import { Module } from "@nestjs/common";
import { ProjectRepository } from "./project.repository";
import { PrismaModule } from "src/shared/database";
import { CqrsModule } from "@nestjs/cqrs";
import { IProjectRepository } from "../application/ports";

@Module({
    imports: [CqrsModule, PrismaModule],
    providers: [
        {
            provide: IProjectRepository,
            useClass: ProjectRepository,
        }
    ],
    exports: [
        {
            provide: IProjectRepository,
            useClass: ProjectRepository,
        }
    ],
})
export class ProjectInfrastructureModule {}