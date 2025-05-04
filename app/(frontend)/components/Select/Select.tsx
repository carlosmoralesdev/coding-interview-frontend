'use client'

import { Currency } from "@/entities/domain/currency"

interface SelectProps {
    label: string
    options: Currency[]
    className?: string
}

export function Select({ label, options, className }: SelectProps) {
    return (
        <div className={`border border-[2.5px] border-main-yellow rounded-3xl pt-1 pb-1 relative ${className}`}>
            <div className="flex items-center justify-center">
                <span className="absolute top-[-8px] text-[10px] px-1 text-gray-500 font-semibold tracking-wide bg-white">
                    {label}
                </span>
            </div>
            <div className="flex items-center justify-center">
                <span className="text-2xl mr-2">
                    {'🇻🇪'}
                </span>
                <select
                    value={'🇻🇪'}
                    onChange={(e) => { }}
                    className="bg-transparent text-sm font-medium outline-none"
                >
                    {options.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}