import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Radio } from "antd";

const UpdateNhanVien = ({ visible, onCancel, onEdit, employee }) => {
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });

  useEffect(() => {
    // Reset editedEmployee state when the employee prop changes
    setEditedEmployee({ ...employee });
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleGenderChange = (e) => {
    setEditedEmployee({ ...editedEmployee, gender: e.target.value });
  };

  const handleEdit = () => {
    // Perform validation if necessary

    // Call the onEdit function with the edited employee data
    onEdit(editedEmployee);

    // Close the modal
    onCancel();
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
      {/* Thêm các trường nhập khác cho việc chỉnh sửa */}
    </Modal>
  );
};

export default UpdateNhanVien;
