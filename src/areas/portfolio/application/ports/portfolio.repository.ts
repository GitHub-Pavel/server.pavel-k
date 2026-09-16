import { Portfolio } from "../../domain";

export interface IPortfolioRepository {
    findFirst(): Promise<Portfolio | null>;
    create(portfolio: Portfolio): Promise<void>;
    delete(portfolio: Portfolio): Promise<void>;
}

export const IPortfolioRepository = Symbol('IPortfolioRepository');