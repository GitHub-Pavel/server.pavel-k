import { Module } from "@nestjs/common";
import { ExperienceRepository } from "./experience.repository";
import { PrismaModule } from "src/shared/database";
import { CqrsModule } from "@nestjs/cqrs";
import { IExperienceRepository } from "../application/ports";

@Module({
    imports: [CqrsModule, PrismaModule],
    providers: [
        {
            provide: IExperienceRepository,
            useClass: ExperienceRepository,
        }
    ],
    exports: [
        {
            provide: IExperienceRepository,
            useClass: ExperienceRepository,
        }
    ],
})
export class ExperienceInfrastructureModule {}