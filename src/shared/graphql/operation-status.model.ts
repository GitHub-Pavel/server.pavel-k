import { Field, ObjectType } from "@nestjs/graphql";
import { AppError } from "../app-error";
import { Result } from "../result";

export const OperationStatus = {
    SUCCESS: "success",
    ERROR: "error",
} as const;
export type OperationStatus = typeof OperationStatus[keyof typeof OperationStatus];

@ObjectType()
export class OperationStatusModel {
    @Field(() => String)
    status: string;

    @Field(() => String, { nullable: true })
    message?: string;

    constructor(status: string, message?: string) {
        this.status = status;
        this.message = message;
    }

    static success(): OperationStatusModel {
        return new OperationStatusModel(OperationStatus.SUCCESS);
    }

    static error(message: string): OperationStatusModel {
        return new OperationStatusModel(OperationStatus.ERROR, message);
    }

    static fromResult<T>(result: Result<T, AppError>): OperationStatusModel {
        if (result.isErr && result.error) {
            return OperationStatusModel.error(result.error.message);
        }

        return OperationStatusModel.success();
    }
}