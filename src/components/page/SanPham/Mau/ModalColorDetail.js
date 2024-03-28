// ModalColorUpdate.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  ColorPicker,
  message,
  Radio,
} from "antd";

import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

const ModalColorDetail = ({ isOpen, onCancel1, colors }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (colors) {
      setCode(colors.code);
      setName(colors.name);
      setStatus(colors.status);
      setDescription(colors.description);
      setId(colors.id);
      setColor(colors.code);
    }
  }, [colors]);

  const handleCancel = () => {
    onCancel1();
    form.resetFields();
  };

  return (
    <Modal title="Detail màu" open={isOpen} onCancel={handleCancel}>
    <form style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4>Mã màu: </h4>
        <button style={{ background: code, height: "30px", width: "50px", marginLeft: "20px" }}></button>
        <p style={{ marginLeft: "10px" }}>{code}</p>
      </div>

      <h4 className="mt-3">Tên màu: {name}</h4>

      <h4 className="mt-3">Mô tả: {description}</h4>

      <h4 className="mt-3">
        Trạng thái:
        {status === 1 ? "\t Hoạt động" : "\tNgừng Hoạt động"}
      </h4>
    </form>
    </Modal>
  );
};
export default ModalColorDetail;
