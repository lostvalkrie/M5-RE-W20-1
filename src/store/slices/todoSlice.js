import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api/todosAPI";

const initialState = {
  todos: [],
  isFetching: false,
  error: null,
};

export const getTodosThunk = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const { data } = await API.getTodos();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message });
    }
  },
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const task = state.todos.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTodosThunk.fulfilled, (state, { payload }) => {
      state.todos = payload;
      state.isFetching = false;
    });
    builder.addCase(getTodosThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
