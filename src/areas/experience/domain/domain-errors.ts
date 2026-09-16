import { DomainError } from "src/shared/domain";

export const EXPERIENCE_DOMAIN_ERROR_CODES = {
    INVALID_JSON: 'SKILL_INVALID_JSON',
} as const;
export type EXPERIENCE_DOMAIN_ERROR_CODES = (typeof EXPERIENCE_DOMAIN_ERROR_CODES)[keyof typeof EXPERIENCE_DOMAIN_ERROR_CODES];


export class ExperienceDomainError extends DomainError {
    public name = 'ExperienceDomainError';

    static InvalidJSON(): ExperienceDomainError {
        return new ExperienceDomainError('Invalid JSON', { code: EXPERIENCE_DOMAIN_ERROR_CODES.INVALID_JSON });
    }
}