export class DateValueObject extends Date {
    constructor(value: Date | string) {
        super(value);

        if (isNaN(this.getTime())) {
            throw new Error('Invalid date');
        }
    }

    static create(value: unknown): DateValueObject {
        if (typeof value !== 'string' && !(value instanceof Date)) {
            throw new Error('Invalid date');
        }
        return new DateValueObject(value);
    }
}