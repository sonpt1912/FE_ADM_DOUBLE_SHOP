import React from "react";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  EditOutlined,
  TeamOutlined,
  SkinOutlined,
  GiftOutlined,
  CommentOutlined,
  NumberOutlined,
} from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

import Logo from "../assets/logo.png";
const { Sider } = Layout;
const { SubMenu } = Menu;

const Navbar = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <div
        className="logo"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        <img src={Logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
        <div style={{ color: "Highlight", fontSize: "20px", fontWeight: "" }}>
          Double Shop
        </div>
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={({ key }) => navigate(key)}
      >
        <Menu.Item
          className="menu-item"
          key="/thongKe"
          icon={<CalendarOutlined />}
        >
          <FontAwesomeIcon icon={faChartSimple} />
          Thống Kê
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/banHang"
          icon={<DollarOutlined />}
        >
          Bán Hàng
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/chiTietDonHang"
          icon={<InfoCircleOutlined />}
        >
          Chi tiết đơn hàng
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/khachHang"
          icon={<TeamOutlined />}
        >
          Khách Hàng
        </Menu.Item>
        <Menu.Item className="menu-item" key="/sanPham" icon={<SkinOutlined />}>
          Sản Phẩm
        </Menu.Item>
        <Menu.Item className="menu-item" key="/danhGia" icon={<EditOutlined />}>
          Đánh Giá
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/voucher"
          icon={<NumberOutlined />}
        >
          Voucher
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/khuyenMai"
          icon={<GiftOutlined />}
        >
          Khuyến Mãi
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/nhanVien"
          icon={<UserOutlined />}
        >
          Nhân Viên
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/lienHe"
          icon={<CommentOutlined />}
        >
          Liên Hệ
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Navbar;
