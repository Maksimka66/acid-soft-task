import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function isApiError(
    error: unknown
): error is FetchBaseQueryError & { data: { message: string } } {
    return typeof error === 'object' && error !== null && 'data' in error
}

