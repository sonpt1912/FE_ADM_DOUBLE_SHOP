import React, { useState, useEffect } from "react";
import { Space, Input, theme, Table, Collapse, Button, DatePicker, Form, Select, Col, Row, Upload, message, Radio } from "antd";
import { } from 'antd';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchCustomer, getAddress } from "../../../store/slice/KhachHangReducer";
const AddKhachHang = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
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
            const response = await axios.get(`https://vapi.vnappmob.com/api/province`);
            setCityData(response.data.results.map(city => ({ label: city.province_name, value: city.province_id }))); 
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };
    const dataDis = async (selectedCityCode) => {
        try {
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedCityCode}`);
            setDisData(response.data.results.map(city => ({ label: city.district_name, value: city.district_id })));
            console.log("dis", disData)
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };
    const dataWar = async (selectedDisCode) => {
        try {
            console.log("1", selectedDisCode)
            console.log("aa", disData)
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDisCode}`);
            setWarData(response.data.results.map(city => ({ label: city.ward_name, value: city.ward_id })));
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };
    const handleCityChange =  (value) => {
        setSelectedCity(value);
        const selectedCityCode = cityData.find(city => city.value === value)?.value;
        dataDis(selectedCityCode);
        setSelectedDis(value);
        console.log(disData)
        const selectedWarCode = disData.find(city => city.value === value)?.value;
        dataWar(selectedWarCode)
    };
   
    useEffect(() => {
        dataCity();
        


    }, []);
    return (
        <Form
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 18 }}
            labelWrap

        >
            <Row gutter={16}>
                <Col span={4}>
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}

                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '500px',
                                    height: '500px'
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Col>
                <Col span={10}>
                    <Form.Item
                        label="Tên khách hàng"
                        name="username"
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
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        style={{ marginTop: '70px' }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tỉnh/Thành phố"
                        name="city"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
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
                        label="Xã/Phường"
                        name="war"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
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
                            onChange={handleCityChange}

                            value={selectedWar}
                        />
                    </Form.Item>


                </Col>
                <Col span={10}>
                    <Form.Item
                        label="Ngày sinh"
                        name="username1"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}

                    >
                        <DatePicker placeholder="dd/mm/yyyy" />

                    </Form.Item>

                    <Form.Item
                        label="Giới Tính"
                        name="username1"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        style={{ marginTop: '70px' }}
                    >
                        <Radio.Group >
                            <Radio checked>A</Radio>
                            <Radio value={1}>B</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="SDT"
                        name="sdt"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        style={{ marginTop: '70px' }}
                    >
                        <Input placeholder="Số điện thoaị" />
                    </Form.Item>
                    <Form.Item
                        label="Quận/Huyện"
                        name="dis"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        style={{ marginTop: '70px' }}
                    >
                        <Select
                            showSearch
                            placeholder="--- Chọn Quận/Huyện ---"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            // filterSort={(optionA, optionB) =>
                            //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            // }
                            options={disData}
                            onChange={handleCityChange}
                            value={selectedDis}

                        />
                    </Form.Item>


                    <Form.Item
                        label="Số Nhà/Ngõ/Đường"
                        name="username1"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        style={{ marginTop: '70px' }}
                    >

                        <Input placeholder="Số nhà/ngõ/đường" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
export default AddKhachHang;