import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PortfolioResolver } from "./graphql/portfolio.resolver";
import { PortfolioInfrastructureModule } from "../infrastructure";

@Module({
    imports: [
        CqrsModule, 
        PortfolioInfrastructureModule, 
    ],
    providers: [PortfolioResolver],
})
export class PortfolioPresentationModule {}