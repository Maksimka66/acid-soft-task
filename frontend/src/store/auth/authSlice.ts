import { createSlice } from '@reduxjs/toolkit'
import { authApi } from './authApi'
import type { AuthData } from '../../interfaces/state/auth'

const accessToken = localStorage.getItem('accessToken')

const initialState: AuthData = {
    accessToken,
    refreshToken: '',
    username: '',
    email: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    selectors: {
        selectAccessToken: (state) => state.accessToken,
        selectRefreshToken: (state) => state.refreshToken,
        selectUsername: (state) => state.username,
        selectEmail: (state) => state.email
    },
    reducers: {
        savedTokens: (state, { payload }) => {
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
        },
        removeTokens: (state) => {
            state.accessToken = ''
            state.refreshToken = ''
        }
    },
    extraReducers(builder) {
        builder.addMatcher(authApi.endpoints.signUp.matchFulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
            state.username = payload.username
            state.email = payload.email

            localStorage.setItem('accessToken', payload.accessToken)
        })

        builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
            state.username = payload.username
            state.email = payload.email

            localStorage.setItem('accessToken', payload.accessToken)
        })

        builder.addMatcher(authApi.endpoints.logOut.matchFulfilled, (state) => {
            state.accessToken = ''
            state.refreshToken = ''

            localStorage.removeItem('accessToken')
        })
    }
})

export const { selectAccessToken, selectRefreshToken, selectUsername, selectEmail } =
    authSlice.selectors

export const { savedTokens, removeTokens } = authSlice.actions

export const authReducer = authSlice.reducer

