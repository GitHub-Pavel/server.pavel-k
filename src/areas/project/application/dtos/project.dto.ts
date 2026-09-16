import { Project } from "../../domain";

export class ProjectDto {
    id: string;
    name: string;
    link: string;

    static fromDomain(project: Project): ProjectDto {
        const dto = new ProjectDto();

        dto.id = project.id;
        dto.name = project.name.toString();
        dto.link = project.link.toString();

        return dto;
    }
}