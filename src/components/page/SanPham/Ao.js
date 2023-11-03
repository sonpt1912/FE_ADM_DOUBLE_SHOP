import React, { useState, useEffect } from "react";
import CollapseCustom from "../../form/CollapseCustom";
import TableComponent from "../../form/TableCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space, Input, Select } from "antd";
import InputField from "../../form/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchColors,
  setCurrentPage,
  setPageSize,
} from "../../../store/slice/ColorSlice";
import ModalAo from "./Ao/ModalAoAdd";

const Ao = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.colors.data.content);
  const currentPage = useSelector((state) => state.colors.currentPage);
  const pageSize = useSelector((state) => state.colors.pageSize);
  const totalRecords = useSelector((state) => state.colors.totalColors);
  const totalPages = useSelector((state) => state.colors.totalPages);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const components = [
    <Input label="name :" placeholder="Enter your username" />,
    <Input label="description :" placeholder="Enter your username" />,
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: "jack", label: "Jack" },
        { value: "lucy", label: "Lucy" },
        { value: "Yiminghe", label: "yiminghe" },
        { value: "disabled", label: "Disabled", disabled: true },
      ]}
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
      <ModalAo
        visible={isModalVisible}
        onCancel={handleCancel}
        isModalVisible={isModalVisible}
        onUpdateComplete={onUpdateComplete}
      />
    </div>
  );
};

export default Ao;
