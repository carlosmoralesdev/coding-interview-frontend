'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'

const fiatCurrencies = [
  { code: 'VES', label: 'Bolívares (Bs)', flag: '🇻🇪' },
  { code: 'COP', label: 'Pesos Colombianos (COL$)', flag: '🇨🇴' },
  { code: 'ARS', label: 'Pesos Argentinos (AR$)', flag: '🇦🇷' },
  { code: 'PEN', label: 'Soles Peruanos (S/)', flag: '🇵🇪' },
  { code: 'BRL', label: 'Real Brasileño (R$)', flag: '🇧🇷' },
  { code: 'BOB', label: 'Boliviano (Bs)', flag: '🇧🇴' },
]

export default function Selector() {
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="h-screen flex items-end justify-center bg-gray-100 p-4 relative">
      <button
        onClick={() => setShow(true)}
        className="bg-blue-600 text-white rounded-full px-6 py-3 font-medium shadow-md"
      >
        Elegir moneda
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg max-h-[90%] overflow-y-auto"
          >
            <div className="w-full flex justify-center py-3">
              <div className="w-12 h-1 bg-gray-400 rounded-full" />
            </div>
            <h2 className="text-center text-lg font-semibold mb-4">FIAT</h2>

            <ul className="px-4 pb-6">
              {fiatCurrencies.map((currency) => (
                <li
                  key={currency.code}
                  className="flex items-center justify-between py-3 border-b border-gray-200"
                  onClick={() => {
                    setSelected(currency.code)
                    setShow(false)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currency.flag}</span>
                    <div>
                      <div className="text-sm font-bold">{currency.code}</div>
                      <div className="text-xs text-gray-500">{currency.label}</div>
                    </div>
                  </div>
                  {selected === currency.code ? (
                    <CheckCircle className="text-blue-600" />
                  ) : (
                    <Circle className="text-gray-400" />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
