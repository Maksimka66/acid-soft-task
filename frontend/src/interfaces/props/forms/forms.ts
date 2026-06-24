export interface ChangeWorkoutFormProps {
    id: string | undefined
    isOpen: boolean
    onClose: () => void
}

export interface ChangeExerciseFormProps {
    id: string | undefined
    exerciseId: string
    isOpen: boolean
    onClose: () => void
}

export interface CreateExerciseFormProps {
    id: string | undefined
    isOpen: boolean
    onClose: () => void
}

export interface CreateWorkoutFormProps {
    isOpen: boolean
    onClose: () => void
}

