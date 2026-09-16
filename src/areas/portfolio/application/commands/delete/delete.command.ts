import { Command } from "@nestjs/cqrs";
import { Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";

export class PortfolioDeleteCommand extends Command<Result<void, AppError>> {
    static create(): PortfolioDeleteCommand {
        return new PortfolioDeleteCommand();
    }
}