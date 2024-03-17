import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";


import { updateBrand } from "../../../../config/BrandApi";

const { TextArea } = Input;

const ModalUpdateBrand = ({ open, closeModal, payload }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [updatedValues, setUpdatedValues] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    form.setFieldsValue({
      code: payload.code,
      name: payload.name,
      description: payload.description,
      status: payload.status,
    });
  }, [form, payload]);

  const handleValuesChange = (_, allValues) => {
    setUpdatedValues({
      name: allValues.name,
      description: allValues.description,
    });
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await dispatch(updateBrand({ ...payload, ...updatedValues }));
      message.success("Brand updated successfully");
      closeModal();
      form.resetFields();
    } catch (error) {
      message.error("Failed to update brand");
    } finally {
      closeModal();
      form.resetFields();
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  return (
    <Modal
      title="Cập Nhật Kích Cỡ"
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
        onValuesChange={handleValuesChange}
      >
        <Form.Item label="Mã" name="code">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Tên" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateBrand;
