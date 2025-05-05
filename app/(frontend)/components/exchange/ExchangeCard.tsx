'use client'

import { ArrowLeftRight } from 'lucide-react'
import { Select } from './Select'
import { useExchangeHandler } from '../../hooks/exchange/useExchangeHandler'
import { handleInputNumber } from '@/utils/handleInputNumber'
import { Spinner } from '../common/Spinner'

export default function ExchangeCard() {

    const {
        listOne,
        indexOneSelected,
        handleIndexOne,
        listTwo,
        indexTwoSelected,
        handleIndexTwo,
        amount,
        setAmount,
        rate,
        received,
        handleSwap,
        onSubmit,
        loadingRate
    } = useExchangeHandler()

    return (

        <form className="block bg-white shadow-xl rounded-3xl mx-5 px-5 py-9 border border-gray-200 w-full max-w-[330] min-w-[260]">
            <div className="flex items-center justify-between mb-4 relative">
                <div className="flex-1 relative">
                    <Select label="TENGO" options={listOne} indexSelected={indexOneSelected} setIndexSelected={handleIndexOne} className='rounded-r-none' />
                </div>
                {<button
                    onClick={handleSwap}
                    className="absolute left-1/2 transform -translate-x-1/2 bg-main-yellow p-[15] rounded-full z-10"
                >
                    <ArrowLeftRight className="text-white w-5 h-5" />
                </button>}
                <div className="flex-1 relative">
                    <Select label="QUIERO" options={listTwo} indexSelected={indexTwoSelected} setIndexSelected={handleIndexTwo} className='rounded-l-none' />
                </div>
            </div>

            <div className="border border-main-yellow border-[2px] rounded-xl p-3 text-sm font-medium mb-4">
                <span className='text-yellow-500'>{listOne[indexOneSelected]?.label}</span>
                <input
                    type="text"
                    placeholder='0.00'
                    className="ml-2 w-24 outline-none bg-transparent text-black"
                    value={amount}
                    onChange={(e) => handleInputNumber(e, setAmount)}
                />
            </div>

            <div className="block space-y-2 text-sm text-gray-600 font-medium mb-7 mt-7">
                <div className="flex justify-between">
                    <span>Tasa estimada</span>
                    <span className="flex items-center gap-1 text-black">
                        <span>≈</span>
                        {loadingRate ? <Spinner /> : <span>{rate.toFixed(2)}</span>}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Recibirás</span>
                    <div className="flex items-center gap-1 text-sm text-black">
                        <span>≈</span>
                        {loadingRate ? <Spinner /> : <span>{received.toFixed(2)}</span>}
                        <span className="text-[9.5px] text-gray-600 font-semibold relative top-[-1]">
                            {listTwo[indexTwoSelected]?.label}
                        </span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <span>Tiempo estimado</span>
                    <span className="text-black">≈ 10 Min</span>
                </div>
            </div>

            <button onClick={async (event) => { await onSubmit(event) }} className="block w-full cursor-pointer bg-main-yellow hover:bg-main-yellow-500 text-white text-center font-semibold py-3 rounded-xl shadow-md transition">
                Cambiar
            </button>
        </form>
    )
}
