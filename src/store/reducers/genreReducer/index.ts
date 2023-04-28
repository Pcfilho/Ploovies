import { createSlice } from "@reduxjs/toolkit"

interface Action {
  payload: string;
  type: string;
}

const genreSlice = createSlice({
  name: "genre",
  initialState: '',
  reducers: {
    updateGenre: (_, action: Action) => {
      if (!action.payload) return ''
      return action.payload
    }
  }
});

export const genreReducer = genreSlice.reducer;
export const { updateGenre } = genreSlice.actions;