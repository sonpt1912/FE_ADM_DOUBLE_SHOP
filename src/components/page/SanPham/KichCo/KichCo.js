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
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { fetchSizes } from "../../../../config/api";
import ModalAddSize from "./modalAddSize";
import ModalUpdateSize from "./modalUpdateSize";
const { Option } = Select;

const { RangePicker } = DatePicker;

const KichCo = () => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => state.size.sizes);
  const pageSize = useSelector((state) => state.size.pageSize);
  const pagination = useSelector((state) => state.size.pagination);
  console.log(pagination);
  const loading = useSelector((state) => state.size.status === "loading");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);


  const openModal = () => {
    setModalVisible(true);
  };
  const openModalUpdate = () => {
    setModalVisibleUpdate(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeModalUpdate = () => {
    setModalVisibleUpdate(false);
  };

  const [searchParams, setSearchParams] = useState({
    name: "",
    status: "",
  });

  useEffect(() => {
    if (!modalVisible) {
      dispatch(
        fetchSizes({
          page: pagination.page,
          pageSize: pagination.pageSize,
          name: searchParams.name,
          status: searchParams.status,
        })
      );
    }
  }, [modalVisible]);

  const onClickSearch = () => {
    dispatch(
      fetchSizes({
        page: pagination.page,
        pageSize: pagination.pageSize,
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
      width: 350,
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
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ border: "none" }} icon={<EyeOutlined />} />
          <Button style={{ border: "none" }} icon={<EditOutlined />} onClick={openModalUpdate} />
          <Button style={{ border: "none" }} icon={<DeleteOutlined />} />
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
    dispatch(
      fetchSizes({
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...searchParams,
      })
    );
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
            pageSize: pagination.pageSize,
            total: pagination.totalItems,
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
        <ModalAddSize open={modalVisible} closeModal={closeModal}                                                                        />
        <ModalUpdateSize open={modalVisibleUpdate} closeModal={closeModalUpdate}/>
      </>
    </div>
  );
};

export default KichCo;
