import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Radio, message } from "antd";
import axios from "axios";
import DatePickerField from "../../form/DatePickerField";
import SelectField from "../../form/SelectField";

const UpdateNhanVien = ({ visible, onCancel, onEdit, employee }) => {
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });
  const [addressData, setAddressData] = useState({
    provinces: [],
    districts: [],
  });

  useEffect(() => {
    // Reset editedEmployee state when the employee prop changes
    setEditedEmployee({ ...employee });

    // Fetch address data (provinces and districts) from the API
    const fetchAddressData = async () => {
      try {
        const response = await axios.get("https://your-address-api/provinces");
        setAddressData({
          provinces: response.data.provinces,
          districts: response.data.districts,
        });
      } catch (error) {
        console.error("Error fetching address data: ", error);
      }
    };

    fetchAddressData();
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleGenderChange = (e) => {
    setEditedEmployee({ ...editedEmployee, gender: e.target.value });
  };

  const handleEdit = async () => {
    try {
      // Perform validation if necessary

      // Call the API to update the employee
      await axios.put(`https://your-api-endpoint/${editedEmployee.id}`, editedEmployee);

      // Call the onEdit function with the edited employee data
      onEdit(editedEmployee);

      // Display success message
      message.success("Sửa nhân viên thành công!");

      // Close the modal
      onCancel();
    } catch (error) {
      console.error("Error updating employee: ", error);
      message.error("Sửa nhân viên thất bại!");
    }
  };

  return (
    <Modal
      title="Sửa Nhân Viên"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="edit" type="primary" onClick={handleEdit}>
          Sửa
        </Button>,
      ]}
    >
      <div style={{ marginBottom: "16px" }}>
        <label>Mã nhân viên:</label>
        <Input
          name="code"
          value={editedEmployee.code || ""}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>Tên nhân viên:</label>
        <Input
          name="name"
          value={editedEmployee.name || ""}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>Điện thoại:</label>
        <Input
          name="phone"
          value={editedEmployee.phone || ""}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>Giới tính:</label>
        <Radio.Group
          name="gender"
          onChange={handleGenderChange}
          value={editedEmployee.gender || "0"}
        >
          <Radio value="0">Nam</Radio>
          <Radio value="1">Nữ</Radio>
        </Radio.Group>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>Địa chỉ:</label>
        <SelectField
          options={addressData.provinces || []}
          placeholder="Chọn tỉnh/thành phố"
          value={editedEmployee.province}
          onChange={(value) => handleInputChange({ target: { name: "province", value } })}
        />
        <SelectField
          options={addressData.districts || []}
          placeholder="Chọn quận/huyện"
          value={editedEmployee.district}
          onChange={(value) => handleInputChange({ target: { name: "district", value } })}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>Ngày sinh:</label>
        <DatePickerField
          name="birth_date"
          placeholder="Chọn ngày sinh nhân viên"
          value={editedEmployee.birth_date}
          onChange={(date, dateString) =>
            handleInputChange({ target: { name: "birth_date", value: dateString } })
          }
          className="date-picker"
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>Mô tả:</label>
        <Input.TextArea
          name="description"
          placeholder="Nhập mô tả nhân viên"
          value={editedEmployee.description || ""}
          onChange={handleInputChange}
        />
      </div>
      {/* Thêm các trường nhập khác cho việc chỉnh sửa thông tin nhân viên */}
    </Modal>
  );
};

export default UpdateNhanVien;
