import React from "react";
import { Modal, Table, Tag } from "antd";

const ModalDetailProduct = ({ open, onClose, product }) => {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (color) => (
        <Tag color={color.code}>{color.name}</Tag>
      ),
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
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 1 ? "green" : "red"}>
          {status === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
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
  }));

  return (
    <Modal
      title="Product Detail"
      open={open} 
      onCancel={onClose}
      footer={null}
      width={1000}
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

export default ModalDetailProduct;
