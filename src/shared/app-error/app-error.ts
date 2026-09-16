export interface IAppError {
    message: string;
    toJSON(): Record<string, unknown>;
}

export class AppError extends Error implements IAppError {
    constructor(readonly message: string) {
        super(message);
    }

    toJSON() {
        return {
            message: this.message,
        };
    }

    static fromJSON(json: Record<string, unknown>): AppError {
        if (!json.message || typeof json.message !== 'string') {
            throw new Error('Message is required');
        }
        return new AppError(json.message as string);
    }

    static create(message: string): AppError {
        return new AppError(message);
    }
}