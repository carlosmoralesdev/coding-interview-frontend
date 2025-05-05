import { CalculateRateDto } from "@/adapters/dto/calculateRateDto";

export interface ExchangeServiceInterface{
    calculateRate(calculateRateDto: CalculateRateDto): Promise<String>
}