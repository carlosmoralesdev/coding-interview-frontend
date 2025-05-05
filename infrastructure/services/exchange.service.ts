import { CalculateRateDto } from "@/adapters/dto/calculateRateDto";
import { ExchangeServiceInterface } from "@/application/services/exchange.service";

export class ExchangeService implements ExchangeServiceInterface {
    async calculateRate(calculateRateDto: CalculateRateDto): Promise<String> {

        //Validations
        const { type, cryptoCurrencyId, fiatCurrencyId, amount } = calculateRateDto

        if ((type === null) || !cryptoCurrencyId || !fiatCurrencyId || !amount) {
            throw new Error('There are unfilled fields')
        }

        //Config fetch
        let url = `${process.env.API_EXCHANGE}?type=${type}&cryptoCurrencyId=${cryptoCurrencyId}&fiatCurrencyId=${fiatCurrencyId}&amount=${amount}&amountCurrencyId=${cryptoCurrencyId}`
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        const options: RequestInit = {
            method: 'GET',
            headers,
        };
        const res = await fetch(url, options)
        const json = await res.json()
        return json.data.byPrice.fiatToCryptoExchangeRate
    }

}