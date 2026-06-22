import { z } from 'zod'

export const ValidateSchemaSignUp = z
    .object({
        username: z
            .string()
            .trim()
            .min(3, 'Username must be at least 3 characters')
            .max(50, 'Username must be at most 50 characters'),
        email: z.email('Invalid email'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(50, 'Password must be at most 50 characters'),
        confirmPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(50, 'Password must be at most 50 characters')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords don`t match',
        path: ['confirmPassword']
    })

