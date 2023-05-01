import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import { darkModeReducer } from './reducers/darkModeReducer'

const userPersistConfig = {
  key: '@Foovies/user',
  storage: AsyncStorage,
}

const darkModePersistConfig = {
  key: '@Foovies/darkMode',
  storage: AsyncStorage
};

const persistDarkModeReducer = persistReducer(darkModePersistConfig, darkModeReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    darkMode: persistDarkModeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)