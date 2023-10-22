import React from "react";
import "../../../../styles/BanHangCss/ProductComponent.css";

const ProductComponent = ({ product, onAddToCart }) => {
  const { name, code, size, color, price, quantity, image } = product;

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="product">
      <img src={image} alt={name} />
      <div className="product-details">
        <h2>{name}</h2>
        <p>Price: ${price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductComponent;
