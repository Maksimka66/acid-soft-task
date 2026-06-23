import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'password' | 'email' | 'number'
    id: string
    placeholder: string
    label: string
    step?: number
    error?: string
    register: UseFormRegisterReturn
}

