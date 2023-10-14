import React, { useState } from "react";
import { Button, Collapse, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import CollapseComponent from "../../form/CollapseCustom";
import TableComponent from "../../form/TableCustom";
import InputField from "../../form/InputField";
import AddNhanVien from "./AddNhanVien";
import DatePickerField from "../../form/DatePickerField";
import RadioField from "../../form/RadioField";

const genderOptions = [
  { label: "Nam", value: "0" },
  { label: "Nữ", value: "1" },
];
const genderOptions2 = [
  { label: "Đang Làm", value: "0" },
  { label: "Nghì Làm", value: "1" },
];
const components = [
  <InputField
    label="Code:"
    placeholder="Enter employee code"
  />,
  <InputField
    label="Name:"
    placeholder="Enter employee name"
  />,
  <InputField
    label="Phone:"
    placeholder="Enter phone number"
  />,
  <RadioField
  label="Giới Tính:"
   options={genderOptions} />,
  <DatePickerField
  label="Ngày Sinh:"
    name="birth_date"
    placeholder="Enter employee birth date"
    className="date-picker"
  />,
<RadioField
  label="Trạng Thái:"
   options={genderOptions2} />,
];

const columns = [
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
    title: "Date of Birth",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
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
    code: "EMP001",
    name: "John Doe",
    phone: "123-456-7890",
    gender: "Male",
    date_of_birth: "1990-01-01",
    role: "Manager",
    status: "Active",
    address: "123 Street St, City",
  },
  // Thêm dữ liệu cho các nhân viên khác nếu cần
];

const NhanVien = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAdd = (newEmployee) => {
    // Xử lý logic để thêm nhân viên vào dataSource
    // Sau khi xử lý xong, đóng modal
    setIsAddModalVisible(false);
  };

  const handleCancelAddModal = () => {
    setIsAddModalVisible(false);
  };

  // Các hàm xử lý khác ở đây

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

      <AddNhanVien
        visible={isAddModalVisible}
        onCancel={handleCancelAddModal}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default NhanVien;
