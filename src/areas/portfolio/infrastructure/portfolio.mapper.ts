import { Portfolio } from "../domain";
import { PortfolioModel } from 'src/shared/database'

export class PortfolioMapper {
    static toDomain(portfolio: PortfolioModel): Portfolio {
        return Portfolio.fromJSON(portfolio);
    }

    static toEntity(portfolio: Portfolio): Omit<PortfolioModel, 'createdAt'> {
        return portfolio.toJSON();
    }
}