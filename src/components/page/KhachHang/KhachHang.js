import { CaretRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { useSelector, useDispatch } from 'react-redux';
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
} from "antd";
import { SearchOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const KhachHang = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const fetchData = () => {
    setLoading(true);

    const queryParams = qs.stringify({
      pageNumber: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
    });

    fetch(`http://localhost:8072/customer/page?${queryParams}`)
      .then((res) => res.json())
      .then(({ content, totalElements, pageNumber }) => {
        setData(content);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: totalElements,
            current: pageNumber,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
  };

  const [disabled, setDisabled] = useState(false);

  const handleSliderChange = (value) => {
    console.log("Slider value:", value);
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => a.gender - b.gender,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            style={{ border: "none" }}
            icon={<EyeOutlined />}
          />
          <Button
            style={{ border: "none" }}
            icon={<EditOutlined />}
          />
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
  return (
    <>
      <Divider orientation="left">KHÁCH HÀNG</Divider>
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
        dataSource={data}
        bordered
        pagination={tableParams.pagination}
        loading={loading}
        title={getTitle}
        onChange={handleTableChange}
      />

    </>
  );
};

export default KhachHang;
