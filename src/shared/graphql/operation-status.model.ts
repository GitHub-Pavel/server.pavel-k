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

    constructor(status: string) {
        this.status = status;
    }

    static success(): OperationStatusModel {
        return new OperationStatusModel(OperationStatus.SUCCESS);
    }

    static error(): OperationStatusModel {
        return new OperationStatusModel(OperationStatus.ERROR);
    }

    static fromResult<T>(result: Result<T, AppError>): OperationStatusModel {
        if (result.isErr) {
            return OperationStatusModel.error();
        }

        return OperationStatusModel.success();
    }
}