import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import InputField from "../../form/InputField";
import RadioField from "../../form/RadioField";
import DatePickerField from "../../form/DatePickerField";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  // ...styles remain the same
`;

const AddKhachHang = ({ visible, onCancel, onAdd }) => {
  const [newCustomer, setNewCustomer] = useState({
    username: "",
    name: "",
    gender: "0", // Assuming '0' represents 'Nam' and '1' represents 'Nữ'
    phone: "",
    email: "",
    password: "",
    status: "0", // Assuming '0' represents 'Active' and '1' represents 'Inactive'
    // Additional fields can be added here
  });
  

  const genderOptions = [
    { label: "Nam", value: "0" },
    { label: "Nữ", value: "1" },
  ];

  const statusOptions = [
    { label: "Active", value: "0" },
    { label: "Inactive", value: "1" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleGenderChange = (value) => {
    setNewCustomer({ ...newCustomer, gender: value });
  };

  const handleStatusChange = (value) => {
    setNewCustomer({ ...newCustomer, status: value });
  };

  const handleAdd = () => {

    onAdd(newCustomer); 
    message.success("Thêm khách hàng thành công!");
    onCancel(); 
  };

  return (
    <StyledModal
      title="Add New Customer"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAdd}>
          Add
        </Button>,
      ]}
    >
      <div className="input-field">
        <label>Username:</label>
        <InputField
          name="username"
          placeholder="Enter username"
          value={newCustomer.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-field">
        <label>Name:</label>
        <InputField
          name="name"
          placeholder="Enter customer name"
          value={newCustomer.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-field radio-group">
        <label>Gender:</label>
        <RadioField options={genderOptions} onChange={handleGenderChange} />
      </div>
      <div className="input-field">
        <label>Phone:</label>
        <InputField
          name="phone"
          placeholder="Enter phone number"
          value={newCustomer.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-field">
        <label>Email:</label>
        <InputField
          name="email"
          placeholder="Enter email"
          value={newCustomer.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-field">
        <label>Password:</label>
        <InputField
          name="password"
          type="password"
          placeholder="Enter password"
          value={newCustomer.password}
          onChange={handleInputChange}
        />
      </div>

    </StyledModal>
  );
};

export default AddKhachHang;
