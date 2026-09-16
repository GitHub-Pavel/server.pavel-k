import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { queryHandlers } from "./application/queries/handlers";
import { PortfolioInfrastructureModule } from "./infrastructure";
import { commandHandlers } from "./application/commands/handlers";
import { PortfolioPresentationModule } from "./presentation";

@Module({
  imports: [PortfolioInfrastructureModule, CqrsModule, PortfolioPresentationModule],
  providers: [...queryHandlers, ...commandHandlers],
  exports: [],
})
export class PortfolioModule {}