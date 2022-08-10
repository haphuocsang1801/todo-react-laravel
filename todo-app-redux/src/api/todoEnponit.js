export const enpointTodo = (request) => {
  return `http://127.0.0.1:8000/api/todo/${request}`;
};
export const headerAuth = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  return myHeaders;
};
