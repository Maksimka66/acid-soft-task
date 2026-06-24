import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'
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

export interface ModalWindowProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

export interface CloseButtonProps {
    onClose: () => void
}

export interface ActionButtonProps {
    children: ReactNode
    toggleModal: (toggle: boolean) => void
    isOpen: boolean
}

export interface EmptyStateProps {
    children: ReactNode
}

export interface BackToPreviousPageProps {
    to: string
    children: ReactNode
}

export interface AddToHistoryButtonProps {
    id: string | undefined
}

export interface AddWorkoutButtonProps {
    openModal: () => void
}

export interface ConfirmDeleteExerciseProps {
    id: string | undefined
    exerciseId: string
    toggleModal: (toggle: boolean) => void
}

export interface ConfirmDeleteWorkoutProps {
    id: string | undefined
    toggleModal: (toggle: boolean) => void
}

export interface PaginationProps {
    handlePrevious: () => void
    handleNext: () => void
    disabledPrevious: boolean
    disabledNext: boolean
}

export interface SearchWorkoutProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface SubmitFormButtonProps {
    children: ReactNode
}

export interface ConfirmLogoutProps {
    toggleModal: () => void
}

