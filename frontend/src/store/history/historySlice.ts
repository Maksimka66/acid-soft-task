import { createSlice } from '@reduxjs/toolkit'
import { historyApi } from './historyApi'
import { workoutsApi } from '../workouts/workoutsApi'
import type { HistoryState } from '../../interfaces/state/history'

const initialState: HistoryState = {
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

        builder.addMatcher(
            workoutsApi.endpoints.completeWorkout.matchFulfilled,
            (state, { payload }) => {
                state.history.push(payload)
            }
        )
    }
})

export const { selectHistory } = historySlice.selectors

export const historyReducer = historySlice.reducer

