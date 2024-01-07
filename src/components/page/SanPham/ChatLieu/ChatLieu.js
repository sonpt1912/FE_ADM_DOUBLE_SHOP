import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space, Input, Table, Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import ModalChatLieu from "./ModalChatLieuAdd";
import ModalChatLieuEdit from "./ModalChatLieuEdit";


const ChatLieu = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8072/Material/hien-thi')
      .then(Response => { setData(Response.data) })
      .catch(error => {
        console
          .error('Error', error)
      });
  }, []);


  // const components = [
  //   <Input
  //     label="name :"
  //     placeholder="Enter your username"
  //     customStyle={{
  //       width: "450px",
  //       backgroundColor: "lightblue",
  //       marginRight: "10px",
  //     }}
  //   />,
  //   <Input
  //     label="description :"
  //     placeholder="Enter your username"
  //     customStyle={{
  //       width: "450px",
  //       backgroundColor: "lightblue",
  //       marginRight: "10px",
  //     }}
  //   />,
  // ];
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      // render: (text, record, index) => index + 1,
    },
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (record.status === 0 ? "Inactive" : "Active"),
    },
    {
      title: "ChucNang",
      dataIndex: "ChucNang",
      key: "ChucNang",
      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer" }} />
          <FontAwesomeIcon
            icon={faEdit}
            style={{ cursor: "pointer" }}
            // onClick={() => handleEdit(record)}
            onClick={showEditModal}
          />
        </Space>
      ),
    },
  ];

  const [selectedChatLieu, setSelectedChatLieu] = useState([]);
  console.log(selectedChatLieu + " selected");
  // Modal for view
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const showViewModal = () => {
    setIsViewModalVisible(true);
  };

  const hideViewModal = () => {
    setIsViewModalVisible(false);
  };

  const modal = [

  ]

  // Modal for edit
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const hideEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleEdit = (ChatLieu) => {
    const { maChatLieu, tenChatLieu, moTa, trangThai } = ChatLieu;
    const chatLieuData = [maChatLieu, tenChatLieu, moTa, trangThai];
    // showEditModal();
    setSelectedChatLieu(chatLieuData);
  };
  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const onUpdateComplete = () => {
  //   dispatchEvent(fetchChatLieus({ page: currentPage, pageSize }));
  // };

  // useEffect(() => {
  //   if (!isModalVisible) {
  //     console.log("Alo", currentPage);
  //     dispatch(fetchChatLieus({ page: currentPage, pageSize }));
  //   }
  // }, [dispatch, isModalVisible, currentPage, pageSize]);

  // const onChange = (page) => {
  //   page = page - 1;
  //   dispatch(setCurrentPage(page));
  // };

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const items = [
    {
      key: '1',
      label: 'Tìm Kiếm',
      children: <div>
        <div className="text-center">
          <h1>Tìm kiếm</h1>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <p>Tim kiếm theo Mã Chất Liệu:</p>
            <Input className="w-100"
              placeholder="Mã Chất Liệu"
              customStyle={{
                width: "450px",
                backgroundColor: "lightblue",
                marginRight: "10px",
              }}
            />
          </div>
          <div className="col-lg-6">
            <p>Tim kiếm theo Tên chất liệu:</p>
            <Input className="w-100"
              placeholder="Tên Chất Liệu"
              customStyle={{
                width: "450px",
                backgroundColor: "lightblue",
                marginRight: "10px",
              }}
            />
          </div>
        </div>
        <div className="mt-4"></div>
        <div className="text-center">
          <button className="ps-4 pe-4 border border-5 border-primary rounded bg-primary" style={{ color: "white" }}>Seach</button>
        </div>
      </div>,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>

      <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />


      <div className="mt-4"></div>
      <hr />
      {/* <Collapse components={components} /> */}
      <div style={{ marginBottom: "30px" }}></div>

      <div className="row mx-auto container">
        <div className="col-lg-9">
          <h1>Danh Sách Chất Liệu</h1>
        </div>
        <div className="col-lg-3">
          <button onClick={showModal} className="float-end me-4 border border-5 border-primary rounded bg-primary" style={{ color: "white" }}>+Thêm mới</button>
        </div>
      </div>

      <Table
        className="text-center"
        columns={columns}
        dataSource={data}
      // totalRecord={totalRecords}
      // showModal={showModal}
      // currentPage={currentPage - 1}
      // totalPages={totalPages}
      // pageSize={pageSize}
      // onChange={onChange}
      // onShowSizeChange={onShowSizeChange}
      />
      <ModalChatLieu
        visible={isModalVisible}
        onCancel={handleCancel}
        isModalVisible={isModalVisible}
      // onUpdateComplete={onUpdateComplete}
      />

      <ModalChatLieuEdit
        isModalVisible={isModalVisible}
        visible={isEditModalVisible}
        onCancel={hideEditModal}
        ChatLieus={selectedChatLieu}
      // onUpdateComplete={onUpdateComplete}
      />
    </div>
  );
};

export default ChatLieu;
