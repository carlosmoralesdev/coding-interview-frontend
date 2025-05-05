'use client'

import { Dispatch, SetStateAction } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'

interface SelectorProps {
  show: boolean
  type: 'fiat' | 'crypto'
  setShow: Dispatch<SetStateAction<boolean>>
  options: any[]
  indexSelected: number
  setIndexSelected: (value: number) => void
}

export default function Selector({ type, show, setShow, options, indexSelected, setIndexSelected }: SelectorProps) {

  return (
    <>
      <div style={!show ? { display: 'none' } : {}} className='fixed inset-0 h-[100dvh] w-[100dvw] bg-black/40 z-20'></div>
      <div className="flex items-end justify-center bg-transparent p-4 absolute z-30">
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.1 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg max-h-[90%] overflow-y-auto"
            >
              <h2 className="text-center text-lg font-semibold mb-4 text-black pt-4">{type?.toUpperCase()}</h2>

              <ul className="px-4 pb-6">
                {options.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between py-3 border-b border-gray-200"
                    onClick={() => {
                      setIndexSelected(index)
                      setShow(false)
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.flag}</span>
                      <div>
                        <div className="text-sm font-bold">{item.code}</div>
                        <div className="text-xs text-gray-500">{item.label}</div>
                      </div>
                    </div>
                    {indexSelected === index ? (
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
    </>
  )
}
