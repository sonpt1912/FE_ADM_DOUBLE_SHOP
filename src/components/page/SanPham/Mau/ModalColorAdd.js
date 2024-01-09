// Modal.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addColor } from '../../../../store/slice/MauReducer';
import { Button, Modal,Form, Input,Select , ColorPicker} from 'antd';
import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;

const ModalColor = ({ isOpen, onCancel1, onUpdateComplete }) => {
  const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [createtime , setCreateTime] = useState('2022-01-01');
    const [description, setDescription] = useState('')
    
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
        } else if(name === "description"){
            setDescription(value);
        }

      };
      
    const handleOk = async () => {
          const formData = {
            code: code,
            name: name,
            createdBy: 1,
            updated_by: 1,
            status: 1,
            description: description
          };
      
          console.log("form:", formData);
          console.log("code", code);
          dispatch(addColor(formData));
          onCancel1();
      };
      const [form] = Form.useForm();
      const onFinish = () => {
        console.log("code", code);
        console.log("name", name);
        onCancel1();
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  

  return (
    <>
   
    <Modal title="Thêm màu" 
    visible={isOpen} 

    footer={[
        <Button type="primary" htmlType="submit" onClick={handleOk}>
            Thêm
          </Button>,
          <Button type="primary" onClick={onCancel1}>
            Canel
          </Button>]}
    >
    <Form form={form}
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
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >

 
     <Form.Item

      label="Mã màu"
      name="code"
    //   value={code}
      onChange={handleInputChange}
      rules={[
          {
            required: true,
            message: "Vui lòng nhâpj mã màu"
          },
        ]}
    >
     <ColorPicker  showText onChange={(color) => setCode(color.toHexString())}   />
     
    </Form.Item> 

    <Form.Item
      label="Tên màu"
      name="name"
      value = {name}
    

      rules={[
        {
          required: true,
          message: 'Vui lòng nhập tên màu',
        },
      ]}
    >
      <Input value={name} onChange={(e) => handleInputChange({ target: { name: 'name', value: e.target.value } })} />
          
          
    </Form.Item>
    <Form.Item
      label="Mô tả"
      name="description"
      value = {description}
    >
      <TextArea  value={description} onChange={(e) => handleInputChange({ target: { name: 'description', value: e.target.value } })} />
          
          
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
