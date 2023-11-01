import React, { useState , useEffect} from "react";
import CollapseCustom from "../../../form/CollapseCustom";
import TableComponent from "../../../form/TableCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space } from "antd";
import InputField from "../../../form/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAos,
  setCurrentPage,
  setPageSize,
} from "../../../../store/slice/AoSlice";
import ModalAo from "./ModalAoAdd";
import ModalAoEdit from "./ModalAoEdit";

const Ao = () => {

  const dispatch = useDispatch();
  const aos = useSelector((state) => state.aos.data.content);
  const currentPage = useSelector((state) => state.aos.currentPage);
  const pageSize = useSelector((state) => state.aos.pageSize);
  const totalRecords = useSelector((state) => state.aos.totalAos);
  const totalPages = useSelector((state) => state.aos.totalPages);

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
  ];
  
  const columns = [
    {
      title: "stt",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
          <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} onClick={() => handleEdit(record)} />
        </Space>
      ),
    },
  ];

  const [selectedAo, setSelectedAo] = useState([]);
  console.log(selectedAo + " selected");
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

  const handleEdit = (ao) => {
    const { id,  name, status } = ao;
    const aoData = [id, name, status];
    showEditModal();
    setSelectedAo(aoData);
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
    dispatch(fetchAos({ page: currentPage, pageSize }));
  };

  useEffect(() => {
    if (!isModalVisible) {
      console.log("Alo", currentPage);
      dispatch(fetchAos({ page: currentPage, pageSize }));
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
        dataSource={aos}
        totalRecord={totalRecords}
        showModal={showModal}
        currentPage={currentPage - 1}
        totalPages={totalPages}
        pageSize={pageSize}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
      <ModalAo
        visible={isModalVisible}
        onCancel={handleCancel}
        isModalVisible={isModalVisible}
        onUpdateComplete={onUpdateComplete}
      />

      <ModalAoEdit
        isModalVisible={isModalVisible}
        visible={isEditModalVisible}
        onCancel={hideEditModal}
        aos={selectedAo}
        onUpdateComplete={onUpdateComplete}
      />
    </div>
  );
};

export default Ao;
