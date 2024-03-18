import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faUsers,
  faShirt,
  faGifts,
  faMoneyCheck,
  faUserGroup,
  faReceipt,
  faRankingStar,
  faShop,
  faEnvelopesBulk,
  faEnvelope,
  faNewspaper,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/logo.png";

import { Modal, Menu, Layout, Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Navbar = ({ collapsed }) => {
  const navigate = useNavigate();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCancel = () => {
    setLogoutModalVisible(false);
  };

  return (
    <Sider
      style={{ background: "#f4f9fc" }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="demo-logo-vertical" />
      <div
        className="logo"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={({ key }) => navigate(key)}
        style={{ background: "#f4f9fc" }}
      >
        <Menu.Item
          className="menu-item"
          key="/dashboard/thongKe"
          icon={<FontAwesomeIcon icon={faChartSimple} />}
        >
          Thống Kê
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/dashboard/banHang"
          icon={<FontAwesomeIcon icon={faShop} />}
        >
          Bán Hàng
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/dashboard/chiTietDonHang"
          icon={<FontAwesomeIcon icon={faReceipt} />}
        >
          Chi tiết đơn hàng
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/dashboard/khachHang"
          icon={<FontAwesomeIcon icon={faUsers} />}
        >
          Khách Hàng
        </Menu.Item>
        <SubMenu
          icon={<FontAwesomeIcon icon={faShirt} />}
          title="Sản Phẩm"
          key="/dashboard/sanPham"
        >
          <Menu.Item key="/dashboard/sanPham/ao">Áo</Menu.Item>
          <Menu.Item key="/dashboard/sanPham/mau">Màu</Menu.Item>
          <Menu.Item key="/dashboard/sanPham/kichCo">Kích cỡ</Menu.Item>
          <Menu.Item key="/dashboard/sanPham/coAo">Cổ áo</Menu.Item>
          <Menu.Item key="/dashboard/sanPham/chatLieu">Chất liệu</Menu.Item>
          <Menu.Item key="/dashboard/sanPham/category">Loại sản phẩm</Menu.Item>
          <Menu.Item key="/dashboard/sanPham/brand">Thương hiệu</Menu.Item>
        </SubMenu>
        <Menu.Item
          className="menu-item"
          key="/dashboard/voucher"
          icon={<FontAwesomeIcon icon={faMoneyCheck} />}
        >
          Voucher
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/dashboard/hang"
          icon={<FontAwesomeIcon icon={faRankingStar} />}
        >
          Hạng
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/dashboard/khuyenMai"
          icon={<FontAwesomeIcon icon={faGifts} />}
        >
          Khuyến Mãi
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/dashboard/nhanVien"
          icon={<FontAwesomeIcon icon={faUserGroup} />}
        >
          Nhân Viên
        </Menu.Item>
        <SubMenu
          key="/dashboard/thongTinThem"
          icon={<FontAwesomeIcon icon={faEnvelopesBulk} />}
          title="Thông tin thêm"
        >
          <Menu.Item
            key="/dashboard/pham"
            className="menu-item"
            icon={<FontAwesomeIcon icon={faNewspaper} />}
          >
            Tạo bài viết
          </Menu.Item>
          <Menu.Item
            className="menu-item"
            key="/dashboard/thanh"
            icon={<FontAwesomeIcon icon={faEnvelope} />}
          >
            Gửi email
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
          key={"/dashboard/logout"}
          onClick={showLogoutModal}
        >
          Đăng xuất
        </Menu.Item>
      </Menu>

      <Modal
        title="Xác nhận đăng xuất"
        visible={logoutModalVisible}
        onOk={handleLogout}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn đăng xuất?</p>
      </Modal>
    </Sider>
  );
};

export default Navbar;
