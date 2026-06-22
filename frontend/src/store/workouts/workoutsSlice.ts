import { createSlice } from '@reduxjs/toolkit'
import { workoutsApi } from './workoutsApi'

const initialState = {
    workouts: [],
    filteredWorkouts: [],
    currentWorkout: null
}

export const workoutsSlice = createSlice({
    name: 'workouts',
    initialState,
    selectors: {
        selectWorkouts: (state) => state.workouts,
        selectFilteredWorkouts: (state) => state.filteredWorkouts,
        selectCurrentWorkout: (state) => state.currentWorkout
    },
    reducers: {
        filterWorkouts: (state, { payload }) => {
            if (!payload) {
                state.filteredWorkouts = state.workouts
            } else {
                state.filteredWorkouts = state.workouts.filter((item) =>
                    item.name.toLowerCase().includes(payload.toLowerCase())
                )
            }
        }
    },
    extraReducers(builder) {
        builder.addMatcher(
            workoutsApi.endpoints.getAllWorkouts.matchFulfilled,
            (state, { payload }) => {
                state.workouts = payload
            }
        )

        builder.addMatcher(
            workoutsApi.endpoints.getOneWorkout.matchFulfilled,
            (state, { payload }) => {
                state.currentWorkout = payload
            }
        )

        builder.addMatcher(
            workoutsApi.endpoints.createWorkout.matchFulfilled,
            (state, { payload }) => {
                state.workouts.push(payload)
            }
        )

        builder.addMatcher(
            workoutsApi.endpoints.updateWorkout.matchFulfilled,
            (state, { payload }) => {
                const updatedIndex = state.workouts.findIndex((item) => item.id === payload.id)

                state.workouts[updatedIndex] = payload

                state.currentWorkout = payload
            }
        )

        builder.addMatcher(
            workoutsApi.endpoints.deleteWorkout.matchFulfilled,
            (state, { payload }) => {
                state.workouts = state.workouts.filter((workout) => workout.id !== payload.id)
            }
        )

        builder.addMatcher(
            workoutsApi.endpoints.completeWorkout.matchFulfilled,
            (state, { payload }) => {}
        )
    }
})

export const { selectWorkouts, selectFilteredWorkouts, selectCurrentWorkout } =
    workoutsSlice.selectors

export const { filterWorkouts } = workoutsSlice.actions

export const workoutsReducer = workoutsSlice.reducer

