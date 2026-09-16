import { PortfolioDto } from "../../dtos";
import { Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { Query } from "@nestjs/cqrs";

export class PortfolioFindFirstQuery extends Query<Result<PortfolioDto, AppError>> {
    static create(): PortfolioFindFirstQuery {
        return new PortfolioFindFirstQuery();
    }
}