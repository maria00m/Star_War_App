import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './testSplice'
// import { charactersReducer } from './charactersSlice'

export const store = configureStore({
  reducer: {
   counter:counterReducer,
  //  characters: charactersReducer
  },
})
