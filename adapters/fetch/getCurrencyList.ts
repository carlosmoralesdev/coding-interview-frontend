import { customFetch } from "@/utils/customFetch";
import { GetCurrencyListDto } from "../dto/getCurrencyDto";
import { Currency } from "@/entities/domain/currency";

export async function getCurrencyList(getCurrencyListDto: GetCurrencyListDto): Promise<Currency[] | null> {
    const data = await customFetch<Currency[]>('/api/currency', 'POST', getCurrencyListDto)
    return data
}