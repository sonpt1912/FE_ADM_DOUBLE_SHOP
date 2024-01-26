import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, Select, ColorPicker, message } from 'antd';
import { detailCollar,updateCollar } from '../../../../store/slice/CollarReducer';
import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;



const ModalCollarDetail = ({ isOpen, onCancel1, collars }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [createtime, setCreateTime] = useState('');
  const [id, setId] = useState("")
  

  useEffect(() => {
    
    if (collars) {
      setCode(collars.code);
      setName(collars.name);
      setStatus(collars.status); 
      setDescription(collars.description);
      setId(collars.id);
      
    }
  }, [collars]);


  const handleCancel = () => {
    onCancel1();
    form.resetFields();
  };
  

 

  return (

<Modal
      title="Detail cổ áo"
      open={isOpen}
      onCancel={handleCancel}
   
    >
      <form>
        <h4>Mã cổ áo</h4>
        <Input 
        showText 
        value={code}
        
         />
        <h4 className="mt-3">Tên cổ áo</h4>
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
export default ModalCollarDetail;