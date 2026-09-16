export class ID {
    #value: string;

    private constructor(value: unknown) {
        if (!value) {
            throw new Error('ID is required');
        }

        if (typeof value !== 'string') {
            throw new Error('ID must be a string');
        }

        this.#value = value;
    }

    static create(value: unknown): ID {
        return new ID(value);
    }

    get value(): string {
        return this.#value;
    }
}