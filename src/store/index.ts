import { configureStore } from '@reduxjs/toolkit'
import playerSearchReducer from '../features/playerSearch/playerSearchSlice'
import comparisonReducer from '../features/comparison/comparisonSlice'

export const store = configureStore({
  reducer: {
    playerSearch: playerSearchReducer,
    comparison: comparisonReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
