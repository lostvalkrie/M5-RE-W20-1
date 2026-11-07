import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice.js";
import userReducer from "./slices/userSlice.js";
const store = configureStore({
  reducer: { todos: todoReducer, user: userReducer },
});

export default store;
