import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../baseQuery'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: '/api/user/signup',
                method: 'POST',
                body: data
            })
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: '/api/user/signin',
                method: 'POST',
                body: data
            })
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/api/user/logout',
                method: 'POST'
            })
        })
    })
})

export const { useSignUpMutation, useSignInMutation, useLogOutMutation } = authApi

