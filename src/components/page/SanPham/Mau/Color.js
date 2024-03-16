
import React, { useState, useEffect } from "react";

import { Space, Input, theme, Table, Collapse, Button, ColorPicker, Form, Select, } from "antd";
import { useDispatch, useSelector } from "react-redux";


import { ProfileFilled, FilterFilled, EyeOutlined, EditOutlined, DeleteFilled, PlusOutlined ,DeleteOutlined} from "@ant-design/icons";
import { fetchColors,deleteColor,detailColor } from "../../../../config/ColorApi";

import { } from 'antd';

import ModalColor from "./ModalColorAdd";
import ModalColorUpdate from "./ModalColorEdit";
import ModalColorDetail from "./ModalColorDetail";


const { Option } = Select;

const Color = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => 
state.color.colors

  
  );
  const loading = useSelector((state) => state.color.status === "loading");
  const pagination = useSelector((state) => state.color.pagination);
  const [searchParams, setSearchParams] = useState({
    name: "",
    code: "",
  });
  

  useEffect(() => {
    dispatch(
      fetchColors({
        page: pagination.page,
        pageSize: pagination.pageSize,
        name: searchParams.name,
        code: searchParams.code,
        status: searchParams.status
      }),

    );

  }, [dispatch]);

  const onClickSearch = () => {
    dispatch(
      fetchColors({
        page: pagination.page,
        pageSize: pagination.pageSize,
        code: searchParams.code,
        name: searchParams.name,
        status: searchParams.status
      })
    );
  }
  const handleDelete = (id) => {

    dispatch(deleteColor(id))
      .then(() => {
        dispatch(
          fetchColors({
            page: pagination.page,
            pageSize: pagination.pageSize,
            name: searchParams.name,
            code: searchParams.code,
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


  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: 'Mã màu',
      dataIndex: 'code',
      key: 'code',
      sorter: {

      },
    },
    {
      title: 'Tên màu',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 2,
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
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
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render:
        (text, record) => (
          <Space >
            <EyeOutlined style={{ fontSize: '23px' }} onClick={() => openModalDetail(record.id)} ></EyeOutlined>
            <EditOutlined style={{ fontSize: '23px' }} onClick={() => openModalUpdate(record.id)}></EditOutlined>
            <Button
             onClick={() => handleDelete(record.id)}
              style={{ border: "none" }}
              disabled={record.status === 0}
              icon={<DeleteOutlined />}
            />
            
          </Space>
        ),
    },

  ];
  //add
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const openModal = async (id) => {
    setIsModalOpenAdd(true);

  };

  const closeModal = () => {
    setIsModalOpenAdd(false);
  };

  //detail
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [colorDataDetail, setColorDataDetail] = useState();
  const openModalDetail = async (id) => {
    const response = await dispatch(detailColor(id));

    setColorDataDetail(response.payload);

    setIsModalOpenDetail(true);
  };
  const closeModalDetail = () => {
    setIsModalOpenDetail(false);
  };
  //update

  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [colorData, setColorData] = useState();
  const openModalUpdate = async (id) => {
    const response = await dispatch(detailColor(id));

    setColorData(response.payload);

    setIsModalOpenUpdate(true);
  };
  const closeModalUpdate = () => {
    setIsModalOpenUpdate(false);
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
              <Form.Item label="Tên màu" >
                <Input placeholder="Tìm kiếm" style={{ width: "270px" }} value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  }

                />
              </Form.Item>
              <Form.Item label="Mã màu" style={{ marginLeft: "30px" }} >
                <Input placeholder="Tìm kiếm" style={{ width: "270px" }}
                  value={searchParams.code}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, code: e.target.value })
                  }
                />
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
            <Button type="primary" htmlType="submit" onClick={onClickSearch} >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      ),
      style: panelStyle,
    },
  ];
  const handleTableChange = (pagination) => {
    dispatch(
      fetchColors({
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...searchParams,
      })
    );
  };


  return (
    <div>
      <Collapse
        items={getItems()}

      />

      {/* </div> */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ marginRight: 8 }}>Danh Sách </h3>
        <Button type="primary" shape="round" onClick={openModal}>
          Thêm Màu
        </Button>
      </div>
      <Table

        columns={columns}
        dataSource={colors}
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
        onChange={handleTableChange}
      />
      <ModalColor
        isOpen={isModalOpenAdd}
        onCancel1={closeModal}
      />
      <ModalColorUpdate
        isOpen={isModalOpenUpdate}
        colors={colorData}
        onCancel1={closeModalUpdate}
      />
      <ModalColorDetail
        isOpen={isModalOpenDetail}
        colors={colorDataDetail}
        onCancel1={closeModalDetail}
      />
    </div>
  )
};


export default Color;