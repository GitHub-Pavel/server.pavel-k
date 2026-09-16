import { PortfolioDeleteCommandHandler } from "./delete/delete.handler";
import { PortfolioCreateCommandHandler } from "./create/create.handler";

export const commandHandlers = [
    PortfolioDeleteCommandHandler,
    PortfolioCreateCommandHandler,
];