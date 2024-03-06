// ModalColorUpdate.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, Select, ColorPicker, message } from 'antd';

import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;



const ModalColorDetail = ({ isOpen, onCancel1, colors }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [createtime, setCreateTime] = useState('');
  const [id, setId] = useState("")
  

  useEffect(() => {
    
    if (colors) {
      setCode(colors.code);
      setName(colors.name);
      setStatus(colors.status); 
      setDescription(colors.description);
      setId(colors.id);
      
    }
  }, [colors]);


  const handleCancel = () => {
    onCancel1();
    form.resetFields();
  };
  

 

  return (

<Modal
      title="Detail màu"
      open={isOpen}
      onCancel={handleCancel}
   
    >
      <form>
        <h4>Mã màu</h4>
        <ColorPicker 
        showText 
        value={code}
        
         />
        <h4 className="mt-3">Tên màu</h4>
        <Input 
       
        value={name}
        
         />
        <h4 className="mt-3">Mô tả</h4>
        <TextArea
          name="desciption"
          
         value={description}
          />
           <h4 className="mt-3">Trạng thái</h4>
          <Input value={status == 1 ? "Hoạt động" : "Ngừng hoạt động"}></Input>
        
      </form>
    </Modal>);};
export default ModalColorDetail;
