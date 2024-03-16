import React, { useState, useEffect } from "react";
import { Space, Input, theme, Table, Collapse, Button, DatePicker, Form, Select, Col, Row, Upload, message, Radio, Modal } from "antd";
import { } from 'antd';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { addCustomer } from "../../../config/CustomerApi";
import { Link } from "react-router-dom";
import AddressApi from "../../../config/AddressApi";
import styled from "styled-components";
const AddCustomer = ({ isOpen, onCancel1, cusAdd }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState();
    const [description, setDescription] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [phone, setPhone] = useState('')
    const [ngo, setNgo] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [rank, setRank] = useState('')
    const [username, setUsername] = useState('')
    const addressApi = AddressApi();


    const [cityData, setCityData] = useState([]);
    const [selectedCity, setSelectedCity] = useState(
        ''
    );
    const [disData, setDisData] = useState([]);
    const [selectedDis, setSelectedDis] = useState(
        ''
    );
    const [selectedWar, setSelectedWar] = useState(
        ''
    );
    const [warData, setWarData] = useState([]);
    const dataCity = async () => {
        try {
            const response = await fetch(`https://vapi.vnappmob.com/api/province`).then((res) => { return res.json() }).then((data) => {
                setCityData(data.results.map(city => ({ label: city.province_name, value: city.province_id })));
            })
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };
    const dataDis = async (selectedCityCode) => {
        try {
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedCityCode}`);
            setDisData(response.data.results.map(city => ({ label: city.district_name, value: city.district_id })));
            
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };
    const dataWar = async (selectedDisCode) => {
        try {
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDisCode}`);
            setWarData(response.data.results.map(city => ({ label: city.ward_name, value: city.ward_id })));
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };
    const handleCityChange = (value) => {
        setSelectedCity(value);

        const selectedCityCode = cityData.find(city => city.value === value)?.value;
        const selectedCityName = cityData.find(city => city.value === value)?.label;
        setCity(selectedCityName);
        addressApi.dataDis(selectedCityCode)
        dataDis(selectedCityCode);
        setSelectedDis("");
    };

    const handleDisChange = (value) => {
        setSelectedDis(value);
        const selectedDisCode = disData.find(dis => dis.value === value)?.value;
        const selectedDisName = disData.find(dis => dis.value === value)?.label;
        setDistrict(selectedDisName);
       dataWar(selectedDisCode);
        setSelectedWar("");
    };

    const handleWarChange = (value) => {
        setSelectedWar(value);
        const selectedWarName = warData.find(war => war.value === value)?.label;
        setWard(selectedWarName);
    };
    useEffect(() => {
        if (isOpen) {
            // Reset form fields when modal opens
            form.resetFields();
        }
    }, [isOpen]);
    useEffect(() => {
        dataCity();
        
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "status") {
            setStatus(parseInt(value));
        } else if (name === "phone") {
            setPhone(value);
        } else if (name === "name") {
            setName(value);
        } else if (name === "birthDay") {
            setBirthday(value.format("MM/DD/YYYY"));

        } else if (name === "email") {
            setEmail(value);
        } else if (name === "gender") {
            setGender(value);
        } else if (name === "city") {
            setCity(value);
        } else if (name === "dis") {
            selectedDis(value);
        } else if (name === "war") {
            setWard(value);
        } else if (name === "ngo") {
            setNgo(value);
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
                form.resetFields();
                onCancel1();
            }).catch((error) => {
                message.error('Vui lòng điền đầy đủ thông tin bắt buộc.');
            });
        } catch (error) {
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
                open={isOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel1={handleCancel}
                width={600}
                footer={[
                    <Button type="primary" htmlType="submit" onClick={handleOk}>
                        Thêm
                    </Button>,
                    <Button type="primary" onClick={handleCancel}>
                        Canel
                    </Button>
                ]
           
                }
            >
                <Form
                    confirmLoading={confirmLoading}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 20 }}
                    labelWrap
                    form={form}
                    name="basic"
                >
                    <Form.Item
                        label="Tên khách hàng"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên',
                            },
                        ]}
                    >
                        <Input value={name} onChange={(e) => handleInputChange({ target: { name: 'name', value: e.target.value } })} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                      
                        style={{ marginTop: '70px' }}
                    >
                        <Input value={email} onChange={(e) => handleInputChange({ target: { name: 'email', value: e.target.value } })} />
                    </Form.Item>
                    <Form.Item
                        label="SDT"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại',
                            },
                        ]}
                        style={{ marginTop: '70px' }}
                    >
                        <Input placeholder="Số điện thoaị" value={phone} onChange={(e) => handleInputChange({ target: { name: 'phone', value: e.target.value } })} />
                    </Form.Item>
                    <Form.Item
                        label="Tỉnh/Thành phố"
                        name="city"

                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn Thành Phố',
                            },
                        ]}
                        style={{ marginTop: '70px' }}
                    >
                        <Select
                            showSearch
                            placeholder="--- Chọn Tỉnh/Thành phố ---"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={cityData}
                            onChange={handleCityChange}
                            value={selectedCity}

                        />

                    </Form.Item>
                    <Form.Item
                        label="Quận/Huyện"
                        name="dis"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn Quận/Huyện!',
                            },
                        ]}
                        style={{ marginTop: '70px' }}
                    >
                        <Select
                            showSearch
                            placeholder="--- Chọn Quận/Huyện ---"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                           
                            options={disData}
                            onChange={handleDisChange}
                            value={selectedDis}

                        />
                    </Form.Item>
                    <Form.Item
                        label="Xã/Phường"
                        name="war"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn Xã/Phường',
                            },
                        ]}
                        style={{ marginTop: '70px' }}

                    >
                        <Select
                            showSearch
                            placeholder="--- Chọn Xã/Phường ---"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={warData}
                            onChange={handleWarChange}
                            value={selectedWar}
                        />
                    </Form.Item>                  
                  


                    <Form.Item
                        label="Số Nhà/Ngõ/Đường"
                        name="ngo"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Số nhà/Ngõ/Đường',
                            },
                        ]}
                        style={{ marginTop: '70px' }}
                    >

                        <Input placeholder="Số nhà/ngõ/đường" value={description} name="description" onChange={(e) => handleInputChange({ target: { name: 'description', value: e.target.value } })} />
                    </Form.Item>
                   
                </Form>

            </Modal>
        </div>



    );
};
export default AddCustomer;