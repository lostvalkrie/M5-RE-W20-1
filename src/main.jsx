import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TodoPage from "./components/TodoPage/TodoPage.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import User from "./components/User/User.jsx";

import "./reset.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <User />
    <TodoPage />
  </Provider>,
);
