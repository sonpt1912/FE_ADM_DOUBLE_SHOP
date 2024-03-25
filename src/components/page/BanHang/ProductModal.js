import React, { useState } from "react";
import { Modal, Button, Tag, Table, Checkbox  } from "antd";

const ProductModal = ({ product, visible, onCancel, onAddToCart }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

 
  const handleSelectChange = (key, checked) => {
    const updatedProducts = [...selectedProducts];
    console.log("setSelectedProducts",updatedProducts);
    const existingIndex = updatedProducts.findIndex(
      (product) => product.key === key
    );

    if (existingIndex !== -1 && !checked) {
      updatedProducts.splice(existingIndex, 1);
    } else if (existingIndex === -1 && checked) {
      updatedProducts.push(data.find((product) => product.key === key));
    }

    setSelectedProducts(updatedProducts);
  };

  const handleAddToCart = () => {
    console.log("Add to cart", selectedProducts);

    onAddToCart(selectedProducts);
    onCancel();
  };

  const columns = [
    {
      title: " ",
      dataIndex: "checkbox",
      key: "checkbox",
      width: 50,
      render: (text, record) => (
        <Checkbox
        // checked={record.selected}
        onChange={(e) => handleSelectChange(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (color) => <Tag color={color.code}>{color.name}</Tag>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => size.name,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => brand.name,
    },
    {
      title: "Collar",
      dataIndex: "collar",
      key: "collar",
      render: (collar) => collar.name,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name,
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
      render: (material) => material.name,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const data = product?.map((product) => ({
    key: product.id,
    id: product.id,
    color: product.color,
    size: product.size,
    brand: product.brand,
    collar: product.collar,
    category: product.category,
    material: product.material,
    quantity: product.quantity,
    status: product.status,
    product: product.product,
    price : product.price
  }));
  console.log("data", data);

  return (
    <Modal
      title="Product Detail"
      visible={visible}
      onCancel={onCancel}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </Button>,
      ]}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 300 }}
      />
    </Modal>
  );
};

export default ProductModal;
