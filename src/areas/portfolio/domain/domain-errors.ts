import { DomainError } from "src/shared/domain";

export const PORTFOLIO_DOMAIN_ERROR_CODES = {
    INVALID_JSON: 'PORTFOLIO_INVALID_JSON',
} as const;
export type PORTFOLIO_DOMAIN_ERROR_CODES = (typeof PORTFOLIO_DOMAIN_ERROR_CODES)[keyof typeof PORTFOLIO_DOMAIN_ERROR_CODES];


export class PortfolioDomainError extends DomainError {
    public name = 'PortfolioDomainError';

    static InvalidJSON(): PortfolioDomainError {
        return new PortfolioDomainError('Invalid JSON', { code: PORTFOLIO_DOMAIN_ERROR_CODES.INVALID_JSON });
    }
}