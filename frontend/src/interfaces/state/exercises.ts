export interface Exercise {
    id: string
    name: string
    sets: number
    reps: number
    weight: number
    workoutId: number
    createdAt: string
    updatedAt: string
}

export interface ExercisesItemProps {
    exerciseItem: Exercise
}

