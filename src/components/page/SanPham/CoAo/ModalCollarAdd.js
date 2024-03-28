import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveCollar } from "../../../../config/CollarApi";

const { TextArea } = Input;

const ModalAddCollar = ({ open, closeModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const collars = useSelector((state) => state.collar.collars); // Danh sách cổ áo hiện tại trong trạng thái Redux
  const [payload, setPayload] = useState({
    name: "",
    description: "",
  });
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      // if (!payload.name || payload.name.trim() === "") {
      //   message.error("Vui lòng nhập tên cổ áo.");
      //   return;
      // }
      // if (!payload.description || payload.description.trim() === "") {
      //   message.error("Vui lòng nhập mô tả cổ áo.");
      //   return;
      // }
      await form.validateFields();
      // Kiểm tra trùng tên trong danh sách cổ áo hiện tại
      const isDuplicate = collars.some((collar) => collar.name === payload.name);
      if (isDuplicate) {
        message.error("Tên cổ áo đã tồn tại trong danh sách.");
        return;
      }
      // Thêm cổ áo mới nếu không trùng tên
      await dispatch(saveCollar(payload));
      message.success("Collar added successfully");
      closeModal();
      setPayload({
        name: "",
        description: "",
      });
      form.resetFields();
    } catch (error) {
      message.error("Please fill in all required fields");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setPayload({
      name: "",
      description: "",
    });
    closeModal();
    form.resetFields();
  };

  return (
    <Modal
      title="Thêm Mới Cổ Áo"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 17,
        }}
        style={{
          maxWidth: 1000,
          marginTop: "30px",
        }}
      >
        <Form.Item
          label="Tên"
          name="name"
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên phiếu giảm giá"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          onChange={(e) =>
            setPayload({ ...payload, description: e.target.value })
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên phiếu giảm giá"
            }
          ]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddCollar;
