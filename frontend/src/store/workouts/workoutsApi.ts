import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../baseQuery'

export const workoutsApi = createApi({
    reducerPath: 'workoutsApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllWorkouts: builder.query({
            query: ({ page, limit }) => `/api/workouts?page=${page}&limit=${limit}`
        }),
        getOneWorkout: builder.query({
            query: (id) => `/api/workouts/${id}`
        }),
        createWorkout: builder.mutation({
            query: (body) => ({
                url: '/api/workouts',
                method: 'POST',
                body
            })
        }),
        updateWorkout: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/api/workouts/${id}`,
                method: 'PUT',
                body
            })
        }),
        deleteWorkout: builder.mutation({
            query: (id) => ({
                url: `/api/workouts/${id}`,
                method: 'DELETE'
            })
        }),
        completeWorkout: builder.mutation({
            query: (id) => ({
                url: `/api/workouts/${id}/complete`,
                method: 'POST'
            })
        }),
        addExercise: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/api/workouts/${id}/exercises`,
                method: 'POST',
                body
            })
        }),
        deleteExercise: builder.mutation({
            query: ({ id, exerciseId }) => ({
                url: `/api/workouts/${id}/exercises/${exerciseId}`,
                method: 'DELETE'
            })
        }),
        updateExercise: builder.mutation({
            query: ({ id, exerciseId, ...body }) => ({
                url: `/api/workouts/${id}/exercises/${exerciseId}`,
                method: 'PUT',
                body
            })
        })
    })
})

export const {
    useLazyGetAllWorkoutsQuery,
    useLazyGetOneWorkoutQuery,
    useCreateWorkoutMutation,
    useUpdateWorkoutMutation,
    useDeleteWorkoutMutation,
    useCompleteWorkoutMutation,
    useAddExerciseMutation,
    useDeleteExerciseMutation,
    useUpdateExerciseMutation
} = workoutsApi

