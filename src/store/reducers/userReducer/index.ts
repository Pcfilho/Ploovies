import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";

interface UserInterface {
  id: string;
}

interface Action {
  payload: UserInterface;
  type: string;
}

interface UserSelector {
  user: UserInterface;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: ''
  },
  reducers: {
    updateUser: (_, action: Action) => {
      return action.payload
    }
  }
});

export const userReducer = userSlice.reducer;
export const { updateUser } = userSlice.actions;


export const useUserSelector = () => {
  const userSelected = useSelector<UserSelector, string>((storeState) => storeState.user.id);
  return userSelected;
};