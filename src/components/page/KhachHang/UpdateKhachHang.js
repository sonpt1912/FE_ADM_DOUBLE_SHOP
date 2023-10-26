import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Radio, message } from "antd";

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

  const handleStatusChange = (e) => {
    setEditedCustomer({ ...editedCustomer, status: e.target.value });
  };

  const showConfirmModal = () => {
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật thông tin khách hàng này?",
      onOk: () => {
        if (editedCustomer.status === "1") {
          Modal.confirm({
            title: "Xác nhận ngưng hoạt động",
            content: "Bạn có chắc chắn muốn ngưng hoạt động khách hàng này? Sau khi ngưng hoạt động, thông tin của khách hàng sẽ bị ẩn.",
            onOk: handleEdit,
          });
        } else {
          handleEdit();
        }
      },
    });
  };

  const handleEdit = () => {
    // Perform validation if necessary

    // Call the onEdit function with the edited customer data
    onEdit(editedCustomer);

    // Close the modal
    onCancel();

    // Hiển thị thông báo cập nhật thành công
    message.success("Cập nhật thông tin khách hàng thành công");
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
        <Button key="edit" type="primary" onClick={showConfirmModal}>
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
      <div style={{ marginBottom: "16px" }}>
        <label>Trạng Thái:</label>
        <Radio.Group
          name="status"
          onChange={handleStatusChange}
          value={editedCustomer.status || "0"}
        >
          <Radio value="0">Hoạt Động</Radio>
          <Radio value="1">Ngừng Hoạt Động</Radio>
        </Radio.Group>
      </div>
      {/* Add other input fields for editing */}
    </Modal>
  );
};

export default UpdateKhachHang;
