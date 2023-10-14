import React, { useState } from "react";
import { Button, Collapse, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import CollapseComponent from "../../form/CollapseCustom";
import TableComponent from "../../form/TableCustom";
import InputField from "../../form/InputField";
import AddKhachHang from "./AddKhachHang"; // Assuming you have an AddCustomer component
import DatePickerField from "../../form/DatePickerField";
import RadioField from "../../form/RadioField";

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
  },
  {
    title: "Actions",
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

const dataSource = [
  {
    key: "1",
    username: "hiepga",
    name: "Vũ Hoàng Hiệp",
    phone: "123-456-7890",
    gender: "Male",
    rank: "Vàng",
    email: "hiepga@gmail.com",
    status: "Active",
  },
  // Add other customer data as needed
];

const NhanVien = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAdd = (newCustomer) => {
    // Handle logic to add a new customer to dataSource
    // After processing, close the modal
    setIsAddModalVisible(false);
  };

  const handleCancelAddModal = () => {
    setIsAddModalVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: "20px" }}
      >
        Add New
      </Button>
      <CollapseComponent components={components} />
      <div style={{ marginBottom: "30px" }}></div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        totalRecord={dataSource.length}
      />

      <AddKhachHang
        visible={isAddModalVisible}
        onCancel={handleCancelAddModal}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default NhanVien;
