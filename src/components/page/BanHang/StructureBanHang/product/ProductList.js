import React from "react";
import ProductComponent from "./ProductComponent";
import "../../../../../styles/BanHangCss/ProductList.css";

const ProductList = ({ products, onAddToCart, activeTab }) => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductComponent
          key={index}
          product={product}
          onAddToCart={onAddToCart}
          activeTab={activeTab}
        />
      ))}
    </div>
  );
};

export default ProductList;
