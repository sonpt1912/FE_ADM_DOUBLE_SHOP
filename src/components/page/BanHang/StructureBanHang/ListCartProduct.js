import React from "react";
import CartProductBanHang from "./CartProductBanHang";
import "../../../../styles/BanHangCss/ListCartProduct.css";

const ListCartProduct = ({ products, activeTab }) => {
  if (!products) {
    return <div>Không có sản phẩm trong giỏ hàng.</div>;
  }

  // Lọc sản phẩm dựa trên id của tab
  const productsForActiveTab = products.filter(
    (product) => product.tab === activeTab.id
  );

  return (
    <div className="product-list-cart">
      {productsForActiveTab.map((product, index) => (
        <div key={index}>
          <CartProductBanHang product={product} />
        </div>
      ))}
    </div>
  );
};

export default ListCartProduct;
