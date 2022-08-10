import { createSelector } from "reselect";

export const searchTextSelector = (state) => state.filters.search;
export const todoListSelector = (state) => state.todoList.todos;
export const statusFilterSelector = (state) => state.filters.status;
export const prioritiesFilterSelector = (state) => state.filters.priority;
export const userSelector = (state) => {
  return state?.authUser?.data;
};
const userError = (state) => state.authUser.error;

export const userErrorSelector = createSelector(
  userError,
  (error) => error?.message
);

export const userInfoSelector = createSelector(userSelector, (userInfo) => {
  return userInfo;
});

export const todosRemainingSelector = createSelector(
  todoListSelector,
  statusFilterSelector,
  prioritiesFilterSelector,
  searchTextSelector,
  (todoList, status, priorities, searchText) => {
    return todoList?.filter((todo) => {
      if (status === "All") {
        return priorities.length > 0
          ? todo.name.toLowerCase().includes(searchText.toLowerCase()) &&
              priorities.includes(todo.priority)
          : todo.name.toLowerCase().includes(searchText.toLowerCase());
      }
      return (
        todo.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (status === "Completed" ? todo.completed : !todo.completed) &&
        (priorities.length > 0 ? priorities.includes(todo.priority) : true)
      );
    });
  }
);
