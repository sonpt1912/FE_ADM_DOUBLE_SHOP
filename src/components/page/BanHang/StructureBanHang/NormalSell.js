import React, { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import "../../../../styles/BanHangCss/NormalSell.css";
import ProductList from "./ProductList";
import ListCartProduct from "./ListCartProduct";
import { products } from "./constants/tabInfor";
import { PrimaryButton } from "../../../form/CustomButton";

const NormalSell = ({ currentTab }) => {
  const [productsByTab, setProductsByTab] = useState({ [currentTab.id]: [] });

  useEffect(() => {
    console.log("Current tab normalSell:", currentTab);
  }, [currentTab]);

  // Khởi tạo trạng thái cart từ localStorage khi ứng dụng khởi động
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);

    // Lấy danh sách sản phẩm cho tab hiện tại
    const productsForCurrentTab = productsByTab[currentTab.id];

    // Thêm sản phẩm vào danh sách cho tab hiện tại
    const updatedProductsForCurrentTab = [...productsForCurrentTab, product];

    // Cập nhật danh sách sản phẩm cho tab hiện tại
    setProductsByTab({
      ...productsByTab,
      [currentTab.id]: updatedProductsForCurrentTab,
    });

    // Lưu danh sách sản phẩm trong giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container">
      <div className="left">
        <div className="top-left">
          <h2>Content of Tab Normal {currentTab}</h2>
          <ListCartProduct products={cart} activeTab={currentTab} />
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
          <PrimaryButton>Thanh Toán</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default NormalSell;
