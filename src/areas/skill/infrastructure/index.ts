import { Module } from "@nestjs/common";
import { SkillRepository } from "./skill.repository";
import { PrismaModule } from "src/shared/database";
import { CqrsModule } from "@nestjs/cqrs";
import { ISkillRepository } from "../application/ports";

@Module({
    imports: [CqrsModule, PrismaModule],
    providers: [
        {
            provide: ISkillRepository,
            useClass: SkillRepository,
        }
    ],
    exports: [
        {
            provide: ISkillRepository,
            useClass: SkillRepository,
        }
    ],
})
export class SkillInfrastructureModule {}