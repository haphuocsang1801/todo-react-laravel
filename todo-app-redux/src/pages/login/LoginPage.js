import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { userInfoSelector } from "../../redux/selector";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userError, setUserError] = useState("");
  const onFinish = async (values) => {
    try {
      const action = await dispatch(login(values));
      const current = unwrapResult(action);
    } catch (error) {
      setUserError(error.message);
    }
  };
  const userInfo = useSelector(userInfoSelector);
  useEffect(() => {
    document.title = "Login";
    if (userInfo) {
      navigate("/todo");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  return (
    <div className="auth-item">
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {userError && (
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
            style={{
              marginBottom: 0,
            }}
          >
            <span
              style={{
                color: "red",
              }}
            >
              {userError}
            </span>
          </Form.Item>
        )}

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Link className="login-form-forgot" to={"/register"}>
            Or register now!
          </Link>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type="primary" size="large" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
