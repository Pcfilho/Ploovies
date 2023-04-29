import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";

interface Action {
  payload: IUser;
  type: string;
}

interface IUser {
  id: string;
}

interface IUserSelector {
  user: IUser;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: ''
  } as IUser,
  reducers: {
    updateUser: (_, action: Action) => {
      return action.payload
    }
  }
});

export const userReducer = userSlice.reducer;
export const { updateUser } = userSlice.actions;


export const useUserSelector = () => {
  const userSelected = useSelector<IUserSelector, IUser>((storeState) => storeState.user)
  return userSelected;
};