import { CalculateRateDto } from "@/adapters/dto/calculateRateDto";
import { ExchangeService } from "@/infrastructure/services/exchange.service";

export class CalculateRateUseCase {
    constructor(private readonly exchangeService: ExchangeService) { }

    async execute(calculateRateDto: CalculateRateDto): Promise<String> {
        return await this.exchangeService.calculateRate(calculateRateDto)
    }

}