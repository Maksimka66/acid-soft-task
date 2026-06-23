import { createSlice } from '@reduxjs/toolkit'
import { workoutsApi } from './workoutsApi'

const initialState = {
    workouts: [],
    filteredWorkouts: [],
    currentWorkout: null,
    exercises: []
}

export const workoutsSlice = createSlice({
    name: 'workouts',
    initialState,
    selectors: {
        selectWorkouts: (state) => state.workouts,
        selectFilteredWorkouts: (state) => state.filteredWorkouts,
        selectCurrentWorkout: (state) => state.currentWorkout,
        selectExercises: (state) => state.exercises
    },
    reducers: {
        filterWorkouts: (state, { payload }) => {
            if (!payload) {
                state.filteredWorkouts = []
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
                state.exercises = payload.exercises
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
            workoutsApi.endpoints.addExercise.matchFulfilled,
            (state, { payload }) => {
                state.exercises.push(payload)
            }
        )

        builder.addMatcher(
            workoutsApi.endpoints.deleteExercise.matchFulfilled,
            (state, { payload }) => {
                state.exercises = state.exercises.filter((item) => item.id !== payload.id)
            }
        )

        builder.addMatcher(
            workoutsApi.endpoints.updateExercise.matchFulfilled,
            (state, { payload }) => {
                const updatedIndex = state.exercises.findIndex((item) => item.id === payload.id)

                state.exercises[updatedIndex] = payload
            }
        )
    }
})

export const { selectWorkouts, selectFilteredWorkouts, selectCurrentWorkout, selectExercises } =
    workoutsSlice.selectors

export const { filterWorkouts } = workoutsSlice.actions

export const workoutsReducer = workoutsSlice.reducer

