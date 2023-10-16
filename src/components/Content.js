import React, { useEffect } from "react";
import { theme, Layout } from "antd";
import { Routes, Route, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "../styles/Navbar.css";

import BanHang from "./page/BanHang/BanHang";
import ChiTietDonHang from "./page/ChiTietDonHang";
import DanhGia from "./page/DanhGia";
import KhachHang from "./page/KhachHang/KhachHang";
import KhuyenMai from "./page/KhuyenMai";
import LienHe from "./page/LienHe";
import NhanVien from "./page/NhanVien/NhanVien";
import SanPham from "./page/SanPham";
import ThongKe from "./page/ThongKe";
import Voucher from "./page/Voucher";

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
        <Route path="/khuyenMai" element={<KhuyenMai />} />
        <Route path="/lienHe" element={<LienHe />} />
        <Route path="/nhanVien" element={<NhanVien />} />
        <Route path="/sanPham" element={<SanPham />} />
        <Route path="/thongKe" element={<ThongKe />} />
        <Route path="/voucher" element={<Voucher />} />
      </Routes>
    </Content>
  );
};

export default CustomContent;
