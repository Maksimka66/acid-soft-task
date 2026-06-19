import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'password' | 'email' | 'number'
    placeholder: string
    label: string
    id: string
    error?: string
    register: UseFormRegisterReturn
}

