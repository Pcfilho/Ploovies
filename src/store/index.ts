import { configureStore } from '@reduxjs/toolkit'
import { genreReducer } from './reducers/genreReducer'

export const store = configureStore({
  reducer: {
    genre: genreReducer,
  },
})