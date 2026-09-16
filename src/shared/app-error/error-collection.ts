import { AppError } from "./app-error";

export class ErrorCollection<TError extends AppError> extends AppError {
    private readonly _errors: TError[];

    private constructor(message: string, errors: TError[] | TError) {
        super(message);
        this._errors = Array.isArray(errors) ? errors : [errors];
    }

    public add(error: TError | TError[]): void {
        if (Array.isArray(error)) {
            this._errors.push(...error);
        } else {
            this._errors.push(error);
        }
    }

    public get errors(): readonly TError[] {
        return this._errors;
    }

    public get hasErrors(): boolean {
        return this._errors.length > 0;
    }

    public get isValid(): boolean {
        return this._errors.length === 0;
    }

    toJSON() {
        return {
            message: this.message,
            errors: this._errors.map(error => error.toJSON()),
        };
    }

    public static create<TError extends AppError>(
        message: string = 'Unknown Error', 
        errors: TError[] | TError = []
    ): ErrorCollection<TError> {
        return new ErrorCollection<TError>(message, errors);
    }

    public static fromJSON<TError extends AppError>(json: Record<string, unknown>, errorGenerator = AppError.fromJSON): ErrorCollection<TError> {
        if (!json.message || typeof json.message !== 'string') {
            throw new Error('Message is required');
        }
        if (!json.errors || !Array.isArray(json.errors)) {
            throw new Error('Errors are required');
        }
        return ErrorCollection.create<TError>(
            json.message as string,
            json.errors.map((error: Record<string, unknown>) => errorGenerator(error)) as TError[]
        );
    }
}