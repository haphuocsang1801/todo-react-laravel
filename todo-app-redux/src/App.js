import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import TodoPage from "./pages/TodoPage";
import { authSlice } from "./redux/authSlice";
function App() {
  const dispatch = useDispatch();
  dispatch(authSlice.actions.getUserInfo());
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
        </Route>
        <Route path="/todo" element={<TodoPage />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
