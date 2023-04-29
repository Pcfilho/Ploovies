import { configureStore } from '@reduxjs/toolkit'
import { genreReducer } from './reducers/genreReducer'
import { userReducer } from './reducers/userReducer'

export const store = configureStore({
  reducer: {
    genre: genreReducer,
    user: userReducer
  },
})