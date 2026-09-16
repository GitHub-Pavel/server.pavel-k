import { AppError } from "../app-error";

export type DomainErrorOptions = { code: number | string; cause: Error };

export class DomainError extends AppError {
  public name = 'DomainError';
  readonly code: number | string;
  readonly cause?: Error;

  constructor(message: string, opts?: Partial<DomainErrorOptions>) {
    super(message);
    this.cause = opts?.cause;
    this.code = opts?.code || '';
  }

  toString() {
    return `${this.name}:${this.code ? ' [' + this.code + ']' : ''} ${this.message}`;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }

  static fromJSON(json: Record<string, unknown>) {
    if (!json.message || typeof json.message !== 'string') {
      throw new Error('Message is required');
    }
    
    return new DomainError(json.message as string, {
      code: json.code as any,
      cause: json.cause as Error,
    });
  }
}
