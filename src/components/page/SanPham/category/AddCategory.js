import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { saveCategory } from "../../../../config/CategoryApi";

const { TextArea } = Input;

const ModalAddCategory = ({ open, closeModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [payload, setPayload] = useState({
    name: "",
    description: "",
  });

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await dispatch(saveCategory(payload));
      message.success("Category added successfully");
      closeModal();
      setPayload({
        name: "",
        description: "",
      });
      form.resetFields();
    } catch (error) {
      message.error("Failed to add category");
    } finally {
      closeModal();
      form.resetFields();

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
      title="Thêm Mới Loại Sản Phẩm"
      open={open}
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
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          onChange={(e) =>
            setPayload({ ...payload, description: e.target.value })
          }
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddCategory;
