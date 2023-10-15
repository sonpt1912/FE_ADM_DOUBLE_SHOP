import React from "react";
import { Modal, Descriptions } from "antd";

const ViewNhanVien = ({ visible, onCancel, employee }) => {
  if (!employee) {
    return (
      <Modal
        title="Chi Tiết Nhân Viên"
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        Không có thông tin nhân viên để hiển thị.
      </Modal>
    );
  }

  return (
    <Modal
      title="Chi Tiết Nhân Viên"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Code">{employee.code || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Họ và Tên">{employee.name || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Điện Thoại">{employee.phone || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Giới Tính">{employee.gender === "0" ? "Nam" : "Nữ"}</Descriptions.Item>
        <Descriptions.Item label="Ngày Sinh">{employee.birth_date || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Vai Trò">{employee.role || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Trạng Thái">{employee.status === "0" ? "Hoạt Động" : "Dừng Hoạt Động"}</Descriptions.Item>
        <Descriptions.Item label="Địa Chỉ">{employee.address || "N/A"}</Descriptions.Item>
        {/* Thêm các thông tin khác vào đây */}
      </Descriptions>
    </Modal>
  );
};

export default ViewNhanVien;
