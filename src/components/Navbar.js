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
import {
  faChartSimple,
  faUsers,
  faShirt,
  faGifts,
  faMoneyCheck,
  faUserGroup,
  faEnvelopeOpenText,
  faReceipt,
  faRankingStar,
  faShop,
  faEnvelope,
  faComments,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

import Logo from "../assets/logo.png";
import { size } from "lodash";
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
          <Menu.Item key="/Ao">Áo</Menu.Item>
          <Menu.Item key="/Mau">Màu</Menu.Item>
          <Menu.Item key="/KichCo">Kích cỡ</Menu.Item>
          <Menu.Item key="/CoAo">Cổ áo</Menu.Item>
          <Menu.Item key="/Chatlieu">Chất liệu</Menu.Item>
          {/* <Menu.Item key="/">Sơn</Menu.Item> */}
        </SubMenu>
        <Menu.Item className="menu-item" key="/danhGia" icon={<EditOutlined />}>
          Đánh Giá
        </Menu.Item>
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
          icon={<FontAwesomeIcon icon={faEnvelopeOpenText} />}
          title="Liên Hệ"
        >
          <Menu.Item
            key="/pham"
            className="menu-item"
            icon={<FontAwesomeIcon icon={faComments} />}
          >
            Chat trực tuyến
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
