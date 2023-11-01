import React, { useState, useEffect} from "react";
import CollapseCustom from "../../../form/CollapseCustom";
import TableComponent from "../../../form/TableCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space } from "antd";
import InputField from "../../../form/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchKichCos,
  setCurrentPage,
  setPageSize,
} from "../../../../store/slice/KichCoSlice";
import ModalKichCo from "./ModalKichCoAdd";
import ModalKichCoEdit from "./ModalKichCoEdit";

const KichCo = () => {

  const dispatch = useDispatch();
  const kichCos = useSelector((state) => state.kichCos.data.content);
  const currentPage = useSelector((state) => state.kichCos.currentPage);
  const pageSize = useSelector((state) => state.kichCos.pageSize);
  const totalRecords = useSelector((state) => state.kichCos.totalKichCos);
  const totalPages = useSelector((state) => state.kichCos.totalPages);

  const components = [
    <InputField
      label="name :"
      placeholder="Enter your name"
      customStyle={{
        width: "450px",
        backgroundColor: "lightblue",
        marginRight: "10px",
      }}
    />,
    <InputField
      label="description :"
      placeholder="Enter your description"
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
          <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} onClick={() => handleEdit(record)}
          />
        </Space>
      ),
    },
  ];

  const [selectedKichCo, setSelectedKichCo] = useState([]);
  console.log(selectedKichCo + " selected");
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

  const handleEdit = (kichCo) => {
    const { id, code, name, description, status } = kichCo;
    const kichCoData = [id, code, name, description, status];
    showEditModal();
    setSelectedKichCo(kichCoData);
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
    dispatch(fetchKichCos({ page: currentPage, pageSize }));
  };

  useEffect(() => {
    if (!isModalVisible) {
      console.log("Alo", currentPage);
      dispatch(fetchKichCos({ page: currentPage, pageSize }));
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
        dataSource={kichCos}
        totalRecord={totalRecords}
        showModal={showModal}
        currentPage={currentPage - 1}
        totalPages={totalPages}
        pageSize={pageSize}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
      <ModalKichCo
        visible={isModalVisible}
        onCancel={handleCancel}
        isModalVisible={isModalVisible}
        onUpdateComplete={onUpdateComplete}
      />

      <ModalKichCoEdit
        isModalVisible={isModalVisible}
        visible={isEditModalVisible}
        onCancel={hideEditModal}
        kichCos={selectedKichCo}
        onUpdateComplete={onUpdateComplete}
      />
    </div>
  );
};

export default KichCo;
