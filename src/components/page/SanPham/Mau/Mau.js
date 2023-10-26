import React, { useState, useEffect } from "react";
import CollapseCustom from "../../../form/CollapseCustom";
import TableComponent from "../../../form/TableCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space } from "antd";
import InputField from "../../../form/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchColors,
  fetchTotalColors,
  setCurrentPage,
  setPageSize,
} from "../../../../store/slice/ColorSlice";
import ModalColor from "./ModalColorAdd";

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
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer" }} />
        <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} />
      </Space>
    ),
  },
];

const Mau = () => {
  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.colors.data.content);
  const currentPage = useSelector((state) => state.colors.currentPage);
  const pageSize = useSelector((state) => state.colors.pageSize);
  console.log("Current page in Mauuu: " + currentPage);
  const totalRecords = useSelector((state) => state.colors.totalColors);
  const totalPages = useSelector((state) => state.colors.totalPages);

  useEffect(() => {
    dispatch(fetchTotalColors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchColors({ page: currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

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
        dataSource={colors}
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
      />
    </div>
  );
};

export default Mau;
