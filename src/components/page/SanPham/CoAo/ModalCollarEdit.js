import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message, Select,Radio } from "antd";
import { useDispatch ,useSelector} from "react-redux";
import { updateCollar } from "../../../../config/CollarApi";

const { TextArea } = Input;

const ModalUpdateCollar = ({ open, closeModal, payload }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [updatedValues, setUpdatedValues] = useState({
    name: "",
    description: "",
    status: ""
  });
  const collars = useSelector((state) => state.collar.collars); // Danh sách cổ áo hiện tại trong trạng thái Redux

  useEffect(() => {
    form.setFieldsValue({
      code: payload.code,
      name: payload.name,
      description: payload.description,
      status: payload.status
    });
    setUpdatedValues({
      ...updatedValues,
      name:payload.name,
      description:payload.description,
      status: payload.status
    });
  }, [form, payload]);

  const handleValuesChange = (_, allValues) => {
    setUpdatedValues({
      ...updatedValues,
      name: allValues.name,
      description: allValues.description,
      status: allValues.status
    });
  };
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await form.validateFields();
      const isDuplicate = collars.some((collar) => collar.name === updatedValues.name && collar.code !== payload.code);
      if (isDuplicate) {
        message.error("Tên cổ áo đã tồn tại trong danh sách.");
        return;
      }
      
    
      await dispatch(updateCollar({ ...payload, ...updatedValues }));
      message.success("Collar updated successfully");
      closeModal();
      
      form.resetFields();
    } catch (error) {
      message.error("Please fill in all required fields");
    } finally {
      // closeModal();
      // form.resetFields();
      setConfirmLoading(false);
      
    }
  };

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  return (
    <Modal
      title="Cập Nhật Cổ Áo"
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
        <Form.Item label="Mã" name="code" >
          <Input disabled />
        </Form.Item>
        <Form.Item label="Tên" name="name" 
         rules={[
    {
      required: true,
      message: 'Vui lòng nhập mô tả cổ áo!',
    },
  ]}
  >
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả" name="description"  rules={[
    {
      required: true,
      message: 'Vui lòng nhập mô tả cổ áo!',
    },
  ]}>
          <TextArea />
        </Form.Item>
        <Form.Item label="Trạng thái" name="status">
          <Radio.Group>
            <Radio value={1}>Hoạt động</Radio>
            <Radio value={0}>Không hoạt động</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateCollar;