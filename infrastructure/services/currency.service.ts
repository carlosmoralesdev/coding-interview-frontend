import { GetCurrencyListDto } from "@/adapters/dto/getCurrencyDto";
import { CurrencyServiceInterface } from "@/application/services/currency.service";
import { Currency } from "@/entities/domain/currency";

export class CurrencyService implements CurrencyServiceInterface {
    async getCurrencyList(getCurrencyListDto: GetCurrencyListDto): Promise<Currency[]> {
        let currencyList: Currency[] = []
        const { type } = getCurrencyListDto
        if (type === 'fiat') {
            currencyList = [
                { type: 'fiat', id: 'VES', label: 'VES', flagImg: '/assets/fiat_currencies/VES.png', description: 'Bolivares (Bs)' },
                { type: 'fiat', id: 'COP', label: 'COP', flagImg: '/assets/fiat_currencies/COP.png', description: 'Pesos Colombianos (COL$)' },
                { type: 'fiat', id: 'BRL', label: 'BRL', flagImg: '/assets/fiat_currencies/BRL.png', description: 'Real Brasileño (RS)' },
                { type: 'fiat', id: 'PEN', label: 'PEN', flagImg: '/assets/fiat_currencies/PEN.png', description: 'Soles Peruanos (S/)' }
            ]
        } else if (type === 'crypto') {
            currencyList = [
                { type: 'crypto', id: 'TATUM-TRON-USDT', label: 'USDT', flagImg: '/assets/crypto_currencies/TATUM-TRON-USDT.png', description: 'Tether (USDT)' },
            ]
        }
        return currencyList
    }

}