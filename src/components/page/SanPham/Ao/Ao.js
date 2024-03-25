import { CaretRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Collapse,
  theme,
  Form,
  Table,
  Input,
  Button,
  Select,
  Divider,
  Space,
  Col,
  Row,
  message,
  Popconfirm,
  Checkbox,
  Image,
  Popover,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  fetchDetailProduct,
  fetchProduct,
} from "../../../../config/ProductApi";
import ModalAo from "./ModalAoAdd";
import ModalDetailProduct from "./DetailProduct";

const { Option } = Select;

const Ao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const pagination = useSelector((state) => state.products.pagination);
  console.log("Product",pagination);
  const [pageSize, setPageSize] = useState(1);
  const [current, setCurrent] = useState(1);
  const loading = useSelector((state) => state.products.status === "loading");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDetail, setModalVisibleDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrent(1);
  };

  const openModalDetail = async (productId) => {
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

  const closeModalDetail = () => {
    setSelectedProduct(null);
    setModalVisibleDetail(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!modalVisible ) {
          const response = await dispatch(
            fetchProduct({
              page: current - 1,
              pageSize: pageSize,
            })
          );
          if (response && response.error) {
            if (
              response.error.message === "Request failed with status code 403"
            ) {
              navigate("/login");
              message.error(response.error.message);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [current, pageSize, dispatch, navigate, modalVisible]);

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
  };

  const getItems = () => [
    {
      key: "1",
      label: "Search",
      children: (
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 1500, margin: "auto", marginTop: "20px" }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Name">
                {/* <Input
                  placeholder="Enter name"
                  style={{ width: "100%" }}
                  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  }
                /> */}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Code">
                {/* <Input
                  placeholder="Enter code"
                  style={{ width: "100%" }}
                  value={searchParams.code}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, code: e.target.value })
                  }
                /> */}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Trạng Thái">
                {/* <Select
                  style={{ width: "100%" }}
                  value={searchParams.status}
                  onChange={(value) =>
                    setSearchParams({ ...searchParams, status: value })
                  }
                  allowClear
                >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select> */}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ offset: 10 }}>
            {/* <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              onClick={onClickSearch}
            >
              Search
            </Button> */}
          </Form.Item>
        </Form>
      ),
      style: panelStyle,
    },
  ];
  const columns = [
    {
      title: " ",
      dataIndex: "checkbox",
      key: "checkbox",
      width: 50,
      render: (text, record) => (
        <Checkbox
        // checked={record.selected}
        // onChange={(e) => handleChangeCheckbox(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 75,
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: "Hình ảnh",
      dataIndex: "listImages",
      key: "listImages",
      width: 150,
      render: (listImages) => (
        <Popover
          placement="right"
          title={null}
          content={
            <div>
              {listImages.resources.map((image, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  <Image
                    width={100}
                    src={image.url}
                    alt={`Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          }
          trigger="hover"
        >
          <Image
            width={"100%"}
            src={listImages.resources[0].url}
            alt={`Image 1`}
          />
        </Popover>
      ),
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 150,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => (text === 1 ? "Hoat Dong" : "Ngung Hoat dong"),
      width: 150,
    },
    {
      title: "Hành động",
      key: "actions",
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          {/* <Button style={{ border: "none" }} icon={<EyeOutlined />} /> */}
          <Button
            style={{ border: "none" }}
            icon={<EyeOutlined />}
            onClick={() => openModalDetail(record.id)}
          />
          <Popconfirm
            title="Are you sure you want to delete this size?"
            // onConfirm={() => handleChangeStatus(record)}
            okText="Yes"
            cancelText="No"
            loading={loading}
          >
            <Button
              style={{ border: "none" }}
              disabled={record.status === 0}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const getTitle = () => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ marginRight: 8 }}>Danh Sách Sản Phẩm</span>
      <Button type="primary" shape="round" onClick={openModal}>
        Thêm Sản Phẩm
      </Button>
    </div>
  );

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    setCurrent(current);
  };

  return (
    <div>
      <>
        <Divider orientation="left">Sản Phẩm</Divider>
        <Collapse
          defaultActiveKey={["0"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{
            background: token.colorBgContainer,
          }}
          items={getItems()}
        />
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={products}
          pagination={{
            pageSize: pageSize,
            total: pagination.totalItems,
            current: current,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (totalPages) => `Total ${totalPages} items`,
          }}
          scroll={{
            x: 1000,
            y: 300,
          }}
          loading={loading}
          title={getTitle}
          onChange={handleTableChange}
        />
        <ModalAo open={modalVisible} closeModal={closeModal} />
        <ModalDetailProduct
          open={modalVisibleDetail}
          onClose={closeModalDetail}
          product={selectedProduct}
        />
      </>
    </div>
  );
};

export default Ao;
