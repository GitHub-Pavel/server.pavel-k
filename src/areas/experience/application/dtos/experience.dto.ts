import { Experience } from "../../domain";

export class ExperienceDto {
    id: string;
    achievements: string;
    company: string;
    endedAt: Date;
    portfolioId: string;
    position: string;
    startedAt: Date;

    static fromDomain(experience: Experience): ExperienceDto {
        const dto = new ExperienceDto();

        dto.id = experience.id;
        dto.achievements = experience.achievements.toString();
        dto.company = experience.company.toString();
        dto.endedAt = experience.endedAt;
        dto.portfolioId = experience.portfolioId;
        dto.position = experience.position.toString();
        dto.startedAt = experience.startedAt;

        return dto;
    }
}