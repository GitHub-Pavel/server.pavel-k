import { DomainError } from "src/shared/domain";

export const SKILL_DOMAIN_ERROR_CODES = {
    INVALID_JSON: 'SKILL_INVALID_JSON',
} as const;
export type SKILL_DOMAIN_ERROR_CODES = (typeof SKILL_DOMAIN_ERROR_CODES)[keyof typeof SKILL_DOMAIN_ERROR_CODES];


export class SkillDomainError extends DomainError {
    public name = 'SkillDomainError';

    static InvalidJSON(): SkillDomainError {
        return new SkillDomainError('Invalid JSON', { code: SKILL_DOMAIN_ERROR_CODES.INVALID_JSON });
    }
}