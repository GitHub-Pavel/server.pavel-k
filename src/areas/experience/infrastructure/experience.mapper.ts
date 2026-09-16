import { ExperienceModel } from "src/shared/database";
import { Experience } from "../domain";

export class ExperienceMapper {
    static toDomain(experience: ExperienceModel): Experience {
        return Experience.fromJSON(experience);
    }

    static fromDomain(experience: Experience): Omit<ExperienceModel, 'createdAt'> {
        return {
            id: experience.id,
            company: experience.company.toString(),
            position: experience.position.toString(),
            achievements: experience.achievements.toString(),
            startedAt: experience.startedAt,
            endedAt: experience.endedAt,
            portfolioId: experience.portfolioId,
        };
    }
}