import { Skill } from "../../domain";

export interface ISkillRepository {
    findById(skillId: string): Promise<Skill | null>;
    findManyById(portfolioId: string): Promise<Skill[]>;
    create(skill: Skill): Promise<void>;
    delete(skill: Skill): Promise<void>;
}

export const ISkillRepository = Symbol('ISkillRepository');