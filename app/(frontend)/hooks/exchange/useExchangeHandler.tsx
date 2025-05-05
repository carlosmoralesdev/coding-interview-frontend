'use client'

import { useEffect, useState } from 'react'
import { getCurrencyList } from '@/adapters/fetch/getCurrencyList'
import { fetchCalculateRate } from '@/adapters/fetch/fetchCalculateRate'
import { Currency } from '@/entities/domain/currency'
import { toast } from 'react-toastify'

export function useExchangeHandler() {
    const [listOne, setListOne] = useState<Currency[]>([])
    const [indexOneSelected, setIndexOneSelected] = useState<number>(0)
    const [listTwo, setListTwo] = useState<Currency[]>([])
    const [indexTwoSelected, setIndexTwoSelected] = useState<number>(0)
    const [amount, setAmount] = useState('')
    const [rate, setRate] = useState(0.00)
    const [received, setReceived] = useState(0.00)
    const [pendingCalculate, setPendingCalculate] = useState(false)
    const [loadingRate, setLoadingRate] = useState(false)

    const handleSwap = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const listAux = [...listOne]
        const indexAux = indexOneSelected
        setListOne([...listTwo])
        setIndexOneSelected(indexTwoSelected)
        setListTwo(listAux)
        setIndexTwoSelected(indexAux)
        setPendingCalculate(true)
    }

    const handleIndexOne = (value: number) => {
        setIndexOneSelected(value)
        setPendingCalculate(true)
    }

    const handleIndexTwo = (value: number) => {
        setIndexTwoSelected(value)
        setPendingCalculate(true)
    }

    const handlePendingCalculate = async () => {
        if (!pendingCalculate) return
        await calculateRate()
        setPendingCalculate(false)
    }

    useEffect(() => {
        handlePendingCalculate()
    }, [pendingCalculate])

    const getCurrencySelectedId = (type: 'fiat' | 'crypto') => {
        if (listOne.length > 0 && listTwo.length > 0) {
            if (listOne[0].type === type) {
                return listOne[indexOneSelected].id
            } else {
                return listTwo[indexTwoSelected].id
            }
        }
        return null
    }

    const getExchangeType = () => {
        if (listOne.length > 0 && listTwo.length > 0) {
            if (listOne[0].type === 'fiat') return 1
            return 0
        }
        return null
    }

    const calculateRate = async () => {
        setLoadingRate(true)
        const exchangeType = getExchangeType()
        const cryptoId = getCurrencySelectedId('crypto')
        const fiatId = getCurrencySelectedId('fiat')

        if(amount === ''){
            setLoadingRate(false)
            return
        }
        if (Number(amount) <= 0) {
            setLoadingRate(false)
            toast.error('Ingrese un monto válido.')
            return
        }
        if (!cryptoId || !fiatId || !amount || (exchangeType === null)) {
            toast.error("Hay algunos campos con valores inválidos.")
            setLoadingRate(false)
            return
        }
        const calculateRateDto = {
            type: exchangeType,
            cryptoCurrencyId: cryptoId,
            fiatCurrencyId: fiatId,
            amount: Number(amount)
        }
        const result = await fetchCalculateRate(calculateRateDto)
        if (result) {
            setRate(Number(result))
            if (getExchangeType() === 1) {
                setReceived(Number(amount) / Number(result))
            } else if (getExchangeType() === 0) {
                setReceived(Number(amount) * Number(result))
            }
        }
        setLoadingRate(false)
    }

    const initialFetch = async () => {
        const [fiatData, cryptoData] = await Promise.all([
            getCurrencyList({ type: 'fiat' }),
            getCurrencyList({ type: 'crypto' }),
        ]);

        if (fiatData) {
            setListOne(fiatData);
        }

        if (cryptoData) {
            setListTwo(cryptoData);
        }
    }

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        calculateRate()
    }

    useEffect(() => {
        initialFetch()
    }, [])

    return {
        listOne,
        setListOne,
        indexOneSelected,
        handleIndexOne,
        listTwo,
        setListTwo,
        indexTwoSelected,
        handleIndexTwo,
        amount,
        setAmount,
        rate,
        setRate,
        received,
        setReceived,
        pendingCalculate,
        setPendingCalculate,
        handleSwap,
        calculateRate,
        onSubmit,
        loadingRate
    }
}
