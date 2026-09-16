import { Skill } from "../../domain";

export class SkillDto {
    id: string;
    name: string;

    static fromDomain(skill: Skill): SkillDto {
        const dto = new SkillDto();
        const { id, name } = skill.toJSON();

        dto.id = id;
        dto.name = name.toString();

        return dto;
    }
}