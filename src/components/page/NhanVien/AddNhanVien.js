import React, { useState, useEffect } from "react";
import { Modal, Button, message } from "antd";
import InputField from "../../form/InputField";
import DatePickerField from "../../form/DatePickerField";
import RadioField from "../../form/RadioField";
import SelectField from "../../form/SelectField";
import styled from "styled-components";
import axios from "axios";

const StyledModal = styled(Modal)`
  .input-fields-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }

  .input-field {
    flex: 1 1 calc(50% - 20px);
    margin-bottom: 16px;
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
    gender: "0",
    birth_date: "",
    role: "",
  });

  const [addressData, setAddressData] = useState({
    districts: [],
    name: "",
  });

  const genderOptions = [
    { label: "Nam", value: "0" },
    { label: "Nữ", value: "1" },
  ];

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        if (newEmployee.province) {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/v2/province/${newEmployee.province}`
          );
          setAddressData(response.data);
        }
      } catch (error) {
        console.error("Error fetching address data: ", error);
      }
    };

    fetchAddressData();
  }, [newEmployee.province]);

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

  const handleAdd = async () => {
    try {
      await axios.post("YOUR_API_ENDPOINT", newEmployee);
      message.success("Thêm nhân viên thành công!");
      setNewEmployee({
        code: "",
        name: "",
        email: "",
        phone: "",
        description: "",
        district: "",
        province: "",
        gender: "0",
        birth_date: "",
        role: "",
      });
      onAdd();
    } catch (error) {
      console.error("Error adding employee: ", error);
      message.error("Thêm nhân viên thất bại!");
    }
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
      <div className="input-fields-container">
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
        </div>
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
          <SelectField
            options={addressData.districts || []}
            placeholder="Nhập quận/huyện"
            value={newEmployee.district}
            onChange={(value) => handleInputChange({ target: { name: "district", value } })}
            label="Quận/Huyện"
          />
        </div>
        <div className="input-field">
          <label>Tỉnh/Thành phố:</label>
          <SelectField
            options={addressData.districts.map((district) => ({
              id: district.id,
              name: district.name,
            }))}
            placeholder="Nhập tỉnh/thành phố"
            value={newEmployee.province}
            onChange={(value) => handleInputChange({ target: { name: "province", value } })}
            label="Tỉnh/Thành phố"
          />
        </div>
        <div className="input-field">
          <label>Giới tính:</label>
          <RadioField options={genderOptions} onChange={handleGenderChange} />
        </div>
        <div className="input-field">
          <label>Ngày sinh:</label>
          <DatePickerField
            name="birth_date"
            placeholder="Nhập ngày sinh nhân viên"
            value={newEmployee.birth_date}
            onChange={handleDateChange}
            className="date-picker"
          />
        </div>
      </div>
    </StyledModal>
  );
};

export default AddNhanVien;
