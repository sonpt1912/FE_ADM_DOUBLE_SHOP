
import React, { useState, useEffect } from "react";

import { Space, Input, theme,Table, Collapse, Button, ColorPicker , Form, Select, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { ProfileFilled, FilterFilled, EyeFilled, EditFilled, DeleteFilled } from "@ant-design/icons";
import { fetchColors, deleteColor , detailColor, addColor} from "../../../../store/slice/MauReducer";
// import Icon, {ProfileFilled} from "@ant-design/icons/lib/components/Icon";

import qs from "qs";

import { } from 'antd';

import ModalColor from "./ModalColorAdd";
import ModalColorUpdate from "./ModalColorEdit";


const Mau = () => {
  const dispatch = useDispatch();
  // const [data, setData] = useState();
  const colors = useSelector((state) => state.color.colors);
  const loading = useSelector((state) => state.color.status === "loading");
  const pagination = useSelector((state) => state.size.pagination);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [searchParams, setSearchParams] = useState({
    name: "",
    status: "",
  });
  
  useEffect(() => {
    dispatch(
      fetchColors({
        page: 0,
        pageSize: 5,
        name: searchParams.name,
        status: searchParams.status,
      }),
     
    );
    
  }, [dispatch]);
 
  const onClickSearch = () => {
    dispatch(
      fetchColors({
        page: 0,
        pageSize: 5,
        code: searchParams.code,
        name: searchParams.name,
      })
    );
  }
  const handleDelete = (id) =>{
    console.log("code", id)
    dispatch(deleteColor(id))
    .then(() => {
      dispatch(
        fetchColors({
          page: 0,
          pageSize: 5,
          name: searchParams.name,
          status: searchParams.status,
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
  const styleButton ={
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
        // compare: (a, b) => a.chinese - b.chinese,
        // multiple: 3,
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
      title: 'Khác',
      dataIndex: 'action',
      key: 'action',
      render:
        (text, record) => (
          <Space >
            <EyeFilled style={{ fontSize: '23px' }} ></EyeFilled>
            <EditFilled style={{ fontSize: '23px' }}  onClick={() => openModalUpdate(record.id)}></EditFilled>
            <DeleteFilled style={{ fontSize: '23px' }} onClick={() => handleDelete(record.id)}></DeleteFilled>
          </Space>
        ),
    },

  ];
  

  // const [selectedColor, setSelectedColor] = useState([]);
  // console.log(selectedColor + " selected");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const openModal = () => {
   
    setIsModalOpenAdd(true);

  };

  const closeModal = () => {
    setIsModalOpenAdd(false);
  };


  
  
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
const [colorData, setColorData] = useState();
  const openModalUpdate = async (id) => {
      // Dispatch the detailColor action and wait for the result
      const response = await dispatch(detailColor(id));
      console.log("Response from detailColor:", response);
         setColorData( response.payload);
        console.log("Color Data:", colorData);
setCode(colorData.code)
setName(colorData.name)
console.log(colorData.code)
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
                <Input placeholder="Tìm kiếm" style={{ width: "270px" }}  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  } />
              </Form.Item>
              <Form.Item label="Mã màu" style={{marginLeft: "30px"}}>
                <Input placeholder="Tìm kiếm" style={{ width: "270px" }} />
              </Form.Item>
              <Form.Item label="Trạng Thái" style={{marginLeft: "30px"}}>
                <Select style={{ width: "270px",  }}>
                  <Select.Option value="0">Hoạt động</Select.Option>
                  <Select.Option value="1">Ngừng hoạt động</Select.Option>
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
        page: pagination.current - 1,
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
        // totalRecord={totalRecords}
        showModal={openModal}
        pagination={{
            pageSize: pagination.pageSize,
            total: pagination.totalItems,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (totalPages) => `Total ${totalPages} items`,
          }}
      // currentPage={currentPage - 1}
      // totalPages={totalPages}
      // pageSize={pageSize}
      onChange={handleTableChange}
      // onShowSizeChange={onShowSizeChange}
      />
      <ModalColor
        isOpen={isModalOpenAdd}
        // open={isModalOpen} 
        // handleOk={handleOk} 
        onCancel1 ={closeModal}
        // onCancel={handleCancel}
        // isModalVisible={isModalVisible}
        // onUpdateComplete={onUpdateComplete}
      /> 
       <ModalColorUpdate
        isOpen={isModalOpenUpdate}
        colors={colorData}
        // open={isModalOpen} 
        // handleOk={handleOk} 
        onCancel1 ={closeModalUpdate}
        // onCancel={handleCancel}
        // isModalVisible={isModalVisible}
        // onUpdateComplete={onUpdateComplete}
      /> 
    </div>
  )
};


export default Mau;