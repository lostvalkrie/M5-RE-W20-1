import { createSlice } from "@reduxjs/toolkit";

const initialTasks = [
  {
    id: "1",
    body: "Вивчити основи Redux Toolkit",
    isDone: false,
    deadline: "2026-11-01",
  },
  {
    id: "2",
    body: "Підключити Formik та Yup до форми",
    isDone: true,
    deadline: "2026-10-20",
  },
];

const todoSlice = createSlice({
  name: "todos",
  initialState: initialTasks,
  reducers: {
    deleteTodo: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
    addTodo: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
