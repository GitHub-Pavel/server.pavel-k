import { Experience } from "../../domain";

export interface IExperienceRepository {
    findById(experienceId: string): Promise<Experience | null>;
    findManyById(portfolioId: string): Promise<Experience[]>;
    create(experience: Experience): Promise<void>;
    delete(experience: Experience): Promise<void>;
}

export const IExperienceRepository = Symbol('IExperienceRepository');