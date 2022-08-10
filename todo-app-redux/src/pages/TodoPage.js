import { Button, Divider } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filters from "../components/Filters";
import TodoList from "../components/TodoList";
import { getTodos } from "../components/TodoList/todoSlice";
import { logout } from "../redux/authSlice";
import { userInfoSelector } from "../redux/selector";

const TodoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const handleLogOut = () => {
    dispatch(logout());
  };
  useEffect(() => {
    document.title = "Todo";
    !userInfo ? navigate("/login") : dispatch(getTodos(userInfo.user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  return (
    <div
      style={{
        width: 500,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 20,
        boxShadow: "0 0 10px 4px #bfbfbf",
        borderRadius: 5,
        height: "90vh",
      }}
    >
      <Title style={{ textAlign: "center" }}>TODO APP</Title>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>
          Author: <strong>{userInfo?.user?.name}</strong>
        </h3>
        <Button onClick={handleLogOut}>Logout</Button>
      </div>
      <Filters />
      <Divider />
      <TodoList />
    </div>
  );
};

export default TodoPage;
