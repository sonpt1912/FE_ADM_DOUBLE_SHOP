import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  Button,
  Divider,
  Tabs,
  Input,
  Row,
  Col,
  Card,
  Table,
  Popconfirm,
  message,
  Image,
  InputNumber,
  Switch,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailProduct, fetchProduct } from "../../../config/ProductApi";
import "./BanHang.css";
import ProductModal from "./ProductModal";
import Payment from "./Payment";
import { createBill } from "../../../config/PaymentApi";

const { TabPane } = Tabs;

const OperationsSlot = {
  left: (
    <div
      className="tabs-extra-demo-button"
      style={{ margin: "0px 10px 10px 0px" }}
    >
      <Input
        size="middle"
        placeholder="Tìm kiếm hàng hóa"
        prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        style={{ width: "300px" }}
      />
    </div>
  ),
};

const App = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [images, setImages] = useState("");
  const [position, setPosition] = useState(["left"]);
  const [activeKey, setActiveKey] = useState("1");
  const [panes, setPanes] = useState([]);
  const newTabIndex = useRef(2);
  const products = useSelector((state) => state.products.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisibleDetail, setModalVisibleDetail] = useState(false);
  const [visiblePaymentModal, setVisiblePaymentModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [customerPaid, setCustomerPaid] = useState(0);
  const [changeAmount, setChangeAmount] = useState(0);

  const handleOpenPaymentModal = () => {
    setVisiblePaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setVisiblePaymentModal(false);
  };

  const handleOpenModal = async (productId) => {
    try {
      const response = await dispatch(fetchDetailProduct(productId));
      if (response.payload) {
        setSelectedProduct(response.payload);
        setModalVisibleDetail(true);
      } else {
        message.error("Failed to fetch product detail.");
      }
    } catch (error) {
      message.error("An error occurred while fetching product detail.");
    }
  };

  const cardStyle = {
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s",
    ":hover": {
      transform: "scale(0.2)",
    },
  };

  const allProductImages = products.map((product) => {
    const firstImage = product.listImages.resources[0];
    if (!firstImage) return null;

    return (
      <div key={product.id} style={{ marginBottom: 10 }}>
        <Image
          preview={false}
          width={100}
          src={firstImage.url}
          alt={`Image ${firstImage.index + 1}`}
        />
      </div>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(
          fetchProduct({
            page: current - 1,
            pageSize: pageSize,
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalVisibleDetail(false);
  };

  const handleAddToCartFromModal = (product) => {
    addToCart(activeKey, product);
  };

  const slot = useMemo(() => {
    if (position.length === 0) return null;
    return position.reduce(
      (acc, direction) => ({
        ...acc,
        [direction]: OperationsSlot[direction],
      }),
      {}
    );
  }, [position]);

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      addNewTab();
    } else if (action === "remove") {
      removeTab(targetKey);
    }
  };

  const addNewTab = () => {
    const newKey = `${newTabIndex.current}`;
    const newPanes = [...panes];
    newPanes.push({
      title: `Giỏ hàng ${newKey}`,
      content: [],
    });
    setPanes(newPanes);
    setActiveKey(newKey);
    newTabIndex.current += 1;
  };

  const removeTab = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.title === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.title !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].title;
      } else {
        newActiveKey = newPanes[0].title;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const addToCart = (key, products) => {
    const newPanes = [...panes];
    const updatedPane = newPanes.find((pane) => pane.title === key);

    products.forEach((newProduct) => {
      const existingProductIndex = updatedPane.content.findIndex(
        (item) => item.id === newProduct.id
      );

      if (existingProductIndex !== -1) {
        updatedPane.content[existingProductIndex].quantity += quantity;
      } else {
        updatedPane.content.push({
          id: newProduct.id,
          name: newProduct.product.name,
          price: newProduct.price,
          quantity: quantity,
          size: newProduct.size.name,
          color: newProduct.color.name,
        });
      }
    });

    setPanes(newPanes);
  };

  const removeFromCart = (productId) => {
    const newPanes = panes.map((pane) => ({
      ...pane,
      content: pane.content.filter((product) => product.id !== productId),
    }));
    setPanes(newPanes);
  };

  const handleQuantityChange = (index, value) => {
    const newPanes = [...panes];
    newPanes.forEach((pane) => {
      pane.content[index].quantity = value;
    });
    setPanes(newPanes);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record, index) => (
        <InputNumber
          min={1}
          defaultValue={text}
          onChange={(value) => handleQuantityChange(index, value)}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (_, record, index) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa sản phẩm này?"
          onConfirm={() => removeFromCart(record.id)}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <Button type="danger" icon={<FontAwesomeIcon icon={faTrashAlt} />} />
        </Popconfirm>
      ),
    },
  ];

  const handlePayment = async () => {
    try {
      const cartItems = panes.find((pane) => pane.title === activeKey)?.content;
      if (!cartItems || cartItems.length === 0) {
        message.warning("Giỏ hàng của bạn đang trống.");
        return;
      }

      const listDetailProduct = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const payload = {
        idCustomer: "",
        idVoucher: "",
        totalAmount: total,
        note: "",
        listDetailProduct,
      };

      const response = await dispatch(createBill(payload));
      console.log("response: " + response.toString());

      if (response.payload) {
        const { customerPaid, changeAmount } = response.payload;
        message.success(
          `Thanh toán thành công. `
        );
        setPanes([]);
        setActiveKey("1");
      } else {
        message.error("Thanh toán thất bại.");
      }
    } catch (error) {
      console.error("Error creating bill:", error);
      message.error("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại sau.");
    }
  };

  const CartContent = ({ cartItems, cartIndex }) => (
    <Table
      columns={columns}
      dataSource={cartItems}
      pagination={false}
      summary={(items) => {
        let total = 0;
        items.forEach((item) => {
          total += parseFloat(item.price * item.quantity);
        });
        setTotal(total);
        return (
          <>
            <Table.Summary.Row style={{ textAlign: "right" }}>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>Tổng cộng:</Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                <strong>{total}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={5}></Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />
  );

  return (
    <>
      <Tabs
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        tabBarExtraContent={slot}
      >
        {panes.map((pane, index) => (
          <TabPane tab={pane.title} key={pane.title} closable={pane.closable}>
            <Row gutter={[16, 16]}>
              <Col span={14}>
                <Card title="Giỏ hàng" className="cart-container">
                  <CartContent cartItems={pane.content} cartIndex={index} />
                </Card>
              </Col>
              <Col span={10}>
                <Card
                  title="Danh sách sản phẩm"
                  className="product-list-container"
                >
                  <Row gutter={[16, 16]}>
                    {products.map((product) => (
                      <Col span={8} key={product.id}>
                        <Card
                          hoverable
                          onClick={() => handleOpenModal(product.id)}
                          style={cardStyle}
                          size="small"
                        >
                          <div className="product-card">
                            <div className="product-image">
                              {product.listImages.resources.length > 0 && (
                                <div
                                  key={product.id}
                                  style={{ marginBottom: 10 }}
                                >
                                  <Image
                                    preview={false}
                                    width={100}
                                    src={product.listImages.resources[0].url}
                                    alt={`Image 1`}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="product-title">{product.name}</div>
  
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
              <Col span={12}>
                <Card title="Thông tin khách hàng">
                  <Row gutter={[16, 16]}>
                    <Col span={16}>
                      <Input placeholder="Khách Lẻ" />
                    </Col>
                    <Col span={8}>
                      <Button type="primary">Chọn Khách Hàng</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Thông tin thanh toán">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div>Khách thanh toán:</div>
                      <div>Giao hàng:</div>
                      <div>Tiền hàng:</div>
                      <div>Tiền giảm giá voucher:</div>
                      <div>
                        <strong>Tổng tiền:</strong>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>{total} VND</div>
                      <div>
                        <Switch />
                      </div>
                      <div>{total} VND</div>
                      <div>0 VND</div>
                      <div>
                        <strong>{total} VND</strong>
                      </div>
                    </Col>
                    <Col span={24}>
                      <Button type="primary" onClick={handleOpenPaymentModal}>
                        Thanh Toán
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </TabPane>
        ))}
      </Tabs>
      <Payment
        visible={visiblePaymentModal}
        onCancel={handleClosePaymentModal}
        total={total}
        onPayment={handlePayment}
      />
      <ProductModal
        product={selectedProduct}
        visible={modalVisibleDetail}
        onCancel={handleCloseModal}
        onAddToCart={handleAddToCartFromModal}
      />
    </>
  );
};

export default App;
