import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { SkillInfrastructureModule } from "../infrastructure";
import { SkillResolver } from "./graphpql/skill.resolver";

@Module({
    imports: [CqrsModule, SkillInfrastructureModule],
    providers: [SkillResolver],
})
export class SkillPresentationModule {}