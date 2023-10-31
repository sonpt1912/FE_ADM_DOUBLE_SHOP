import React, { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import "../../../../styles/BanHangCss/NormalSell.css";
import ProductList from "./product/ProductList";
import ListCartProduct from "./product/ListCartProduct";
import { products } from "./constants/tabInfor";
import { PrimaryButton } from "../../../form/CustomButton";
import PaymentDrawer from "./drawer/PaymentDrawer";

const NormalSell = ({ currentTab }) => {
  // Lưu trữ giỏ hàng cho tab hiện tại
  const [carts, setCarts] = useState({});
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [cartsByTab, setCartsByTab] = useState({});

  // Thêm giỏ hàng cho tab hiện tại
  useEffect(() => {
    setCartsByTab((prevCartsByTab) => ({
      ...prevCartsByTab,
      [currentTab.id]: [],
    }));
  }, [currentTab]);

  const handleAddToCart = (product) => {
    const tabId = currentTab.id;

    // Lấy giỏ hàng cho tab hiện tại từ trạng thái
    const currentCart = cartsByTab[tabId] || [];

    // Sao chép giỏ hàng hiện tại và thêm sản phẩm vào đó
    const updatedCart = [...currentCart, product];

    // Cập nhật giỏ hàng cho tab hiện tại trong trạng thái
    setCartsByTab({
      ...cartsByTab,
      [tabId]: updatedCart,
    });

    // Lưu giỏ hàng vào localStorage cho tab hiện tại
    localStorage.setItem(`cart_${tabId}`, JSON.stringify(updatedCart));
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
  };
  return (
    <div className="container">
      <div className="left">
        <div className="top-left">
          <h2>Content of Tab Normal {currentTab.title}</h2>
          <ListCartProduct
            products={cartsByTab[currentTab.id] || []}
            activeTab={currentTab}
          />
        </div>
        <div className="bottom-left">Phần dưới bên trái (1/8 màn hình)</div>
      </div>
      <div className="right">
        <div className="top-right">
          <h2>Danh sách sản phẩm</h2>
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
            activeTab={currentTab}
          />
        </div>
        <div className="bottom-right">
          <PrimaryButton onClick={showDrawer}>Thanh Toán</PrimaryButton>
        </div>
        <PaymentDrawer visible={isDrawerVisible} onClose={onClose} />
      </div>
    </div>
  );
};

export default NormalSell;
