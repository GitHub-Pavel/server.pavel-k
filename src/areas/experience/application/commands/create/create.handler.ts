import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { ExperienceCreateCommand } from "./create.command";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { IExperienceRepository } from "../../ports";
import { Inject } from "@nestjs/common";
import { PortfolioFindFirstQuery } from "src/areas/portfolio";
import { Experience } from "src/areas/experience/domain";
import { DateValueObject, ID } from "src/shared/value-objects";
import { v7 } from "uuid";
import { from, map} from 'rxjs';

@CommandHandler(ExperienceCreateCommand)
export class ExperienceCreateCommandHandler implements ICommandHandler<ExperienceCreateCommand, Result<string, AppError>> {
    constructor(
        @Inject(IExperienceRepository) readonly experienceRepo: IExperienceRepository,
        @Inject(QueryBus) readonly queryBus: QueryBus
    ) {}

    async execute({ props }: ExperienceCreateCommand): AsyncResult<string, AppError> {
        const { company, position, achievements, startDate, endDate } = props;
        const portfolioResult = await this.queryBus.execute(PortfolioFindFirstQuery.create());
        const experienceResult = portfolioResult.map((portfolio) => Experience.create(
            ID.create(v7()), 
            ID.create(portfolio.id), 
            new String(company),
            new String(position),
            new String(achievements),
            DateValueObject.create(startDate),
            DateValueObject.create(endDate)
        ));

        if (experienceResult.isErr && experienceResult.error) {
            return Result.Err(experienceResult.error);
        }

        const experience = experienceResult.unwrap();
        await this.experienceRepo.create(experience);
        return Result.Ok(experience.id);
    }
}