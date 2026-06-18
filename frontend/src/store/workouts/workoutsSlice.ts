import { createSlice } from '@reduxjs/toolkit'
import { workoutsApi } from './workoutsApi'

const initialState = {
    workouts: []
}

export const workoutsSlice = createSlice({
    name: 'workouts',
    initialState,
    selectors: {
        selectWorkouts: (state) => state.workouts
    },
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            workoutsApi.endpoints.getAllWorkouts.matchFulfilled,
            (state, { payload }) => {
                state.workouts = payload
            }
        )
    }
})

export const { selectWorkouts } = workoutsSlice.selectors

export const workoutsReducer = workoutsSlice.reducer

