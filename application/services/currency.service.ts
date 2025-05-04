import { GetCurrencyListDto } from "@/adapters/dto/getCurrencyDto";
import { Currency } from "@/entities/domain/currency";

export interface CurrencyServiceInterface{
    getCurrencyList(getCurrencyListDto: GetCurrencyListDto): Promise<Currency[]>
}