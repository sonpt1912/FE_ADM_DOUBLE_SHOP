import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Select, Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollars } from "../../../../config/api1";
import { fetchSizes } from "../../../../config/SizeApi";
import { fetchMaterials } from "../../../../store/slice/ChatLieuReducer";
import { fetchBrand } from "../../../../config/BrandApi";
import { fetchCategory } from "../../../../config/CategoryApi";
import { fetchColors } from "../../../../config/MauApi";

const ModalAddAo = ({ open, closeModal }) => {
  const sizes = useSelector((state) => state.size.sizes);
  const collars = useSelector((state) => state.collar.collars);
  const materials = useSelector((state) => state.material.materials);
  const brand = useSelector((state) => state.brand.brand);
  const category = useSelector((state) => state.category.category);
  const colors = useSelector((state) => state.color.colors);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]); // State lưu trữ danh sách màu đã chọn
  const [selectedItems, setSelectedItems] = useState([]); // State lưu trữ danh sách các mục đã chọn
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCollars({}));
    dispatch(fetchMaterials({}));
    dispatch(fetchBrand({}));
    dispatch(fetchCategory({}));
    dispatch(fetchSizes({}));
    dispatch(fetchColors({}));
  }, [dispatch]);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      closeModal();
      form.resetFields();
    } catch (error) {
      message.error("Failed to add size");
    } finally {
      closeModal();
      form.resetFields();
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  const handleSizeSelect = (sizeId) => {
    setSelectedSize(sizeId);
  };

  const handleColorSelect = (color) => {
    setSelectedColors([...selectedColors, color]);
  };

  const handleAddItem = () => {
    // Tạo một mục mới dựa trên thông tin đã chọn và thêm vào danh sách các mục đã chọn
    const newItem = {
      size: selectedSize,
      colors: selectedColors,
    };
    setSelectedItems([...selectedItems, newItem]);

    // Reset thông tin đã chọn sau khi thêm vào danh sách
    setSelectedSize(null);
    setSelectedColors([]);
  };

  const columns = [
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render: (colors) => (
        <div>
          {colors.map((color) => (
            <div
              key={color.id}
              style={{
                backgroundColor: color.code,
                width: 20,
                height: 20,
                marginRight: 8,
                display: "inline-block",
              }}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <Modal
      title="Thêm Sản Phẩm"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="newProductForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label=" Cổ áo"
          rules={[{ required: true, message: "Please input the collar!" }]}
        >
          <Select
            showSearch
            placeholder="Select a collar"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={collars.map((product) => ({
              value: product.id,
              label: product.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Chất Liệu"
          rules={[{ required: true, message: "Please input the collar!" }]}
        >
          <Select
            showSearch
            placeholder="Select a collar"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={materials.map((product) => ({
              value: product.id,
              label: product.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Hãng"
          rules={[{ required: true, message: "Please input the product ID!" }]}
        >
          <Select
            showSearch
            placeholder="Select size"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={brand.map((product) => ({
              value: product.id,
              label: product.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Loại"
          rules={[{ required: true, message: "Please input the product ID!" }]}
        >
          <Select
            showSearch
            placeholder="Select size"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={category.map((product) => ({
              value: product.id,
              label: product.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Kích Cỡ"
          rules={[{ required: true, message: "Please select size!" }]}
        >
          {sizes.map((size) => (
            <Button
              key={size.id}
              onClick={() => handleSizeSelect(size.id)}
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              {size.name}
            </Button>
          ))}
        </Form.Item>
        {selectedSize && (
          <Form.Item
            label="Màu"
            rules={[{ required: true, message: "Please select color!" }]}
          >
            {colors.map((color) => (
              <Button
                key={color.id}
                onClick={() => handleColorSelect(color)}
                style={{
                  backgroundColor: color.code,
                  marginRight: 8,
                  marginBottom: 8,
                }}
              ></Button>
            ))}
          </Form.Item>
        )}
        {selectedColors.length > 0 && (
          <Button onClick={handleAddItem} style={{ marginBottom: 16 }}>
            Add Item
          </Button>
        )}
        <Table
          dataSource={selectedItems}
          columns={columns}
          pagination={false}
        />
      </Form>
    </Modal>
  );
};

export default ModalAddAo;
