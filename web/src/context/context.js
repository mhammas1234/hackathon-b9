import React, { createContext, useReducer } from 'react'
import { reducer } from './reducer';
export const GlobalContext = createContext("Initial Value");
let data = {
  user: {}, // {firstName: 'some random name', lastName: 'some random name', email: 'some random name'}
  role: null, // null || 'user' || 'admin'
  isLogin: null, // null || true || false
  // name: 'some random name',
  darkTheme: true,
}
export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}