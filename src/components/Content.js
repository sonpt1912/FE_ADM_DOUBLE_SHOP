import React, { useEffect } from "react";
import { theme, Layout } from "antd";
import { Routes, Route, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "../styles/Navbar.css";

import BanHang from "./page/BanHang/BanHang";
import ChiTietDonHang from "./page/ChiTietDonHang";
import DanhGia from "./page/DanhGia/DanhGia";
import KhachHang from "./page/KhachHang/KhachHang";
import Promotion from "./page/Promotion/Promotion";
import LienHe from "./page/LienHe";
import NhanVien from "./page/NhanVien/NhanVien";
import SanPham from "./page/SanPham";
import ThongKe from "./page/ThongKe";
import Voucher from "./page/Voucher/Voucher";
import HangKhachHang from "./page/Hang/HangKhachHang";
import Ao from "./page/SanPham/Ao/Ao";
import ChatLieu from "./page/SanPham/ChatLieu/ChatLieu";
import CoAo from "./page/SanPham/CoAo/CoAo";
import KichCo from "./page/SanPham/KichCo/KichCo";
import Mau from "./page/SanPham/Mau/Mau";
import Login from "./Login";
import AddKhachHang from "./page/KhachHang/AddKhachHang";

const { Content } = Layout;

const CustomContent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  useEffect(() => {
    scroll.scrollToTop();
  }, [location.pathname]);
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: "calc(100vh - 48px)",
        background: colorBgContainer,
      }}
    >
      <Routes>
        <Route path="/banHang" element={<BanHang />} />
        <Route path="/chiTietDonHang" element={<ChiTietDonHang />} />
        <Route path="/danhGia" element={<DanhGia />} />
        <Route path="/khachHang" element={<KhachHang />} />
        <Route path="/khuyenMai" element={<Promotion />} />
        <Route path="/lienHe" element={<LienHe />} />
        <Route path="/sanPham/ao" element={<Ao />} />
        <Route path="/sanPham/chatLieu" element={<ChatLieu />} />
        <Route path="/sanPham/coAo" element={<CoAo />}/>
        <Route path="/sanPham/kichCo" element={<KichCo />} />
        <Route path="/sanPham/mau" element={<Mau />} />
        <Route path="/nhanVien" element={<NhanVien />} />
        <Route path="/sanPham" element={<SanPham />} />
        <Route path="/thongKe" element={<ThongKe />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/hang" element={<HangKhachHang />} />
        <Route path="/khachHang/taoKhachHang" element = {<AddKhachHang/>}/>
      </Routes>
    </Content>
  );
};

export default CustomContent;
