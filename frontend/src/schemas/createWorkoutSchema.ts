import { z } from 'zod'

export const ValidateSchemaCreateWorkout = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters'),
    description: z
        .string()
        .min(4, 'Minimum 4 symbols should be')
        .max(400, 'Maximum limit')
        .optional()
})

