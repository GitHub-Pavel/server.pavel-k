import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ExperienceInfrastructureModule } from "../infrastructure";
import { ExperienceResolver } from "./graphpql/experience.resolver";

@Module({
    imports: [CqrsModule, ExperienceInfrastructureModule],
    providers: [ExperienceResolver],
})
export class ExperiencePresentationModule {}