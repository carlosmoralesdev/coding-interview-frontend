import { customFetch } from "@/utils/customFetch";
import { Currency } from "@/entities/domain/currency";
import { CalculateRateDto } from "../dto/calculateRateDto";

export async function fetchCalculateRate(calculateRateDto: CalculateRateDto): Promise<Currency[] | null> {
    const data = await customFetch<Currency[]>('/api/exchange/rate', 'POST', calculateRateDto)
    return data
}