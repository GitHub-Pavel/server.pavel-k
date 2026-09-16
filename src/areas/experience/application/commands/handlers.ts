import { ExperienceDeleteCommandHandler } from "./delete/delete.handler";
import { ExperienceCreateCommandHandler } from "./create/create.handler";

export const commandHandlers = [
    ExperienceDeleteCommandHandler,
    ExperienceCreateCommandHandler,
];