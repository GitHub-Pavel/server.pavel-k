import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PortfolioFindFirstQuery } from "./find-first.query";
import { Inject } from "@nestjs/common";
import { IPortfolioRepository } from "../../ports";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { PortfolioDto } from "../../dtos";

@QueryHandler(PortfolioFindFirstQuery)
export class PortfolioFindFirstHandler implements IQueryHandler<PortfolioFindFirstQuery> {
    constructor(
        @Inject(IPortfolioRepository) private readonly portfolioRepo: IPortfolioRepository
    ) {}

    async execute(): AsyncResult<PortfolioDto, AppError> {
        const portfolio = await this.portfolioRepo.findFirst();
        if (!portfolio) {
            return Result.Err(AppError.create('Portfolio not found'));
        }
        return Result.Ok(PortfolioDto.fromDomain(portfolio));
    }
}