import { ProjectDeleteCommandHandler } from "./delete/delete.handler";
import { ProjectCreateCommandHandler } from "./create/create.handler";

export const commandHandlers = [
    ProjectDeleteCommandHandler,
    ProjectCreateCommandHandler,
];