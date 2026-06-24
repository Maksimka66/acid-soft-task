import type { Exercise } from './exercises'

export interface Workout {
    id: string
    name: string
    description: string
    userId: number
    createdAt: string
    updatedAt: string
}

export interface WorkoutsState {
    workouts: Workout[]
    totalPages: number
    filteredWorkouts: Workout[]
    currentWorkout: Workout | null
    exercises: Exercise[]
}

export interface WorkoutItemProps {
    workoutItem: Workout
}

