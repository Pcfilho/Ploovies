import { createSlice } from "@reduxjs/toolkit"

const genreSlice = createSlice({
  name: "genre",
  initialState: '',
  reducers: {
    updateGenre: (_, action) => {
      if (!action.payload) return ''
      return action.payload
    }
  }
});

export const genreReducer = genreSlice.reducer;
export const { updateGenre } = genreSlice.actions;