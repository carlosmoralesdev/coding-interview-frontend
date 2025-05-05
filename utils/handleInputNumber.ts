import { Dispatch, SetStateAction } from "react"

export const handleInputNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    const value = e.target.value
  
    if(value.length > 6) return
    // Solo permitir dígitos y un punto decimal opcional
    const regex = /^(\d+)?(\.\d*)?$/
  
    if (value === '' || regex.test(value)) {
      setState(value)
    }
  }