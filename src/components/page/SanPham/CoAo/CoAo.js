import React, { useState, useEffect } from "react";
import CollapseCustom from "../../../form/CollapseCustom";
import TableComponent from "../../../form/TableCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space } from "antd";
import InputField from "../../../form/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoAos,
  setCurrentPage,
  setPageSize,
} from "../../../../store/slice/CoAoSlice";
import ModalCoAo from "./ModalCoAoAdd";
import ModalCoAoEdit from "./ModalCoAoEdit";

const CoAo = () => {
  const dispatch = useDispatch();
  const coAos = useSelector((state) => state.coAos.data.content);
  const currentPage = useSelector((state) => state.coAos.currentPage);
  const pageSize = useSelector((state) => state.coAos.pageSize);
  const totalRecords = useSelector((state) => state.coAos.totalCoAos);
  const totalPages = useSelector((state) => state.coAos.totalPages);

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

  const [selectedCoAo, setSelectedCoAo] = useState([]);
  console.log(selectedCoAo + " selected");
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

  const handleEdit = (coAo) => {
    const { id, code, name, description, status } = coAo;
    const coAoData = [id, code, name, description, status];
    showEditModal();
    setSelectedCoAo(coAoData);
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
    dispatch(fetchCoAos({ page: currentPage, pageSize }));
  };

  useEffect(() => {
    if (!isModalVisible) {
      console.log("Alo", currentPage);
      dispatch(fetchCoAos({ page: currentPage, pageSize }));
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
        dataSource={coAos}
        totalRecord={totalRecords}
        showModal={showModal}
        currentPage={currentPage - 1}
        totalPages={totalPages}
        pageSize={pageSize}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
      <ModalCoAo
        visible={isModalVisible}
        onCancel={handleCancel}
        isModalVisible={isModalVisible}
        onUpdateComplete={onUpdateComplete}
      />

      <ModalCoAoEdit
        isModalVisible={isModalVisible}
        visible={isEditModalVisible}
        onCancel={hideEditModal}
        coAos={selectedCoAo}
        onUpdateComplete={onUpdateComplete}
      />
    </div>
  );
};

export default CoAo;
