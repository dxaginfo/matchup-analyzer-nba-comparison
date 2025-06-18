import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { searchPlayersByName } from '../../api/playersApi'
import { Player } from '../../models/Player'

interface PlayerSearchState {
  results: Player[]
  loading: boolean
  error: string | null
}

const initialState: PlayerSearchState = {
  results: [],
  loading: false,
  error: null,
}

export const searchPlayers = createAsyncThunk(
  'playerSearch/searchPlayers',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const players = await searchPlayersByName(searchTerm)
      return players
    } catch (error) {
      return rejectWithValue('Failed to fetch players. Please try again.')
    }
  }
)

export const playerSearchSlice = createSlice({
  name: 'playerSearch',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPlayers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchPlayers.fulfilled, (state, action: PayloadAction<Player[]>) => {
        state.loading = false
        state.results = action.payload
      })
      .addCase(searchPlayers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearSearchResults } = playerSearchSlice.actions

export default playerSearchSlice.reducer
