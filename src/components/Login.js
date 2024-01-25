import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogle } from "../config/api";
import { selectIsAuthenticated } from "../store/slice/AuthReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      navigate("/login");
    } else if (isAuthenticated) {
      navigate("/dashboard/thongKe");
    }
  }, [isAuthenticated, navigate]);

  const onFailureGoogle = (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please log in.");
      navigate("/login");
    } else {
      console.error("Google login failed:", error);
    }
  };
  const onFinish = async (values) => {
    try {
      const result = await dispatch(
        login({ username: values.username, password: values.password })
      );

      if (
        result.error &&
        result.error.message ===
          "Access Denied !! Full authentication is required to access this resource"
      ) {
        message.error(
          "Access Denied !! Full authentication is required to access this resource"
        );
      } else {
        navigate("/dashboard/thongKe");
      }
    } catch (error) {
      console.error("Failed:", error);

      if (error.response && error.response.status === 401) {
        message.error("Username or password is incorrect");
      } else {
        message.error("Login failed");
        navigate("/login");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSuccessGoogle = async (response) => {
    try {
      const result = await dispatch(loginGoogle(response.credential));
      if (
        result.error &&
        result.error.message ===
          "Access Denied !! Full authentication is required to access this resource"
      ) {
        message.error(
          "Access Denied !! Full authentication is required to access this resource"
        );
      } else {
        navigate("/dashboard/thongKe");
      }
    } catch (error) {
      message.error("Login failed:");
      console.error("Login failed:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="371453517569-sdlqpnul2t1iihsrk3u2apb6qvik0cvh.apps.googleusercontent.com">
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img
              src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
              alt="Login"
            />
          </div>
          <Form
            id="login-form"
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="form-title">Welcome back</p>
            <p>Login to the Dashboard</p>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <GoogleLogin
                onSuccess={onSuccessGoogle}
                onFailure={onFailureGoogle}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
