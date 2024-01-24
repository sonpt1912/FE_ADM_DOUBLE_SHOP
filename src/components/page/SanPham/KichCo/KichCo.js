import { CaretRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import qs from "qs";
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
import { fetchSizes, updateSize } from "../../../../config/api";
import ModalAddSize from "./modalAddSize";
import ModalUpdateSize from "./modalUpdateSize";

const { Option } = Select;

const { RangePicker } = DatePicker;

const KichCo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sizes = useSelector((state) => state.size.sizes);
  const pagination = useSelector((state) => state.size.pagination);
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const loading = useSelector((state) => state.size.status === "loading");

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
    await dispatch(updateSize({ ...payloadStatus, ...updateStatus }));
    message.success("Size updated successfully");

    dispatch(
      fetchSizes({
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
            fetchSizes({
              page: current - 1,
              pageSize: pageSize,
              name: searchParams.name,
              status: searchParams.status,
            })
          );

          if (response && response.error) {
            if (
              response.error.message ===
              "Access Denied !! Full authentication is required to access this resource"
            ) {
              let count = 5;

              const countdownMessage = () => {
                if (count === 0) {
                  navigate("/login");
                  return;
                }

                const errorMessage =
                  count === 5
                    ? "Access Denied !! Full authentication is required to access this resource."
                    : `Redirecting to login page in ${count} seconds...`;
                message.loading({
                  content: errorMessage,
                  duration: 1,
                  onClose: () => {
                    count--;
                    countdownMessage();
                  },
                });
              };

              countdownMessage();
            } else {
              message.error("Error fetching data. Please try again later.");
              let count = 5;

              const countdownMessage = () => {
                if (count === 0) {
                  navigate("/login");
                  return;
                }
                const errorMessage =
                  count === 5
                    ? "Error fetching data. Please try again later."
                    : `Redirecting to login page in ${count} seconds...`;

                message.loading({
                  content: errorMessage,
                  duration: 1,
                  onClose: () => {
                    count--;
                    countdownMessage();
                  },
                });
              };

              countdownMessage();
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [modalVisible, modalVisibleUpdate, current, pageSize, searchParams]);

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
      fetchSizes({
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
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
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
            title="Are you sure you want to delete this size?"
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
      <span style={{ marginRight: 8 }}>Danh Sách Size</span>
      <Button type="primary" shape="round" onClick={openModal}>
        Thêm Kích Cỡ
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
        <Divider orientation="left">KÍCH CỠ</Divider>
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
        <ModalAddSize open={modalVisible} closeModal={closeModal} />
        <ModalUpdateSize
          open={modalVisibleUpdate}
          loading={loading}
          closeModal={closeModalUpdate}
          payload={payload}
        />
      </>
    </div>
  );
};

export default KichCo;
