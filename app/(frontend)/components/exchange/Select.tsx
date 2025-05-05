'use client'

import { Currency } from "@/entities/domain/currency"
import { useIsMobile } from "../../hooks/common/useIsMobile"
import { useState } from "react"
import Selector from "./Selector"
import { Spinner } from "../common/Spinner"
import { ChevronDown } from "lucide-react"

interface SelectProps {
    label: string
    options: Currency[]
    className?: string
    indexSelected: number
    setIndexSelected: (value: number) => void
}

export function Select({ label, options, className, indexSelected, setIndexSelected }: SelectProps) {

    const [showSelectedMobile, setShowSelectedMobile] = useState(false)
    const isMobile = useIsMobile()

    return (
        <>
            <div className={`border border-[2.5px] border-main-yellow rounded-3xl pt-2 pb-2 relative ${className}`}>
                <div className="flex items-center justify-center">
                    <span className="absolute top-[-8px] text-[10px] px-1 text-gray-600 font-semibold tracking-wide bg-white">
                        {label}
                    </span>
                </div>
                <div className="flex items-center justify-center">
                    {options[indexSelected] ? <img className="w-[22px] h-[22px] mr-2 ml-2" src={options[indexSelected]?.flagImg} /> : <Spinner />}
                    {!isMobile ?
                        <select
                            value={options[indexSelected]?.id}
                            className="bg-white text-xs text-gray-600 font-semibold outline-none min-w-[15px]"
                            onChange={() => { }}
                        >
                            {options.map((item, index) => (
                                <option key={item.id} value={item.id} onClick={() => {
                                    setIndexSelected(index)
                                }}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                        :
                        <span
                            className="text-xs text-gray-600 font-semibold flex items-center gap-1 cursor-pointer"
                            onClick={() => setShowSelectedMobile(true)}
                        >
                            {options[indexSelected]?.label}
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </span>
                    }
                </div>
            </div>
            <Selector show={showSelectedMobile} setShow={setShowSelectedMobile} options={options} indexSelected={indexSelected} setIndexSelected={setIndexSelected} type={options[indexSelected]?.type} />
        </>
    )
}