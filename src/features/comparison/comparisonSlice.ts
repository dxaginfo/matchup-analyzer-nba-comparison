import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Player } from '../../models/Player'

interface ComparisonState {
  selectedPlayers: Player[]
  compareBy: 'season' | 'career'
  season: string
}

const initialState: ComparisonState = {
  selectedPlayers: [],
  compareBy: 'season',
  season: '2024-25', // Default to current season
}

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addPlayerToComparison: (state, action: PayloadAction<Player>) => {
      // Only add if not already in the list and there are fewer than 4 players
      if (
        state.selectedPlayers.length < 4 &&
        !state.selectedPlayers.some(p => p.id === action.payload.id)
      ) {
        state.selectedPlayers.push(action.payload)
      }
    },
    removePlayerFromComparison: (state, action: PayloadAction<string>) => {
      state.selectedPlayers = state.selectedPlayers.filter(
        player => player.id !== action.payload
      )
    },
    clearComparisonPlayers: (state) => {
      state.selectedPlayers = []
    },
    setCompareBy: (state, action: PayloadAction<'season' | 'career'>) => {
      state.compareBy = action.payload
    },
    setSeason: (state, action: PayloadAction<string>) => {
      state.season = action.payload
    },
  },
})

export const {
  addPlayerToComparison,
  removePlayerFromComparison,
  clearComparisonPlayers,
  setCompareBy,
  setSeason,
} = comparisonSlice.actions

export default comparisonSlice.reducer
