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
import { fetchEmployee } from "../../../config/NhanVienApi";
import ModalAddNhanVien from "./CreateNhanVien";
import ModalUpdateNhanVien from "./UpdateNhanVien";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const NhanVien = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector((state) => state.employee.employee);
  const pagination = useSelector((state) => state.size.pagination);
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const loading = useSelector((state) => state.size.status === "loading");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setCurrent(1);
  };

  const openModalUpdate = () => {
    setModalVisibleUpdate(true);
  };

  const closeModalUpdate = () => {
    setModalVisibleUpdate(false);
  };

  const [payload, setPayload] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
    status: "",
    city: "",
    district: "",
    provice: "",
    gender: "",
    birthDay: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!modalVisible && !modalVisibleUpdate) {
          const response = await dispatch(
            fetchEmployee({
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
  }, [modalVisible, modalVisibleUpdate, current, pageSize]);

  const [searchParams, setSearchParams] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });
  const onClickEdit = (record) => {
    setPayload({
      username: record.username,
      name: record.name,
      phone: record.phone,
      email: record.email,
      city: record.city,
      district: record.district,
      provice: record.provice,
      gender: record.gender,
      birthDay: record.birthDay ? moment(record.birthDay) : null,
    });
    openModalUpdate();
  };
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
  };
  const onClickSearch = () => {
    dispatch(
      fetchEmployee({
        page: pagination.current,
        pageSize: pageSize,
        fullName: searchParams.name,
        username: searchParams.name,
        phone: searchParams.phone,
        email: searchParams.email,
      })
    );
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
                    setSearchParams({
                      ...searchParams,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Email">
                <Input
                  placeholder="Nhập Email "
                  style={{ width: "100%" }}
                  value={searchParams.email}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, email: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Số Điện Thoại">
                <Input
                  placeholder="Nhập Số Điện Thoại "
                  style={{ width: "100%" }}
                  value={searchParams.phone}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, phone: e.target.value })
                  }
                />
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
      title: "Tên Nhân Viên",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên Đăng Nhập",
      dataIndex: "username",
      key: "username",
      width: 150,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
      width: 300,
    },
    {
      title: "Ngày Sinh",
      dataIndex: "birthDay",
      key: "birthDay",
      width: 300,
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
      width: 150,
      render: (text, record) => (
        <span>{record.gender === 0 ? "Nam" : "Nữ"}</span>
      ),
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
      width: 300,
      render: (text, record) => (
        <span>{`${record.district}, ${record.provice}, ${record.city}`}</span>
      ),
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
          <Button style={{ border: "none" }} icon={<EyeOutlined />} />
          <Button
            style={{ border: "none" }}
            icon={<EditOutlined />}
            onClick={() => onClickEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this size?"
            // onConfirm={() => handleChangeStatus(record)}
            okText="Yes"
            cancelText="No"
            // loading={loading}
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
        Thêm Nhân Viên
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
        <Divider orientation="left">Nhân Viên</Divider>
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
          dataSource={employee}
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
        <ModalAddNhanVien open={modalVisible} closeModal={closeModal} />
        <ModalUpdateNhanVien
          open={modalVisibleUpdate}
          loading={loading}
          closeModal={closeModalUpdate}
          payload={payload}
        />
      </>
    </div>
  );
};

export default NhanVien;
