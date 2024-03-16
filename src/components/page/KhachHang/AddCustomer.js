import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button,message } from "antd";
import AddressApi from "../../../config/AddressApi";
import { useDispatch } from 'react-redux';
import { addCustomer } from "../../../config/CustomerApi";

const AddCustomer = ({ isOpen, onCancel1 }) => {
    const [form] = Form.useForm();
    const addressApi = AddressApi();
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState();
    const [description, setDescription] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    
    
    const [birthday, setBirthday] = useState('')
    
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    
    const [ngo, setNgo] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [rank, setRank] = useState('')
    const [username, setUsername] = useState('')
    

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "phone") {
            setPhone(value);
        }

    
        if (name === "name") {
            setNameError('');
        } else if (name === "email") {
            setEmailError('');
        } else if (name === "phone") {
            setPhoneError('');
        }
    };

    const handleCancel = () => {
        setNameError("");
        setEmailError("");
        setPhoneError("");
        onCancel1();
        form.resetFields();
    };
    const handleOk = async () => {
        try {
            
            form.validateFields().then(async (values) => {
                
                const formData = {
                    name: name,
                    birthday: birthday,
                    gender: 1,
                    phone: phone,
                    ngo: ngo,
                    email: email,
                    createdBy: "ss",
                    updated_by: "aa",
                    status: 1,
                    username: "hai",
                    password: '1',
                    address: [
                        {
                            district: district,
                            province: ward,
                            city: city,
                            description: description,
                        }
                    ]
                };
                setConfirmLoading(true);
                dispatch(addCustomer(formData));
                message.success("Thêm khách hàng thành công");
                // dispatch(fetchCustomer());
                setNameError("");
                setEmailError("");
                setPhoneError("");
                form.resetFields();
                onCancel1();
            }).catch((error) => {
                if (error.errorFields) {
                    error.errorFields.forEach(field => {
                        if (field.name[0] === 'name') {
                            setNameError(field.errors[0]);
                        } else if (field.name[0] === 'email') {
                            setEmailError(field.errors[0]);
                        } else if (field.name[0] === 'phone') {
                            setPhoneError(field.errors[0]);
                        }
                    });
                }else{
                    setNameError("");
                    setEmailError("");
                    setPhoneError("");
                }
            });
        } catch (error) {
            setNameError("");
            setEmailError("");
            setPhoneError("");
            onCancel1();
            message.error(error.message || "Thêm khách hàng không thành công");
        } finally {
            setConfirmLoading(false);
        }
    };

    

    return (
        <div>
            <Modal
                title="Thêm khách hàng"
                visible={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Thêm
                    </Button>,
                    <Button key="cancel" onClick={handleCancel}>
                        Hủy
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Form.Item
                        label="Tên khách hàng"
                        name="name"
                        validateStatus={nameError ? "error" : ""}
                        help={nameError}
                        rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
                    >
                        <Input value={name} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        validateStatus={emailError ? "error" : ""}
                        help={emailError}
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input value={email} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        validateStatus={phoneError ? "error" : ""}
                        help={phoneError}
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input value={phone} onChange={handleInputChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddCustomer;
