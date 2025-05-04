'use client'

import { useEffect, useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { Select } from './Select/Select'
import { getCurrencyList } from '@/adapters/fetch/getCurrencyList'
import { Currency } from '@/entities/domain/currency'

export default function CurrencyExchangeCard() {

    const [fiatList, setFiatList] = useState<Currency[]>([])
    const [cryptoList, setCryptoList] = useState<Currency[]>([])

    const [from, setFrom] = useState('USDT')
    const [to, setTo] = useState('VES')
    const [amount, setAmount] = useState(5)

    const handleSwap = () => {
        setFrom(to)
        setTo(from)
    }

    const rate = 25
    const received = amount * rate

    const initialFetch = async () => {
        const [fiatData, cryptoData] = await Promise.all([
            getCurrencyList({ type: 'fiat' }),
            getCurrencyList({ type: 'crypto' }),
        ]);

        if (fiatData) {
            setFiatList(fiatData);
        }

        if (cryptoData) {
            setCryptoList(cryptoData);
        }
    }

    useEffect(() => {
        initialFetch()
    }, [])

    return (

        <div className="block bg-white shadow-xl rounded-3xl mx-5 px-5 py-9 border border-gray-200 w-full max-w-[330] min-w-[260]">
            <div className="flex items-center justify-between mb-4 relative">
                {/* FROM */}
                <div className="flex-1 relative">
                    <Select label="TENGO" options={fiatList} className='rounded-r-none' />
                </div>

                {/* SWAP */}
                {<button
                    onClick={handleSwap}
                    className="absolute left-1/2 transform -translate-x-1/2 bg-main-yellow p-[15] rounded-full z-10"
                >
                    <ArrowLeftRight className="text-white w-5 h-5" />
                </button>}

                {/* TO */}
                <div className="flex-1 relative">
                    <Select label="QUIERO" options={cryptoList} className='rounded-l-none' />
                </div>
            </div>

            <div className="border border-main-yellow border-[2px] rounded-xl p-3 text-sm font-medium text-yellow-500 mb-4">
                {from}{' '}
                <input
                    type="text"
                    className="ml-2 w-24 outline-none bg-transparent"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
            </div>

            <div className="block space-y-2 text-sm text-gray-600 font-medium mb-7 mt-7">
                <div className="flex justify-between">
                    <span>Tasa estimada</span>
                    <span className="text-black">= {rate.toFixed(2)} {to}</span>
                </div>
                <div className="flex justify-between">
                    <span>Recibirás</span>
                    <span className="text-black">= {received.toFixed(2)} {to}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tiempo estimado</span>
                    <span className="text-black">= 10 Min</span>
                </div>
            </div>

            <button className="block w-full cursor-pointer bg-main-yellow hover:bg-main-yellow-500 text-white text-center font-semibold py-3 rounded-xl shadow-md transition">
                Cambiar
            </button>
        </div>
    )
}
