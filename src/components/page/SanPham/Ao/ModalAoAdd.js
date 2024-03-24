import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  message,
  Select,
  Button,
  Table,
  Tag,
  Row,
  Col,
  Checkbox,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../../config/ProductApi";
import { fetchCollars } from "../../../../config/CollarApi";
import { fetchSizes } from "../../../../config/SizeApi";
import { fetchMaterials } from "../../../../store/slice/ChatLieuReducer";
import { fetchBrand } from "../../../../config/BrandApi";
import { fetchCategory } from "../../../../config/CategoryApi";
import { fetchColors } from "../../../../config/ColorApi";
import "./ModalAddAo.css";
import ModalAddCollar from "../CoAo/ModalCollarAdd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ModalChatLieu from "../ChatLieu/ModalChatLieuAdd";
import ModalAddBrand from "../brand/AddBrand";
import ModalAddCategory from "../category/AddCategory";
import ModalAddSize from "../KichCo/modalAddSize";
import ModalColor from "../Mau/ModalColorAdd";

const ModalAddAo = ({ open, closeModal }) => {
  const sizes = useSelector((state) => state.size.sizes);
  const collars = useSelector((state) => state.collar.collars);
  const materials = useSelector((state) => state.material.materials);
  const brand = useSelector((state) => state.brand.brand);
  const category = useSelector((state) => state.category.category);
  const colors = useSelector((state) => state.color.colors);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [selectedCollar, setSelectedCollar] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [modalCollarVisible, setModalCollarVisible] = useState(false);
  const [modalVisibleMaterial, setModalVisibleMaterial] = useState(false);
  const [modalVisibleBrand, setModalVisibleBrand] = useState(false);
  const [modalVisibleCategory, setModalVisibleCategory] = useState(false);
  const [modalVisibleSize, setModalVisibleSize] = useState(false);
  const [modalVisibleColor, setModalVisibleColor] = useState(false);

  // Modal Collar Visible
  const openModalCollar = () => {
    setModalCollarVisible(true);
  };
  const closeModalCollar = () => {
    setModalCollarVisible(false);
  };

  // Modal Material
  const openModalMaterial = () => {
    setModalVisibleMaterial(true);
  };
  const closeModalMaterial = () => {
    setModalVisibleMaterial(false);
  };

  // Modal Brand
  const openModalBrand = () => {
    setModalVisibleBrand(true);
  };
  const closeModalBrand = () => {
    setModalVisibleBrand(false);
  };

  // Modal Category
  const openModalCategory = () => {
    setModalVisibleCategory(true);
  };
  const closeModalCategory = () => {
    setModalVisibleCategory(false);
  };

  // Modal Size
  const openModalSize = () => {
    setModalVisibleSize(true);
  };
  const closeModalSize = () => {
    setModalVisibleSize(false);
  };

  // Modal Color
  const openModalColor = () => {
    setModalVisibleColor(true);
  };
  const closeModalColor = () => {
    setModalVisibleColor(false);
  };

  const onChangeCollar = (value) => {
    setSelectedCollar(value);
  };

  const onChangeBrand = (value) => {
    setSelectedBrand(value);
  };

  const onChangeCategory = (value) => {
    setSelectedCategory(value);
  };

  const onChangeMaterial = (value) => {
    setSelectedMaterial(value);
  };

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
  const handleImageChange = (fileList) => {
    console.log("image changed 12345",fileList);
    // setImages(fileList)
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const listSizeData = selectedItems.map((item) => ({
        id: item.size,
        listColor: item.colors.map((color) => ({
          id: color.id,
          quantity: color.quantity,
        })),
      }));
console.log("Image changed", images);
      const productData = {
        name: form.getFieldValue("name"),
        idCollar: selectedCollar,
        idBrand: selectedBrand,
        idCategory: selectedCategory,
        code: 1,
        idMaterial: selectedMaterial,
        listSize: listSizeData,
        listImages: images,
        price: selectedItems.map((item) => item.price),
      };
      console.log("Product data: " , productData);

      // await dispatch(createProduct(productData));

      message.success("Product created successfully!");
      // closeModal();
      form.resetFields();
      setSelectedSize(null);
      setSelectedColors([]);
      setSelectedItems([]);
      setPrice(0);
      setImages([]);
    } catch (error) {
      message.error("Failed to create product");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    closeModal();
    form.resetFields();
    setSelectedSize(null);
    setSelectedColors([]);
    setSelectedItems([]);
    setPrice(0);
    setImages([]);
  };

  const handleSizeSelect = (sizeId) => {
    setSelectedSize(sizeId);
  };

  const handleColorSelect = (color, checked) => {
    console.log("Color", checked);
    if (checked) {
      // Nếu checkbox được chọn
      const existingIndex = selectedItems.findIndex(
        (item) =>
          item.size === selectedSize &&
          item.colors.some((c) => c.id === color.id)
      );

      if (existingIndex === -1) {
        // Nếu màu chưa tồn tại, thêm mới vào bảng với số lượng là 1
        const newItem = {
          size: selectedSize,
          colors: [{ id: color.id, code: color.code, quantity: 1 }],
          price: price,
        };
        setSelectedItems([...selectedItems, newItem]);
      }
    } else {
      // Nếu checkbox bị bỏ chọn
      const updatedItems = selectedItems.map((item) => {
        if (item.size === selectedSize) {
          const updatedColors = item.colors.filter((c) => c.id !== color.id);
          return { ...item, colors: updatedColors };
        }
        return item;
      });

      // Loại bỏ các item không có màu
      const filteredItems = updatedItems.filter(
        (item) => item.colors.length > 0
      );
      setSelectedItems(filteredItems);
    }
  };

  const handleQuantityChange = (record, color, value) => {
    const updatedItems = selectedItems.map((item) => {
      if (item === record) {
        const updatedColors = item.colors.map((c) => {
          if (c === color) {
            return { ...c, quantity: parseInt(value) };
          }
          return c;
        });
        return { ...item, colors: updatedColors };
      }
      return item;
    });

    setSelectedItems(updatedItems);
  };

  const handlePriceChange = (record, value) => {
    const updatedItems = selectedItems.map((item) => {
      if (item === record) {
        return { ...item, price: parseFloat(value) };
      }
      return item;
    });

    setSelectedItems(updatedItems);
  };

  const handleAddItem = () => {
    const newItem = {
      size: selectedSize,
      colors: selectedColors
        .map((color) => ({
          ...color,
          quantity: parseInt(color.quantity),
        }))
        .filter((color) => color.quantity > 0),
      price: price,
    };

    const existingItemIndex = selectedItems.findIndex(
      (item) => item.size === selectedSize
    );

    if (existingItemIndex !== -1) {
      const existingItem = selectedItems[existingItemIndex];
      const updatedColors = [...existingItem.colors];

      newItem.colors.forEach((newColor) => {
        const existingColorIndex = updatedColors.findIndex(
          (color) => color.id === newColor.id
        );

        if (existingColorIndex !== -1) {
          updatedColors[existingColorIndex].quantity += newColor.quantity;
        } else {
          updatedColors.push(newColor);
        }
      });

      const updatedItem = {
        ...existingItem,
        colors: updatedColors,
      };

      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex] = updatedItem;

      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, newItem]);
    }

    setSelectedSize(null);
    setSelectedColors(
      selectedColors.map((color) => ({ ...color, quantity: 0 }))
    );
    setPrice(0);
  };

  const columns = [
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (sizeId) => {
        const size = sizes.find((size) => size.id === sizeId);
        return size ? size.name : "";
      },
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render: (colors, record) => (
        <div>
          {colors.map((color, index) => (
            <div key={index} style={{ marginBottom: 8 }}>
              <Tag color={color.code}>{color.code}</Tag>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "colors",
      key: "quantity",
      render: (colors, record) => (
        <div>
          {colors.map((color, index) => (
            <div key={index}>
              <Input
                type="number"
                value={color.quantity}
                onChange={(e) =>
                  handleQuantityChange(record, color, e.target.value)
                }
                style={{ width: 80, marginLeft: 8 }}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <Input
          type="number"
          value={text}
          onChange={(e) => handlePriceChange(record, e.target.value)}
        />
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Thêm Sản Phẩm"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
      >
        <Form
          form={form}
          name="newProductForm"
          labelCol={{ span: 5 }}
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
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col span={9}>
              <Form.Item
                label="Cổ áo"
                name="collar"
                rules={[{ required: true, message: "Please select collar!" }]}
              >
                <Select
                  placeholder="Select a collar"
                  onChange={onChangeCollar}
                  options={collars.map((product) => ({
                    value: product.id,
                    label: product.name,
                  }))}
                />
                <Button onClick={openModalCollar}>
                  <PlusOutlined />
                </Button>
              </Form.Item>
              <Form.Item
                label="Chất Liệu"
                name="material"
                rules={[{ required: true, message: "Please select material!" }]}
              >
                <Select
                  placeholder="Select a material"
                  onChange={onChangeMaterial}
                  options={materials.map((product) => ({
                    value: product.id,
                    label: product.name,
                  }))}
                />
                <Button onClick={openModalMaterial}>
                  <PlusOutlined />
                </Button>
              </Form.Item>
            </Col>
            <Col span={9} s>
              <Form.Item
                label="Hãng"
                name="brand"
                rules={[{ required: true, message: "Please select brand!" }]}
              >
                <Select
                  placeholder="Select a brand"
                  onChange={onChangeBrand}
                  options={brand.map((product) => ({
                    value: product.id,
                    label: product.name,
                  }))}
                />
                <Button onClick={openModalBrand}>
                  <PlusOutlined />
                </Button>
              </Form.Item>
              <Form.Item
                label="Loại"
                name="category"
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <Select
                  placeholder="Select a category"
                  onChange={onChangeCategory}
                  options={category.map((product) => ({
                    value: product.id,
                    label: product.name,
                  }))}
                />
                <Button onClick={openModalCategory}>
                  <PlusOutlined />
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Kích Cỡ"
            rules={[{ required: true, message: "Please select size!" }]}
          >
            {sizes.map((size) => (
              <Button
                key={size.id}
                onClick={() => handleSizeSelect(size.id)}
                style={{
                  marginRight: 8,
                  marginBottom: 8,
                  background: selectedSize === size.id ? "#1890ff" : "",
                  color: selectedSize === size.id ? "white" : "",
                }}
              >
                {size.name}
              </Button>
            ))}
            <Button onClick={openModalSize}>
              <PlusOutlined />
            </Button>
          </Form.Item>
          {selectedSize && (
            <Form.Item
              label="Màu"
              rules={[{ required: true, message: "Please select color!" }]}
            >
              {colors.map((color) => {
                return (
                  <Checkbox
                    key={color.id}
                    onChange={(e) => handleColorSelect(color, e.target.checked)}
                    style={{
                      backgroundColor: color.code,
                      marginRight: 18,
                      marginBottom: 8,
                      padding: "8px 12px",
                      borderRadius: "2px",
                    }}
                    className="color-checkbox"
                  />
                );
              })}
              <Button onClick={openModalColor}>
                <PlusOutlined />
              </Button>
            </Form.Item>
          )}
          <Form.Item label="Ảnh">
            <Form.Item
              name="images"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              noStyle
              rules={[{ required: true, message: "Please select images!" }]}
            >
              <Upload
                name="logo"
                listType="picture"
                fileList={images}
                multiple
                beforeUpload={() => false}
                onChange={handleImageChange} 
              >
                <Button  icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>
          </Form.Item>

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
      <ModalAddCollar open={modalCollarVisible} closeModal={closeModalCollar} />
      <ModalChatLieu
        open={modalVisibleMaterial}
        closeModal={closeModalMaterial}
      />
      <ModalAddBrand open={modalVisibleBrand} closeModal={closeModalBrand} />
      <ModalAddCategory
        open={modalVisibleCategory}
        closeModal={closeModalCategory}
      />
      <ModalAddSize open={modalVisibleSize} closeModal={closeModalSize} />
      <ModalColor isOpen={modalVisibleColor} onCancel1={closeModalColor} />
    </>
  );
};

export default ModalAddAo;
