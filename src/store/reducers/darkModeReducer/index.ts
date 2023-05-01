import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";

interface DarkModeInterface {
  isDarkMode: boolean;
}

interface Action {
  payload: DarkModeInterface;
  type: string;
}

interface DarkModeSelector {
  darkMode: DarkModeInterface;
}

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    isDarkMode: false
  },
  reducers: {
    updateDarkMode: (_, action: Action) => {
      return action.payload
    }
  }
});

export const darkModeReducer = darkModeSlice.reducer;
export const { updateDarkMode } = darkModeSlice.actions;


export const useDarkModeSelector = () => {
  const darkModeSelector = useSelector<DarkModeSelector, boolean>((storeState) => storeState.darkMode.isDarkMode);
  return darkModeSelector;
};