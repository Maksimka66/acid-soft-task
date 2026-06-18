import {
    type BaseQueryFn,
    type FetchArgs,
    fetchBaseQuery,
    type FetchBaseQueryError
} from '@reduxjs/toolkit/query'
import { type RootState } from './store'
import { savedToken } from './auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState
        const token = state.auth.accessToken

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        } else {
            headers.delete('Authorization')
        }

        return headers
    }
})

const baseQueryForRefresh = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_CLIENT_URL,
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState
        const refreshToken = state.auth.refreshToken

        if (refreshToken) {
            headers.set('Authorization', `Bearer ${refreshToken}`)
        } else {
            headers.delete('Authorization')
        }

        return headers
    }
})

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        // const state = api.getState() as RootState

        const refreshResult = await baseQueryForRefresh(
            {
                url: '/user/refresh',
                method: 'POST'
            },
            api,
            extraOptions
        )

        if (refreshResult.data) {
            api.dispatch(savedToken(refreshResult.data))

            result = await baseQuery(args, api, extraOptions)
        } else {
            console.log('No token!')
        }
    }

    return result
}

