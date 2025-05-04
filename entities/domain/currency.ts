// Common interface with comun props
interface BaseCurrency {
    label: string;
    flagImg: string;
    description: string;
}

interface FiatCurrency extends BaseCurrency {
    type: 'fiat';
    id: 'VES' | 'COP' | 'PEN' | 'BRL';
}

interface CryptoCurrency extends BaseCurrency {
    type: 'crypto';
    id: 'TATUM-TRON-USDT';
}

// Union type
export type Currency = FiatCurrency | CryptoCurrency;