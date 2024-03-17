// Modal.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addColor } from '../../../../config/ColorApi';
import { Button, Modal, Form, Input, Select, ColorPicker, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;

const ModalColor = ({ isOpen, onCancel1 }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [createtime, setCreateTime] = useState('2022-01-01');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [description, setDescription] = useState('')
  const [form] = Form.useForm();
  const onCancel12 = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setStatus(parseInt(value));
    } else if (name === "code") {
      setCode(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }

  };

  const handleCancel = () => {
    onCancel1();
    form.resetFields();
  };
  const handleOk = async () => {
    try {
      form.validateFields().then(async (values) => {
        const formData = {
          code: code,
          name: name,
          createdBy: 1,
          updated_by: 1,
          status: 1,
          description: description
        };
        setConfirmLoading(true);
        dispatch(addColor(formData));

        message.success("Thêm màu thành công");
        onCancel1();

        form.resetFields();
      }).catch((error) => {

        message.error('Vui lòng điền đầy đủ thông tin bắt buộc.');
      });
    } catch (error) {
      onCancel1();
      message.error(error.message || "Thêm màu không thành công");
    } finally {
      setConfirmLoading(false);
    }
  }



  return (
    <>
      <Modal title="Thêm màu"
        open={isOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        footer={[
          <Button type="primary" htmlType="submit" onClick={handleOk}>
            Thêm
          </Button>,
          <Button type="primary" onClick={handleCancel}>
            Canel
          </Button>]}
      >
        <Form

          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >


          <Form.Item
            label="Mã màu"
            name="code"
            value={code}
            onChange={handleInputChange}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã màu"
              },

            ]}
          >
            <ColorPicker showText onChange={(color) => setCode(color.toHexString())} />

          </Form.Item>

          <Form.Item
            label="Tên màu"
            name="name"
            value={name}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên màu',
              },
            ]}
          >
            <Input required value={name} onChange={(e) => handleInputChange({ target: { name: 'name', value: e.target.value } })} />


          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            value={description}
          >
            <TextArea value={description} onChange={(e) => handleInputChange({ target: { name: 'description', value: e.target.value } })} />


          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >

          </Form.Item>
        </Form>


      </Modal>
    </>
  );
};

export default ModalColor;
