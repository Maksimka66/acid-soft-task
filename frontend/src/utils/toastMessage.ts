import { toast } from 'sonner'

export function successMessage(message: string) {
    return toast.success(message, {
        style: {
            background: '#00FF7F',
            color: '#000000'
        }
    })
}

export function errorMessage(message: string) {
    return toast.error(message, {
        style: {
            background: '#B00000',
            color: '#ffffff'
        }
    })
}

