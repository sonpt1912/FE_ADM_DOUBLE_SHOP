import React from "react";
import "../../../../../styles/BanHangCss/CartProductBanHang.css";

const CartProductBanHang = ({ product }) => {
  const { name, code, size, color, price, quantity, image } = product;

  return (
    <div className="product-cart">
      <div className="product-first-cart">
        <p className="code-product">Code: {code}</p>
        <img src={image} alt={name} />
      </div>
      <div className="product-details-cart">
        <h2>{name}</h2>
        <div className="product-properties">
          <p>Quantity: {quantity}</p>
          <p>Size: {size}</p>
          <p>Color: {color}</p>
          <p>Price: ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartProductBanHang;
