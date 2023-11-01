import React, { useState, useEffect } from "react";
import CollapseCustom from "../../../form/CollapseCustom";
import TableComponent from "../../../form/TableCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space } from "antd";
import InputField from "../../../form/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatLieus,
  setCurrentPage,
  setPageSize,
} from "../../../../store/slice/ChatLieuSlice";
import ModalChatLieu from "./ModalChatLieuAdd";
import ModalChatLieuEdit from "./ModalChatLieuEdit";

const ChatLieu = () => {
  const dispatch = useDispatch();
  const chatLieus = useSelector((state) => state.chatLieus.data.content);
  const currentPage = useSelector((state) => state.chatLieus.currentPage);
  const pageSize = useSelector((state) => state.chatLieus.pageSize);
  const totalRecords = useSelector((state) => state.chatLieus.totalChatLieus);
  const totalPages = useSelector((state) => state.chatLieus.totalPages);

  const components = [
    <InputField
      label="name :"
      placeholder="Enter your username"
      customStyle={{
        width: "450px",
        backgroundColor: "lightblue",
        marginRight: "10px",
      }}
    />,
    <InputField
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
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (record.status === 1 ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer" }} />
          <FontAwesomeIcon
            icon={faEdit}
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(record)}
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

  // Modal for edit
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const hideEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleEdit = (chatLieu) => {
    const { id, code, name, description, status } = chatLieu;
    const chatLieuData = [id, code, name, description, status];
    showEditModal();
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

  const onUpdateComplete = () => {
    dispatch(fetchChatLieus({ page: currentPage, pageSize }));
  };

  useEffect(() => {
    if (!isModalVisible) {
      console.log("Alo", currentPage);
      dispatch(fetchChatLieus({ page: currentPage, pageSize }));
    }
  }, [dispatch, isModalVisible, currentPage, pageSize]);

  const onChange = (page) => {
    page = page - 1;
    dispatch(setCurrentPage(page));
  };

  const onShowSizeChange = (size) => {
    dispatch(setPageSize(size));
  };

  return (
    <div>
      <CollapseCustom components={components} />
      <div style={{ marginBottom: "30px" }}></div>
      <TableComponent
        columns={columns}
        dataSource={chatLieus}
        totalRecord={totalRecords}
        showModal={showModal}
        currentPage={currentPage - 1}
        totalPages={totalPages}
        pageSize={pageSize}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
      <ModalChatLieu
        visible={isModalVisible}
        onCancel={handleCancel}
        isModalVisible={isModalVisible}
        onUpdateComplete={onUpdateComplete}
      />

      <ModalChatLieuEdit
        isModalVisible={isModalVisible}
        visible={isEditModalVisible}
        onCancel={hideEditModal}
        chatLieus={selectedChatLieu}
        onUpdateComplete={onUpdateComplete}
      />
    </div>
  );
};

export default ChatLieu;
