import { Command } from "@nestjs/cqrs";
import { Portfolio } from "../../../domain";
import { AppError } from "src/shared/app-error";
import { Result } from "src/shared/result";

export interface PortfolioCreateProps {
    name: string;
    description: string;
    link: string;
}

export class PortfolioCreateCommand extends Command<Result<string, AppError>> {
    private constructor(readonly props: PortfolioCreateProps) {
        super();
    }

    static create(props: PortfolioCreateProps): PortfolioCreateCommand {
        return new PortfolioCreateCommand(props);
    }
}