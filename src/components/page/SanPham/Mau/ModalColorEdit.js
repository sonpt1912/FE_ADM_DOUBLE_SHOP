// ModalColorUpdate.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, Select, ColorPicker, message } from 'antd';
import { updateColor } from '../../../../config/ColorApi';
import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;



const ModalColorUpdate = ({ isOpen, onCancel1, colors }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [createtime, setCreateTime] = useState('');
  const [id, setId] = useState("")
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (colors) {
      setCode(colors.code);
      setName(colors.name);
      setStatus(colors.status);
      setDescription(colors.description);
      setId(colors.id);
    }
  }, [colors]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setStatus(parseInt(value));
    }
    else if (name === "code") {
      setCode(value);
    }
    else if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };
  const handleOk = async () => {
    if (!name || !code || !description ) {
      message.error('Vui lòng điền đầy đủ thông tin.');
      return;
  }
    try {
      const formData = {
        code: code,
        name: name,
        id: id,
        createdBy: 1,
        updated_by: 1,
        status: 1,
        description: description
      };
      setConfirmLoading(true);
      await dispatch(updateColor(formData));
      message.success("Sửa màu thành công");
      onCancel1();
      form.resetFields();
    } catch (error) {
      message.error("Sửa màu không thành công");
    } finally {
      onCancel1();
      form.resetFields();
      setConfirmLoading(false);
    }
  }
  return (

    <Modal
      title="Update Màu"
      visible={isOpen}
      footer={[
        <Button key="cancel" onClick={onCancel1}>
          Cancel
        </Button>,
        <Button key="ok" type="primary"
          onClick={handleOk}
        >
          OK
        </Button>,
      ]}
    >
      <form>
        <h4>Mã màu</h4>
        <ColorPicker
          showText
          value={code}
          disabled />
        <h4 className="mt-3">Tên màu</h4>
        <Input

          value={name}
          onChange={(e) => handleInputChange({ target: { name: 'name', value: e.target.value } })} />
        <h4 className="mt-3">Mô tả</h4>
        <TextArea
          name="desciption"
          value={description}
          onChange={(e) => handleInputChange({ target: { name: 'description', value: e.target.value } })} />

      </form>
    </Modal>);
};
export default ModalColorUpdate;
