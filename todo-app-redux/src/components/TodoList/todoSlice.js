import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enpointTodo as endpointTodo, headerAuth } from "../../api/todoEnponit";
export const todoListSlice = createSlice({
  name: "todoList",
  initialState: {
    status: "idle",
    todos: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = "idle";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = "idle";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const currentState = state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          } else {
            return todo;
          }
        });
        state.todos = currentState;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const currentState = state.todos.filter((todo) => {
          return todo.id !== parseInt(action.payload);
        });
        state.todos = currentState;
      });
  },
});

const fetchTodos = async (author) => {
  const res = await fetch(endpointTodo(`gets/${author}`), {
    method: "GET",
    headers: headerAuth(),
  });
  const data = await res.json();
  return data.todos;
};
export const getTodos = createAsyncThunk("todos/getsTodos", async (author) => {
  const res = await fetchTodos(author);
  return res;
});
export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (newData) => {
    await fetch(endpointTodo("store"), {
      method: "POST",
      headers: headerAuth(),
      body: JSON.stringify(newData),
    });
    const todos = await fetchTodos(newData.author);
    return todos;
  }
);
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, name, priority, completed, author }) => {
    const res = await fetch(endpointTodo(`update/${id}`), {
      method: "PUT",
      headers: headerAuth(),
      body: JSON.stringify({ name, completed: !completed, priority, author }),
    });
    const data = await res.json();
    return data;
  }
);
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const res = await fetch(endpointTodo(`delete/${id}`), {
    method: "DELETE",
    headers: headerAuth(),
  });
  const data = await res.json();
  return data.id;
});
