import { DomainError } from "src/shared/domain";

export const PROJECT_DOMAIN_ERROR_CODES = {
    INVALID_JSON: 'PROJECT_INVALID_JSON',
} as const;
export type PROJECT_DOMAIN_ERROR_CODES = (typeof PROJECT_DOMAIN_ERROR_CODES)[keyof typeof PROJECT_DOMAIN_ERROR_CODES];


export class ProjectDomainError extends DomainError {
    public name = 'ProjectDomainError';

    static InvalidJSON(): ProjectDomainError {
        return new ProjectDomainError('Invalid JSON', { code: PROJECT_DOMAIN_ERROR_CODES.INVALID_JSON });
    }
}