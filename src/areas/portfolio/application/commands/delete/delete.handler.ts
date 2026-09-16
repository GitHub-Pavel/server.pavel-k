import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PortfolioDeleteCommand } from "./delete.command";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { IPortfolioRepository } from "../../ports";
import { Inject } from "@nestjs/common";

@CommandHandler(PortfolioDeleteCommand)
export class PortfolioDeleteCommandHandler implements ICommandHandler<PortfolioDeleteCommand, Result<void, AppError>> {
    constructor(@Inject(IPortfolioRepository) readonly portfolioRepo: IPortfolioRepository) {}

    async execute(): AsyncResult<void, AppError> {
        const portfolio = await this.portfolioRepo.findFirst();

        if (!portfolio) {
            return Result.Err(AppError.create('Portfolio not found'));
        }

        const result = Result.fromCatch<void, AppError>(portfolio.delete);

        if (result.isErr) {
            return result;
        }

        await this.portfolioRepo.delete(portfolio);
        return Result.Ok();
    }
}