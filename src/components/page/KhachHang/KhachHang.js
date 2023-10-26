import React, { useState } from "react";
import { Button, Collapse, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import CollapseComponent from "../../form/CollapseCustom";
import TableComponent from "../../form/TableCustom";
import InputField from "../../form/InputField";
import AddKhachHang from "./AddKhachHang";
import UpdateKhachHang from "./UpdateKhachHang"; // Assuming you have an AddCustomer component
import DatePickerField from "../../form/DatePickerField";
import RadioField from "../../form/RadioField";
import ViewKhachHang from "./ViewKhachHang";

const genderOptions = [
  { label: "Nam", value: "0" },
  { label: "Nữ", value: "1" },
];

const statusOptions = [
  { label: "Hoạt Động", value: "0" },
  { label: "Dừng Hoạt Động", value: "1" },
];

const components = [
  <InputField label="Username:" placeholder="Enter username" />,
  <InputField label="Name:" placeholder="Enter customer name" />,
  <InputField label="Phone:" placeholder="Enter phone number" />,
  <RadioField label="Giới Tính:" options={genderOptions} />,
  <DatePickerField
    label="Ngày Sinh:"
    name="birth_date"
    placeholder="Enter customer birth date"
    className="date-picker"
  />,
  <RadioField label="Trạng Thái:" options={statusOptions} />,
  // Add other fields as needed
];

const dataSource = [
  {
    key: "1",
    username: "hiepga",
    name: "Vũ Hoàng Hiệp",
    phone: "123-456-7890",
    gender: "0",
    rank: "Vàng",
    email: "hiepga@gmail.com",
    status: "1",
  },
  // Add other customer data as needed
];

const KhachHang = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalVisible(true);
  };

  const handleAdd = (newCustomer) => {
    // Handle logic to add a new customer to dataSource
    // After processing, close the add modal
    setIsAddModalVisible(false);
  };
  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalVisible(true);
  };
  const handleEdit = (editedCustomer) => {
    // Handle logic to edit the selected customer in dataSource
    // After processing, close the edit modal
    setIsEditModalVisible(false);
  };

  const handleCancelAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleCancelEditModal = () => {
    setIsEditModalVisible(false);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => (text === "0" ? "Nam" : "Nữ"),
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      key: "Rank",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (text === "0" ? "Hoạt Động" : "Ngừng Hoạt Động"),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faEye}
            style={{ cursor: "pointer" }}
            onClick={() => handleView(record)}
          />
          <FontAwesomeIcon
            icon={faEdit}
            style={{ cursor: "pointer" }}
            onClick={() => showEditModal(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showAddModal} style={{ marginBottom: "20px" }}>
        Add New
      </Button>
      <CollapseComponent components={components} />
      <div style={{ marginBottom: "30px" }}></div>
      <TableComponent columns={columns} dataSource={dataSource} totalRecord={dataSource.length} />

      <AddKhachHang visible={isAddModalVisible} onCancel={handleCancelAddModal} onAdd={handleAdd} />
      <UpdateKhachHang visible={isEditModalVisible} onCancel={handleCancelEditModal} onEdit={handleEdit} customer={selectedCustomer} />
      <ViewKhachHang
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default KhachHang;