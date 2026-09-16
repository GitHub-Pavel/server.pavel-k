import { SkillDeleteCommandHandler } from "./delete/delete.handler";
import { SkillCreateCommandHandler } from "./create/create.handler";

export const commandHandlers = [
    SkillDeleteCommandHandler,
    SkillCreateCommandHandler,
];