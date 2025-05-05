import { GetCurrencyListDto } from "@/adapters/dto/getCurrencyDto";
import { Currency } from "@/entities/domain/currency";
import { CurrencyService } from "@/infrastructure/services/currency.service";

export class CurrencyUseCase {
    constructor(private readonly currencyService: CurrencyService) { }

    async execute(getCurrencyListDto: GetCurrencyListDto): Promise<Currency[]> {
        return await this.currencyService.getCurrencyList(getCurrencyListDto)
    }

}