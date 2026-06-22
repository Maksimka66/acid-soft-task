import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../baseQuery'

export const historyApi = createApi({
    reducerPath: 'historyApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getFullHistory: builder.query({
            query: () => '/api/history'
        })
    })
})

export const { useLazyGetFullHistoryQuery } = historyApi

