import { Portfolio } from "../../domain";

export class PortfolioDto {
    id: string;
    name: string;
    description: string;
    link: string;

    static fromDomain(portfolio: Portfolio): PortfolioDto {
        const dto = new PortfolioDto();
        const { id, name, description, link } = portfolio.toJSON();

        dto.id = id;
        dto.name = name.toString();
        dto.description = description.toString();
        dto.link = link.toString();

        return dto;
    }
}