import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Radio } from "antd";

const UpdateKhachHang = ({ visible, onCancel, onEdit, customer }) => {
  const [editedCustomer, setEditedCustomer] = useState(customer || {});

  useEffect(() => {
    // Reset editedCustomer state when the customer prop changes
    setEditedCustomer(customer || {});
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({ ...editedCustomer, [name]: value });
  };

  const handleGenderChange = (e) => {
    setEditedCustomer({ ...editedCustomer, gender: e.target.value });
  };

  const handleEdit = () => {
    // Perform validation if necessary

    // Call the onEdit function with the edited customer data
    onEdit(editedCustomer);

    // Close the modal
    onCancel();
  };

  return (
    <Modal
      title="Edit Customer"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="edit" type="primary" onClick={handleEdit}>
          Edit
        </Button>,
      ]}
    >
      <div style={{ marginBottom: "16px" }}>
        <label>Username:</label>
        <Input
          name="username"
          value={editedCustomer.username || ""}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>Name:</label>
        <Input
          name="name"
          value={editedCustomer.name || ""}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>Phone:</label>
        <Input
          name="phone"
          value={editedCustomer.phone || ""}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>Gender:</label>
        <Radio.Group
          name="gender"
          onChange={handleGenderChange}
          value={editedCustomer.gender || "0"}
        >
          <Radio value="0">Nam</Radio>
          <Radio value="1">Nữ</Radio>
        </Radio.Group>
      </div>
      {/* Add other input fields for editing */}
    </Modal>
  );
};

export default UpdateKhachHang;
