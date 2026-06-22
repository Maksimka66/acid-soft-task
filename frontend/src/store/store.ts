import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/authSlice'
import { authApi } from './auth/authApi'
import { workoutsApi } from './workouts/workoutsApi'
import { workoutsReducer } from './workouts/workoutsSlice'
import { historyReducer } from './history/historySlice'
import { historyApi } from './history/historyApi'

const rootReducer = combineReducers({
    auth: authReducer,
    workouts: workoutsReducer,
    history: historyReducer,
    [authApi.reducerPath]: authApi.reducer,
    [workoutsApi.reducerPath]: workoutsApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(workoutsApi.middleware)
            .concat(historyApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

