import { createSlice } from '@reduxjs/toolkit'
import { historyApi } from './historyApi'

const initialState = {
    history: []
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    selectors: {
        selectHistory: (state) => state.history
    },
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            historyApi.endpoints.getFullHistory.matchFulfilled,
            (state, { payload }) => {
                state.history = payload
            }
        )
    }
})

export const { selectHistory } = historySlice.selectors

export const historyReducer = historySlice.reducer

