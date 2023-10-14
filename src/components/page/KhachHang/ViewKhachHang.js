import React from "react";
import { Modal, Descriptions } from "antd";

const ViewKhachHang = ({ visible, onCancel, customer }) => {
  // Kiểm tra xem customer có giá trị không trước khi truy cập thuộc tính của nó
  if (!customer) {
    // Nếu customer không có giá trị, hiển thị modal trống
    return (
      <Modal
        title="Chi Tiết Khách Hàng"
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        Không có thông tin khách hàng để hiển thị.
      </Modal>
    );
  }

  return (
    <Modal
      title="Chi Tiết Khách Hàng"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Username">{customer.username || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Họ và Tên">{customer.name || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Điện Thoại">{customer.phone || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Giới Tính">{customer.gender === "0" ? "Nam" : "Nữ"}</Descriptions.Item>
        <Descriptions.Item label="Ngày Sinh">{customer.birth_date || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Trạng Thái">{customer.status === "0" ? "Hoạt Động" : "Dừng Hoạt Động"}</Descriptions.Item>
        {/* Thêm các thông tin khác vào đây */}
      </Descriptions>
    </Modal>
  );
};

export default ViewKhachHang;
