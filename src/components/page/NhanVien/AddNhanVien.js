import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import InputField from "../../form/InputField";
import DatePickerField from "../../form/DatePickerField";
import RadioField from "../../form/RadioField";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .input-field {
    margin-bottom: 16px;
  }

  .ant-input {
    width: 100%;
  }

  .radio-group {
    display: flex;
    gap: 10px;
  }

  .date-picker {
    width: 100%;
  }
`;

const AddNhanVien = ({ visible, onCancel, onAdd }) => {
  const [newEmployee, setNewEmployee] = useState({
    code: "",
    name: "",
    email: "",
    phone: "",
    description: "",
    district: "",
    province: "",
    city: "",
    gender: 0,
    birth_date: "",
    role: "",
  });

  const genderOptions = [
    { label: "Nam", value: "0" },
    { label: "Nữ", value: "1" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleDateChange = (date, dateString) => {
    setNewEmployee({ ...newEmployee, birth_date: dateString });
  };

  const handleGenderChange = (value) => {
    setNewEmployee({ ...newEmployee, gender: value });
  };

  const handleAdd = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn thêm nhân viên này không?",
      onOk() {
        onAdd(newEmployee);
        message.success("Thêm nhân viên thành công!");
        setNewEmployee({
          code: "",
          name: "",
          email: "",
          phone: "",
          description: "",
          district: "",
          province: "",
          city: "",
          gender: 0,
          birth_date: "",
          role: "",
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <StyledModal
      title="Add New Employee"
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
        <label>Mã:</label>
        <InputField
        name="code"
        placeholder="Nhập mã nhân viên"
        value={newEmployee.code}
        onChange={handleInputChange}
      />
      </div>
      <div className="input-field">
        <label>Tên Nhân Viên:</label>
        <InputField
        name="name"
        placeholder="Nhập họ và tên"
        value={newEmployee.name}
        onChange={handleInputChange}
      />
      </div>
      <div className="input-field">
        <label>Gmail:</label>
        <InputField
        name="email"
        placeholder="Nhập địa chỉ email"
        value={newEmployee.email}
        onChange={handleInputChange}
      />
      <div className="input-field">
        <label>Mô tả:</label>
        <InputField
        name="description"
        placeholder="Nhập mô tả"
        value={newEmployee.description}
        onChange={handleInputChange}
      />
      </div>
      <div className="input-field">
        <label>Điện thoại:</label>
        <InputField
        name="phone"
        placeholder="Nhập số điện thoại"
        value={newEmployee.phone}
        onChange={handleInputChange}
      />
      </div>
      <div className="input-field">
        <label>Quận/Huyện:</label>
        <InputField
        name="district"
        placeholder="Nhập quận/huyện"
        value={newEmployee.district}
        onChange={handleInputChange}
      />
      </div>
      <div className="input-field">
        <label>Tỉnh/Thành phố:</label>
        <InputField
        name="province"
        placeholder="Nhập tỉnh/thành phố"
        value={newEmployee.province}
        onChange={handleInputChange}
      />
      </div>
      <div className="input-field">
        <label>Quốc gia:</label>
        <InputField
        name="city"
        placeholder="Nhập quốc gia"
        value={newEmployee.city}
        onChange={handleInputChange}
      />
      </div>
      </div>
      <div className="input-field radio-group">
        <label>Gender:</label>
        <RadioField options={genderOptions} onChange={handleGenderChange} />
      </div>
      <div className="input-field">
        <label>Birth Date:</label>
        <DatePickerField
          name="birth_date"
          placeholder="Enter employee birth date"
          value={newEmployee.birth_date}
          onChange={handleDateChange}
          className="date-picker"
        />
      </div>
      {/* ...other input fields */}
    </StyledModal>
  );
};

export default AddNhanVien;
