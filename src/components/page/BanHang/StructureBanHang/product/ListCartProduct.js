import React from "react";
import CartProductBanHang from "./CartProductBanHang";
import "../../../../../styles/BanHangCss/ListCartProduct.css";

const ListCartProduct = ({ products, activeTab }) => {
  // Lấy giỏ hàng cho tab hiện tại dựa trên activeTab
  const cartForActiveTab = products.filter(
    (product) => product.tab === activeTab.id
  );

  if (cartForActiveTab.length === 0) {
    return <div>Không có sản phẩm trong giỏ hàng của tab này.</div>;
  }

  return (
    <div className="product-list-cart">
      {cartForActiveTab.map((product, index) => (
        <div key={index}>
          <CartProductBanHang product={product} />
        </div>
      ))}
    </div>
  );
};

export default ListCartProduct;
