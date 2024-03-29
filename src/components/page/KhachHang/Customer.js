
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Space, Input, theme, Table, Collapse, Button, DatePicker, Form, Select,Row,Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ProfileFilled, FilterFilled, EyeOutlined, EditOutlined, DeleteFilled, PlusOutlined ,DeleteOutlined} from "@ant-design/icons";

import { } from 'antd';
import { Link } from "react-router-dom";
import moment from 'moment';
import { deleteCustomer,detailCustomer,fetchCustomer } from "../../../config/CustomerApi";

import ModalAddAddress from "./ModalAddAddress";
import UpdateCustomer from "./UpdateCustomer";
import AddCustomer from "./AddCustomer";
import DetailKhachHang from "./DetailModal";




const { Option } = Select;

const Customer = () => {
  const dispatch = useDispatch();
  const customer = useSelector((state) =>
    state.khachHang.customer
  );
  const loading = useSelector((state) => state.color.status === "loading");
  const pagination = useSelector((state) => state.khachHang.pagination);

  const [searchParams, setSearchParams] = useState({
    phone: "",
    status: "",
    username: "",
    name: "",
    email: "",
  });



  useEffect(() => {
    dispatch(
      fetchCustomer({
        page: pagination.page,
        pageSize: pagination.pageSize,
        // b: searchParams.name,
        phone: searchParams.phone,
        status: searchParams.status,
        username: searchParams.username,
        name: searchParams.name,
        email: searchParams.email
      })

    )

  }, [dispatch]);
  const onClickSearch = () => {
    dispatch(
      fetchCustomer({
        page: pagination.page,
        pageSize: pagination.pageSize,
        phone: searchParams.phone,
        status: searchParams.status,
        username: searchParams.username,
        name: searchParams.name,
        email: searchParams.email
      })
    );
   
  }
  const handleDelete = (id) => {

    dispatch(deleteCustomer(id))
      .then(() => {
        dispatch(
          fetchCustomer({
            page: pagination.page,
            pageSize: pagination.pageSize,
            phone: searchParams.phone,
            status: searchParams.status

          })
        );
      }).catch((error) => {
        console.error("Lỗi khi xoá màu:", error);
      });

  };

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
  };
  const styleButton = {
    display: "flex", justifyContent: "space-between"
  }


  const [customerUpdate, setCustomerUpdate] = useState();



  const [isModalOpenAddAddress, setIsModalOpenAddAddress] = useState(false);

  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [cusData, setCusData] = useState();
  const openModalDetail = async (id) => {
    const response = await dispatch(detailCustomer(id));

    setCustomerUpdate(response.payload);
    setCusData(response.payload.address)
    setIsModalOpenDetail(true);
  };
  const closeModalDetail = () => {
    setIsModalOpenDetail(false);
  };
  //add
  const [isModalOpenAddCus, setIsModalOpenAddCus] = useState(false);

  const openModalAdd = async (id) => {
    setIsModalOpenAddCus(true);

  };

  const closeModalAdd = () => {
    setIsModalOpenAddCus(false);
  };
  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD"); // Định dạng ngày tháng theo ý muốn, ví dụ: "YYYY-MM-DD HH:mm:ss"
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },

    {
      title: 'Tên Khách Hàng',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 2,
      },
    },


    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 2,
      },
    },
  
    // },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (text == "0" ? "Ngừng Hoạt Động" : " Hoạt Động"),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render:
        (text, record) => (

          <Space >
            <EyeOutlined style={{ fontSize: '23px' }} onClick={() => openDetail(record.id)} ></EyeOutlined>
            <EditOutlined style={{ fontSize: '23px' }} onClick={() => openModalDetail(record.id)} ></EditOutlined>
            <Button
             onClick={() => handleDelete(record.id)}
              style={{ border: "none" }}
              disabled={record.status === 0}
              icon={<DeleteOutlined />}
            />
            {/* <DeleteFilled style={{ fontSize: '23px' }} onClick={() => handleDelete(record.id)} ></DeleteFilled> */}
            {/* <PlusOutlined onClick={() => openAddAddress(record.id)} /> */}
          </Space>

        ),
    },

  ]
  //detail
  const [isModalDetail, setIsModalDetail] = useState(false);


  const [cusDataDetail, setCusDataDetail] = useState();
  const openDetail = async (id) => {
    const response = await dispatch(detailCustomer(id));
    setCusDataDetail(response.payload);
    setIsModalDetail(true);
  };
  const closeDetail = () => {
    setIsModalDetail(false);
  };
  //add address

  // const [isModalAddAddress, setIsModalAddAddress] = useState(false);
  // const [cusDataAddress, setCusDataAddress] = useState();
  // const openAddAddress = async (id) => {
  //   const response = await dispatch(detailCustomer(id));
  //   setCusDataAddress(response.payload);
  //   setIsModalAddAddress(true);
  // };
  // const closeAddress = () => {
  //   setIsModalAddAddress(false);
  // };

  //add
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const openModal = async () => {
    setIsModalOpenAdd(true);

  };

  const closeModal = () => {
    setIsModalOpenAdd(false);
  };


  const containerStyle = {
    display: 'flex',
    alignItems: 'center',

    //can doc
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
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Số điện thoại">
                <Input
                  placeholder="Tìm số điện thoại"
                  value={searchParams.phone}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, phone: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tên">
                <Input
                  placeholder="Tìm Tên"
                  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Username">
                <Input
                  placeholder="Tìm Username"
                  value={searchParams.username}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, username: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email">
                <Input
                  placeholder="Tìm email"
                  value={searchParams.email}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, email: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Row gutter={16}>
            <Col span={12} offset={6}>
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
  
          <Row>
            <Col span={12} offset={6}>
              <Form.Item wrapperCol={{ offset: 10 }}>
                <Button
                  type="primary"
                  onClick={onClickSearch}
                  // style={{ backgroundColor: "seaGreen" }}
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
      style: panelStyle,
    },
  ];
  


  return (
    <div>
      <Collapse
        items={getItems()}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>


        <h3 style={{ marginRight: 8 }}>Danh Sách </h3>
        <Button type="primary" shape="round" onClick={openModalAdd}>
          Thêm Khách
        </Button>

      </div>

      <Table

        columns={columns}
        dataSource={customer}
        loading={loading}
        total={pagination.totalItems}
        showModal={openModal}
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
      />
      <ModalAddAddress
        isOpen={isModalOpenAddAddress}
      // colors={colorData}
      // onCancel1={closeModalAddAddress}
      />
      <UpdateCustomer
        isOpen={isModalOpenDetail}
        cusUpdate={customerUpdate}
        cusAddress={cusData}
        onCancel1={closeModalDetail}
      />
      <DetailKhachHang

        isOpenDetail={isModalDetail}
        cus={cusDataDetail}
        onCancel1={closeDetail}
      />
      <AddCustomer
        isOpen={isModalOpenAddCus}
        onCancel1={closeModalAdd}
      />
     

    </div>
  )
};


export default Customer;
