import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

const CustomHeader = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const token = localStorage.getItem("token");
  const isTokenExist = !!token;

  const navigate = useNavigate();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default CustomHeader;
