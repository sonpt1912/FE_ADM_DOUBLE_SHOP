
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space, Input, Table, Collapse, Button, ColorPicker } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { ProfileFilled, FilterFilled, EyeFilled, EditFilled, DeleteFilled } from "@ant-design/icons";

// import Icon, {ProfileFilled} from "@ant-design/icons/lib/components/Icon";


import { } from 'antd';
import {
  fetchColors,
  setCurrentPage,
  setPageSize,
} from "../../../../store/slice/ColorSlice";
import ModalColor from "./ModalColorAdd";
import ModalColorEdit from "./ModalColorEdit";

const Mau = () => {
  // const itemIdToRemove = '2';
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.colors.data.content);
  const currentPage = useSelector((state) => state.colors.currentPage);
  const pageSize = useSelector((state) => state.colors.pageSize);
  const totalRecords = useSelector((state) => state.colors.totalColors);
  const totalPages = useSelector((state) => state.colors.totalPages);


  const components = [
    <Input
      label="name :"
      placeholder="Enter your username"
      customStyle={{
        width: "450px",
        backgroundColor: "lightblue",
        marginRight: "10px",
      }}
    />,
    <Input
      label="description :"
      placeholder="Enter your username"
      customStyle={{
        width: "450px",
        backgroundColor: "lightblue",
        marginRight: "10px",
      }}
    />,
  ];


  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: ''
    },
    {
      title: 'Mã màu',
      dataIndex: 'code',
      key:'code',
      sorter: {
        // compare: (a, b) => a.chinese - b.chinese,
        // multiple: 3,
      },
    },
    {
      title: 'Tên màu',
      dataIndex: 'name',
      key: '',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 2,
      },
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (text === "0" ? "Hoạt Động" : "Ngừng Hoạt Động"),
    },
    {
      title: 'Khác',
      dataIndex: 'action',
      key: 'action',
      render:
        (text, record) => (
          <Space >
            <EyeFilled style={{ fontSize: '23px' }}></EyeFilled>
            <EditFilled style={{ fontSize: '23px' }}></EditFilled>
            <DeleteFilled style={{ fontSize: '23px' }} onClick={() => handleRemove(record)}></DeleteFilled>
          </Space>
        ),
    },

  ];
  var
    datas = [
      {
        key: '1',
        code: '#PH555',
        name: 'John Brown',
        status: '1'
        
      },
     
     
    ];

  const [xoa, setXoa] = useState(datas);
  const handleRemove = (id) => {
    const newXoa = xoa.filter(person => person.key !== id.key);
    console.log("aa", newXoa)
    setXoa(newXoa);
  };

  const statusOptions = [
    { label: "Hoạt Động", value: "0" },
    { label: "Dừng Hoạt Động", value: "1" },
  ];

  const [selectedColor, setSelectedColor] = useState([]);
  console.log(selectedColor + " selected");
  // Modal for view
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const showViewModal = () => {
    setIsViewModalVisible(true);
  };

  const hideViewModal = () => {
    setIsViewModalVisible(false);
  };

  // Modal for edit
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const hideEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleEdit = (color) => {
    const { id, code, name, description, status } = color;
    const colorData = [id, code, name, description, status];
    showEditModal();
    setSelectedColor(colorData);
  };
  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onUpdateComplete = () => {
    dispatch(fetchColors({ page: currentPage, pageSize }));
  };

  useEffect(() => {
    if (!isModalVisible) {
      console.log("Alo", currentPage);
      dispatch(fetchColors({ page: currentPage, pageSize }));
    }
  }, [dispatch, isModalVisible, currentPage, pageSize]);

  const onChange = (page) => {
    page = page - 1;
    dispatch(setCurrentPage(page));
  };

  const onShowSizeChange = (size) => {
    dispatch(setPageSize(size));
  };
  const containerStyle = {
    display: 'flex',
    alignItems: 'center', //can doc
  };

  return (
    <div>
      <Collapse components={components} />
      <div style={{ marginBottom: "30px" }}></div>

      <div style={{ display: 'inline-flex' }}>
        <FilterFilled style={{ fontSize: '20px' }}></FilterFilled>
        <h3 >Bộ lọc</h3>
      </div>
      <div style={{ marginTop: "10px" }}></div>
      <div style={containerStyle}>

        <h3 >Mã màu</h3>
        <Input placeholder="Tìm kiếm" size="large" style={{ width: '400px', margin: '20px' }} />
        <h3 >Tên màu</h3>
        <Input placeholder="Tìm kiếm" size="large" style={{ width: '400px', margin: '20px' }} />
      </div>

      <div align="center" >
        <Button type="primary" >Làm mới</Button>
      </div>
      <div style={{ marginTop: "50px" }}></div>

      <Collapse />
      <div style={containerStyle}>
        <ProfileFilled style={{ fontSize: '20px', display: 'inline-block' }}></ProfileFilled>
        <h2 style={{ display: 'inline-block' }}>Danh sách màu</h2>
        <div style={{ marginLeft: 'auto' }}>
          <Button type="primary" onClick={showModal}>Thêm mới</Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={xoa}
        totalRecord={totalRecords}
        showModal={showModal}
        currentPage={currentPage - 1}
        totalPages={totalPages}
        pageSize={pageSize}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
      <ModalColor
        visible={isModalVisible}
        onCancel={handleCancel}
        isModalVisible={isModalVisible}
        onUpdateComplete={onUpdateComplete}
      />
      </div>
)};

export default Mau;