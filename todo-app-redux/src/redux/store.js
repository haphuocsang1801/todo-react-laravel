import { configureStore } from "@reduxjs/toolkit";
import { filtersSlice } from "../components/Filters/filterSlice";
import { todoListSlice } from "../components/TodoList/todoSlice";
import { authSlice } from "./authSlice";

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoListSlice.reducer,
    authUser: authSlice.reducer,
  },
});
export default store;
