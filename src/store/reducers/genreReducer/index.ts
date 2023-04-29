import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";

interface Action {
  payload: string;
  type: string;
}

interface IGenreSelector {
  genre: string;
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


export const useGenreSelector = () => {
  const genreSelected = useSelector<IGenreSelector, string>((storeState) => storeState.genre)
  return genreSelected;
};