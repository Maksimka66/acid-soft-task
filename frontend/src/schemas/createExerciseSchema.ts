import { z } from 'zod'

export const ValidateSchemaCreateExercise = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name must be at most 50 characters'),
    sets: z.number().int().min(1, 'Minimum 1 set'),
    reps: z.number().int().min(1, 'Minimum 1 rep'),
    weight: z.number().min(0, 'Weight cannot be negative')
})

