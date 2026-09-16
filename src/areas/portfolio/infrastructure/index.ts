import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "src/shared/database";
import { PortfolioRepository } from "./portfolio.respository";
import { IPortfolioRepository } from "../application/ports";

@Module({
    imports: [
        CqrsModule,
        PrismaModule,
    ],
    providers: [
        {
            provide: IPortfolioRepository,
            useClass: PortfolioRepository,
        }
    ],
    exports: [
        {
            provide: IPortfolioRepository,
            useClass: PortfolioRepository,
        }
    ],
})
export class PortfolioInfrastructureModule {}