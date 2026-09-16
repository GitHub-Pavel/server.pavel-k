import { SkillModel } from "src/shared/database";
import { Skill } from "../domain";

export class SkillMapper {
    static toDomain(skill: SkillModel): Skill {
        return Skill.fromJSON(skill);
    }

    static fromDomain(skill: Skill): Omit<SkillModel, 'createdAt'> {
        return {
            id: skill.id,
            name: skill.name.toString(),
            portfolioId: skill.portfolioId,
        };
    }
}