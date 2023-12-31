import React from "react";
import { EditOutlined } from "@ant-design/icons";

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

import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Navbar = ({ collapsed }) => {
  const navigate = useNavigate();

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
          key="/thongKe"
          icon={<FontAwesomeIcon icon={faChartSimple} />}
        >
          Thống Kê
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/banHang"
          icon={<FontAwesomeIcon icon={faShop} />}
        >
          Bán Hàng
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/chiTietDonHang"
          icon={<FontAwesomeIcon icon={faReceipt} />}
        >
          Chi tiết đơn hàng
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/khachHang"
          icon={<FontAwesomeIcon icon={faUsers} />}
        >
          Khách Hàng
        </Menu.Item>
        <SubMenu icon={<FontAwesomeIcon icon={faShirt} />} title="Sản Phẩm">
          <Menu.Item key="/sanPham/ao">Áo</Menu.Item>
          <Menu.Item key="/sanPham/mau">Màu</Menu.Item>
          <Menu.Item key="/sanPham/kichCo">Kích cỡ</Menu.Item>
          <Menu.Item key="/sanPham/coAo">Cổ áo</Menu.Item>
          <Menu.Item key="/sanPham/chatLieu">Chất liệu</Menu.Item>
        </SubMenu>
        <Menu.Item
          className="menu-item"
          key="/voucher"
          icon={<FontAwesomeIcon icon={faMoneyCheck} />}
        >
          Voucher
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/hang"
          icon={<FontAwesomeIcon icon={faRankingStar} />}
        >
          Hạng
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/khuyenMai"
          icon={<FontAwesomeIcon icon={faGifts} />}
        >
          Khuyến Mãi
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/nhanVien"
          icon={<FontAwesomeIcon icon={faUserGroup} />}
        >
          Nhân Viên
        </Menu.Item>
        <SubMenu
          icon={<FontAwesomeIcon icon={faEnvelopesBulk} />}
          title="Thông tin thêm"
        >
          <Menu.Item
            key="/pham"
            className="menu-item"
            icon={<FontAwesomeIcon icon={faNewspaper} />}
          >
            Tạo bài viết
          </Menu.Item>
          <Menu.Item
            className="menu-item"
            key="/thanh"
            icon={<FontAwesomeIcon icon={faEnvelope} />}
          >
            Gửi email
          </Menu.Item>
        </SubMenu>

        <Menu.Item icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Navbar;
