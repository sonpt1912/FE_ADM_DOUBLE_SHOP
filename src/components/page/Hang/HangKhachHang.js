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
import {
  fetchRanks,
  selectRanks,
  selectStatus,
  selectCurrentPage,
  selectTotalPages,
} from "../../../store/slice/RankReducer";

const { RangePicker } = DatePicker;

const HangKhachHang = () => {
  const dispatch = useDispatch();
  const ranks = useSelector(selectRanks);
  const status = useSelector(selectStatus);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRanks(currentPage));
    }
  }, [dispatch, status, currentPage]);

  const [disabled, setDisabled] = useState(false);

  const handleSliderChange = (value) => {
    console.log("Slider value:", value);
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
                <Input placeholder="Enter name" style={{ width: "300px" }} />
              </Form.Item>
              <Form.Item label="Trạng Thái">
                <Select style={{ width: "300px" }}>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div style={{ marginRight: "150px" }}>
              <Form.Item label="Ngày Sinh">
                <RangePicker style={{ width: "280px" }} />
              </Form.Item>
              <Form.Item label="Khoảng tuổi">
                <Slider
                  range
                  defaultValue={[20, 50]}
                  disabled={disabled}
                  onChange={handleSliderChange}
                  style={{ width: "280px" }}
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item wrapperCol={{ offset: 10 }}>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Từ",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "Đến",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Phần Trăm",
      dataIndex: "percent",
      key: "percent",
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
      <span style={{ marginRight: 8 }}>Danh Sách Hạng Khách Hàng</span>
      <Button type="primary" shape="round">
        Thêm Khách Hàng
      </Button>
    </div>
  );

  const handleTableChange = (pagination, filters, sorter) => {
    dispatch(fetchRanks(pagination));
  };

  return (
    <>
      <Divider orientation="left">HẠNG KHÁCH HÀNG</Divider>
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
        dataSource={ranks}
        bordered
        pagination={{
          current: currentPage,
          total: totalPages,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: 5 ,
          showTotal: (total) => `Total ${total} items`,
        }}
        loading={status === "loading"}
        title={getTitle}
        onChange={handleTableChange}
      />
    </>
  );
};

export default HangKhachHang;
