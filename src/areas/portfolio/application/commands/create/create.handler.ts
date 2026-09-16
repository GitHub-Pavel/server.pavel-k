import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PortfolioCreateCommand } from "./create.command";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { Inject } from "@nestjs/common";
import { IPortfolioRepository } from "../../ports";
import { ID } from "src/shared/value-objects";
import { v7 } from "uuid";
import { Portfolio } from "src/areas/portfolio/domain";

@CommandHandler(PortfolioCreateCommand)
export class PortfolioCreateCommandHandler implements ICommandHandler<PortfolioCreateCommand, Result<string, AppError>> {
    constructor(
        @Inject(IPortfolioRepository) readonly portfolioRepo: IPortfolioRepository
    ) {}

    async execute({ props }: PortfolioCreateCommand): AsyncResult<string, AppError> {
        let portfolio = await this.portfolioRepo.findFirst();

        if (portfolio) {
            return Result.Err(AppError.create('Portfolio already exists'));
        }

        const portfolioResult = Result.fromCatch<Portfolio, AppError>(
            () => Portfolio.create(ID.create(v7()), props.name, props.description, props.link)
        );

        if (portfolioResult.isErr && portfolioResult.error) {
            return Result.Err(portfolioResult.error);
        }

        portfolio = portfolioResult.unwrap();
        await this.portfolioRepo.create(portfolio);
        return Result.Ok(portfolio.id);
    }
}