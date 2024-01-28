
import React, { useState, useEffect } from "react";
import { Space, Input, theme, Table, Collapse, Button, DatePicker, Form, Select, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ProfileFilled, FilterFilled, EyeFilled, EditFilled, DeleteFilled } from "@ant-design/icons";

import { } from 'antd';
import { Link } from "react-router-dom";
import { fetchCustomer } from "../../../store/slice/KhachHangReducer";



const { Option } = Select;

const KhachHang = () => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => 
  
    state.khachHang.customer
    
  
  );
  const loading = useSelector((state) => state.color.status === "loading");
  const pagination = useSelector((state) => state.color.pagination);
  const [searchParams, setSearchParams] = useState({
    name: "",
    code: "",
  });
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  

  useEffect(() => {
    dispatch(
      fetchCustomer({
        page: pagination.page,
        pageSize: pagination.pageSize,
       
      }),

    );

  }, [dispatch]);


  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
  };
  const styleButton = {
    display: "flex", justifyContent: "space-between"
  }


 
   
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',

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
      title: 'CCCD',
      dataIndex: 'phone',
      key: 'phone',
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
    {
      title: 'Ngày sinh',
      dataIndex: 'birtDay',
      key: 'birtDay',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 2,
      },
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (text == "0" ? "Ngừng Hoạt Động" : " Hoạt Động"),
    },
    {
      title: 'Khác',
      dataIndex: 'action',
      key: 'action',
      render:
        (text, record) => (
          <Space >
            <EyeFilled style={{ fontSize: '23px' }}  ></EyeFilled>
            <EditFilled style={{ fontSize: '23px' }} ></EditFilled>
            <DeleteFilled style={{ fontSize: '23px' }}  ></DeleteFilled>
          </Space>
        ),
    },

  ];


  //add
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const openModal = async () => {
    setIsModalOpenAdd(true);

  };

  const closeModal = () => {
    setIsModalOpenAdd(false);
  };

  //detail
  // const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  // const [colorDataDetail, setColorDataDetail] = useState();
  // const openModalDetail = async (id) => {
  //   const response = await dispatch(detailColor(id));

  //   setColorDataDetail(response.payload);

  //   setIsModalOpenDetail(true);
  // };
  // const closeModalDetail = () => {
  //   setIsModalOpenDetail(false);
  // };
  //update

  // const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  // const [colorData, setColorData] = useState();
  // const openModalUpdate = async (id) => {
  //   const response = await dispatch(detailColor(id));
  //   setColorData(response.payload);
  //   setIsModalOpenUpdate(true);
  // };
  // const closeModalUpdate = () => {
  //   setIsModalOpenUpdate(false);
  // };
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
            <div style={containerStyle}>
              <Form.Item label="Tìm kiếm" >
                <Input placeholder="Tên khách hàng và số điện thoại" style={{ width: "270px" }} value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  }

                />
              </Form.Item>
              <Form.Item label="Ngày Sinh" style={{ marginLeft: "30px" }} >
              <DatePicker placeholder="Ngày sinh" onChange={onChange}style={{ width: "270px" }} />
              </Form.Item>


              <Form.Item label="Trạng Thái" style={{ marginLeft: "30px" }}>
                <Select
                  style={{ width: "270px", }}
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
            </div>

          </div>
          <Form.Item wrapperCol={{ offset: 10 }}>
            <Button type="primary" htmlType="submit" >
              Tìm kiếm
            </Button>
          </Form.Item>
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
        <Link to="/dashboard/khachHang/taoKhachHang" >Tạo Khách hàng</Link>
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
   
    </div>
  )
};


export default KhachHang;
