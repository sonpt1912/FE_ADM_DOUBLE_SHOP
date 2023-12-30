import React, { useState } from "react";
import { Modal, Button, Radio, Input , Form , Select, ColorPicker, theme } from "antd";
import { useDispatch } from "react-redux";
import { addColor } from "../../../../store/slice/ColorSlice";
const { Option } = Select;
const ModalColor = ({ visible, onCancel, onUpdateComplete }) => {
  
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();
  const { token } = theme.useToken();


  const Demo = () => {
    const [open, setOpen] = useState(false);}
  const [color, setColor] = useState(token.colorPrimary);

  
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

  const handleOk = () => {
    const formData = {
      code: code,
      name: name,
      description: description,
      createdBy: 1,
      updated_by: 1,
      createdTime: currentDateTimeString,
      updatedTime: "",
      status: status,
    };
    dispatch(addColor(formData));
    setCode("");
    setName("");
    setDescription("");
    onCancel();
    if (onUpdateComplete) {
      onUpdateComplete(); // Gọi hàm callback từ component cha
    }
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Thêm màu"
      visible={visible}
      onCancel={onCancel}
      // footer={[
      //   <Button key="cancel" onClick={onCancel}>
      //     Cancel
      //   </Button>,
      //   <Button key="ok" type="primary" onClick={handleOk}>
      //     OK
      //   </Button>,
      // ]}
    >
    
    <Form
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
      name="maMau"
      rules={[
          {
            required: true,
          },
        ]}
    >
     <ColorPicker showText />
     
    </Form.Item> 

    <Form.Item
      label="Tên màu"
      name="tenMau"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
        name="gender"
        label="Trạng thái"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          
          // onChange={onGenderChange}
          defaultValue = "dangSuDung"
          allowClear
        >
          <Option value="dangSuDung" >Đang sử dụng</Option>
          <Option value="khongSuDung">Không sử dụng</Option>
          
        </Select>
      </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      {/* <Button type="primary" htmlType="submit">
        Submit
      </Button> */}
    </Form.Item>
  </Form>
    </Modal>
  );
};

export default ModalColor;
