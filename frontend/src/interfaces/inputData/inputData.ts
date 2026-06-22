export interface ISignUpForm {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export interface ISignInForm {
    email: string
    password: string
}

export interface ICreateWorkout {
    name: string
    description?: string
}

export interface IUpdateWorkout {
    name: string
    description?: string
}

export interface ICreateExercise {
    name: string
    sets: number
    reps: number
    weight: number
}

