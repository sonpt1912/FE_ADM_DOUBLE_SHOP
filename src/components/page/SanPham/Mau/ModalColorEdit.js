// ModalColorUpdate.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, Select, ColorPicker } from 'antd';
import { detailColor, updateColor } from '../../../../store/slice/MauReducer';
const { Option } = Select;

// ... Import statements

const ModalColorUpdate = ({ isOpen, onCancel1, onUpdateComplete, colors }) => {
  const dispatch = useDispatch();
  
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [createtime, setCreateTime] = useState('');

  useEffect(() => {
    console.log("colors:", colors);
    if (colors) {
      setCode(colors.code);
      setName(colors.name);
      setStatus(colors.status); // Ensure status is a string
      setDescription(colors.description);
      console.log("id", colors.id)
    }
  }, [colors]);


  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    const { name, value } = e.target;
  
    if (name === "status") {
      setStatus(parseInt(value));
    } else if (name === "code") {
      setCode(value);
    } else if (name === "name") {
      setName(value);
      console.log("Input changed - Name:", name, "Value:", value);
    } else if(name === "description"){
        setDescription(value);
    }

  };

  const handleOk = async () => {
    const formData = {
      code: code,
      name: name,
      createdBy: 1,
      // updated_by: 1,
      // updatedTime: "",
      createtime: '2022-01-01',
      status: status,
      description: description
    };

    console.log("form:", formData);
    console.log("code", code);
    dispatch(updateColor(formData));
    onCancel1();
};

  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {

    console.log('Failed:', errorInfo);
  };

  return (

<Modal
      title="Update chất liệu"
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
        <ColorPicker showText onChange={(color) => handleInputChange('code', color.toHexString())} value={code} />
        <h4 className="mt-3">Tên màu</h4>
        <Input onChange={(e) => handleInputChange('name', e.target.value)} value={name} />
        <h4 className="mt-3">Mô tả</h4>
        <Input
          name="desciption"
          
         
          onChange={handleInputChange}
          value={description}
        />
        <div className="mt-3 d-flex">
          <h4>Trạng thái</h4>
          <Select className="ms-4" >
            {/* <option disabled value={null}>Chọn trạng thái</option> */}
            <option value={1}>Hoạt động</option>
            <option value={0}>Ngừng hoạt động</option>
          </Select>
        </div>
      </form>
    </Modal>);};

















    {/* <Modal
      visible={isOpen}
      footer={[
        <Button type="primary" htmlType="submit" onClick={handleOk} key="submit">
          Cập nhật
        </Button>,
        <Button type="primary" onClick={onCancel1} key="cancel">
          Hủy
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Mã màu" name="code">
          <ColorPicker showText onChange={(color) => handleInputChange('code', color.toHexString())} />
        </Form.Item>

        <Form.Item label="Tên màu" name="name">
          <Input onChange={(e) => handleInputChange('name', e.target.value)} value={name} />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input onChange={(e) => handleInputChange('description', e.target.value)} value={description} />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
          <Select value={status} onChange={(value) => handleInputChange('status', value)}>
            <Option value="1">Hoạt động</Option>
            <Option value="0">Ngừng hoạt động</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal> */}


export default ModalColorUpdate;
