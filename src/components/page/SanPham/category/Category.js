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
  DatePicker,
  Divider,
  Space,
  Col,
  Row,
  message,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { fetchCategory, updateCategory } from "../../../../config/CategoryApi";
import ModalAddCategory from "./AddCategory";
import ModalUpdateCategory from "./UpdateCategory";

const { Option } = Select;

const { RangePicker } = DatePicker;

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sizes = useSelector((state) => state.category.category);
  const pagination = useSelector((state) => state.size.pagination);
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const loading = useSelector((state) => state.category.status === "loading");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);

  const [payload, setPayload] = useState({
    code: "",
    name: "",
    description: "",
  });

  const [updateStatus, setUpdateStatus] = useState({ status: 0 });

  const openModal = () => {
    setModalVisible(true);
  };
  const openModalUpdate = () => {
    setModalVisibleUpdate(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrent(1);
  };
  const closeModalUpdate = () => {
    setModalVisibleUpdate(false);
  };

  const [searchParams, setSearchParams] = useState({
    name: "",
    status: "",
  });
  const handleChangeStatus = async (record) => {
    const payloadStatus = {
      code: record.code,
      name: record.name,
      description: record.description,
    };
    const newStatus = record.status === 1 ? 0 : 1;
    setUpdateStatus({ status: newStatus });
    await dispatch(updateCategory({ ...payloadStatus, ...updateStatus }));
    message.success("Category updated successfully");

    dispatch(
      fetchCategory({
        page: pagination.current,
        pageSize: pageSize,
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!modalVisible && !modalVisibleUpdate) {
          const response = await dispatch(
            fetchCategory({
              page: current - 1,
              pageSize: pageSize,
              name: searchParams.name,
              status: searchParams.status,
            })
          );
          if (response && response.error) {
            if (
              response.error.message === "Request failed with status code 401"
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
  }, [modalVisible, modalVisibleUpdate, current, pageSize]);

  const onClickEdit = (record) => {
    setPayload({
      code: record.code,
      name: record.name,
      description: record.description,
      status: record.status,
    });
    openModalUpdate();
  };

  const onClickSearch = () => {
    dispatch(
      fetchCategory({
        page: pagination.current,
        pageSize: pageSize,
        name: searchParams.name,
        status: searchParams.status,
      })
    );
  };

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
                <Input
                  placeholder="Enter name"
                  style={{ width: "100%" }}
                  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Code">
                <Input
                  placeholder="Enter code"
                  style={{ width: "100%" }}
                  value={searchParams.code}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, code: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Trạng Thái">
                <Select
                  style={{ width: "100%" }}
                  value={searchParams.status}
                  onChange={(value) =>
                    setSearchParams({ ...searchParams, status: value })
                  }
                  allowClear
                >
                 <Option value="0">Ngừng hoạt động</Option>
                  <Option value="1">Hoạt động</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ offset: 10 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              onClick={onClickSearch}
            >
              Search
            </Button>
          </Form.Item>
        </Form>
      ),
      style: panelStyle,
    },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 75,
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => (text == "0" ? "Ngừng Hoạt Động" : " Hoạt Động"),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ border: "none" }} icon={<EyeOutlined />} />
          <Button
            style={{ border: "none" }}
            icon={<EditOutlined />}
            onClick={() => onClickEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleChangeStatus(record)}
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
      <span style={{ marginRight: 8 }}>Danh Sách Category</span>
      <Button type="primary" shape="round" onClick={openModal}>
        Thêm Loại Sp
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
        <Divider orientation="left">Loại Sản Phẩm</Divider>
        <Collapse
          defaultActiveKey={["1"]}
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
          dataSource={sizes}
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
        <ModalAddCategory open={modalVisible} closeModal={closeModal} />
        <ModalUpdateCategory
          open={modalVisibleUpdate}
          loading={loading}
          closeModal={closeModalUpdate}
          payload={payload}
        />
      </>
    </div>
  );
};

export default Category;
