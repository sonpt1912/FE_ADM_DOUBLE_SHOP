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
  Slider,
  Divider,
  Space,
  Pagination,
} from "antd";
import { SearchOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { fetchSizes } from "../../../../store/slice/KichCoReducer";

const { RangePicker } = DatePicker;

const KichCo = () => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => state.size.sizes);
  const pageSize = useSelector((state) => state.size.pageSize);
  const pagination = useSelector((state) => state.size.pagination);
  console.log("Pagination", pagination);
  const loading = useSelector((state) => state.size.status === "loading");

  const [searchParams, setSearchParams] = useState({
    name: "",
    status: "",
  });
  useEffect(() => {
    dispatch(
      fetchSizes({
        page: 0,
        pageSize: 5,
        name: searchParams.name,
        status: searchParams.status,
      })
    );
  }, [dispatch]);

  const onClickSearch = () => {
    dispatch(
      fetchSizes({
        page: 0,
        pageSize: 5,
        name: searchParams.name,
        status: searchParams.status,
      })
    );

    setSearchParams({
      name: "",
      status: "",
    });
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
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{
            maxWidth: 1100,
            marginLeft: "140px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <div>
              <Form.Item label="Name">
                <Input
                  placeholder="Enter name"
                  style={{ width: "300px" }}
                  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  }
                />
              </Form.Item>
            </div>
            <div style={{ marginRight: "150px" }}>
              <Form.Item label="Trạng Thái">
                <Select
                  style={{ width: "300px" }}
                  value={searchParams.status}
                  onChange={(value) =>
                    setSearchParams({ ...searchParams, status: value })
                  }
                >
                  <Select.Option value="0">0</Select.Option>
                  <Select.Option value="1">1</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
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
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ border: "none" }} icon={<EyeOutlined />} />
          <Button style={{ border: "none" }} icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];
  const getTitle = () => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ marginRight: 8 }}>Danh Sách Khách Hàng</span>
      <Button type="primary" shape="round">
        Thêm Khách Hàng
      </Button>
    </div>
  );

  const handleTableChange = (pagination) => {
    dispatch(
      fetchSizes({
        page: pagination.current - 1,
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
          bordered
          pagination={{
            pageSize: pagination.pageSize,
            total: pagination.totalItems,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (totalPages) => `Total ${totalPages} items`,
          }}
          loading={loading}
          title={getTitle}
          onChange={handleTableChange}
        />
      </>
    </div>
  );
};

export default KichCo;
