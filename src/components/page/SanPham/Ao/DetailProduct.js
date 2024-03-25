import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, Modal, Table, Tag } from "antd";
import { updateDetailProduct } from "../../../../config/ProductApi";
import { useDispatch } from "react-redux";

const ModalDetailProduct = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [payload, setPayload] = useState({
    id: "",
    price: "",
    quantity: "",
    status: "",
  });

  const handleEditQuantity = (id, updatedQuantity) => {
    const updatedData = product.map((p) =>
      p.id === id ? { ...p, quantity: updatedQuantity.quantity } : p
    );
    
    const selectedProduct = updatedData.filter((p) => p.id === id);
    
    console.log("Selected product", selectedProduct);
    setPayload(selectedProduct.quantity);
  };
  
  const handleEditPrice = (id, updatedPrice) => {
    const updatedData = product.map((p) =>
      p.id === id ? { price: updatedPrice.price } : p
    );
    const selectedProduct = updatedData.filter((p) => p.id === id);
    setPayload(selectedProduct.price);
  };


  const handleUpdate = async () => {
    console.log(payload);
    await dispatch(updateDetailProduct(payload));
    onClose();
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
      render: (color) => <Tag color={color.code}>{color.name}</Tag>,
    },
    {
      title: "Kích Cỡ",
      dataIndex: "size",
      key: "size",
      render: (size) => size.name,
    },
    {
      title: "Hãng",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => brand.name,
    },
    {
      title: "Cổ áo",
      dataIndex: "collar",
      key: "collar",
      render: (collar) => collar.name,
    },
    {
      title: "Loại",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name,
    },
    {
      title: "Chất Liệu",
      dataIndex: "material",
      key: "material",
      render: (material) => material.name,
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          value={record.quantity}
          onChange={(value) =>
            handleEditQuantity(record.id, value)
          }
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <InputNumber
          value={record.price}
          onChange={(value) =>
            handleEditPrice(record.id, value)
          }
        />
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag color={record.status === 1 ? "green" : "red"}>
          {record.status === 1 ? "Active" : "Inactive"}
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
    price: product.price,
    status: product.status,
  }));

  return (
    <Modal
      title="Chi Tiết Sản Phẩm"
      open={open} 
      onCancel={onClose}
      footer={[
        <Button
          key="back"
          onClick={() => {
            onClose();
          }}
        >
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
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
