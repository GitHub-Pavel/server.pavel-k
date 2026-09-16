import { ProjectModel } from "src/shared/database";
import { Project } from "../domain";

export class ProjectMapper {
    static toDomain(project: ProjectModel): Project {
        return Project.fromJSON(project);
    }

    static fromDomain(project: Project): Omit<ProjectModel, 'createdAt'> {
        return {
            id: project.id,
            name: project.name.toString(),
            link: project.link.toString(),
            portfolioId: project.portfolioId,
        };
    }
}