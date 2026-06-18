import { z } from 'zod'

export const ValidateSchemaSignIn = z.object({
    email: z.email('Invalid email'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password must be at most 50 characters')
})

