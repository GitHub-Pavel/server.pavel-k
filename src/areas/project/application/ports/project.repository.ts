import { Project } from "../../domain";

export interface IProjectRepository {
    findById(projectId: string): Promise<Project | null>;
    findManyById(portfolioId: string): Promise<Project[]>;
    create(project: Project): Promise<void>;
    delete(project: Project): Promise<void>;
}

export const IProjectRepository = Symbol('IProjectRepository');