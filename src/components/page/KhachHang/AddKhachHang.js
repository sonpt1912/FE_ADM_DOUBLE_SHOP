import React, { useState, useEffect } from "react";
import { Space, Input, theme, Table, Collapse, Button, DatePicker, Form, Select, Col, Row, Upload, message, Radio } from "antd";
import { } from 'antd';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { addCustomer, fetchCustomer, getAddress } from "../../../store/slice/KhachHangReducer";
import { Link } from "react-router-dom";
const AddKhachHang = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState();
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

    const handleCityChange = (value) => {
        setSelectedCity(value);
        const selectedCityCode = cityData.find(city => city.value === value)?.value;
        const selectedCityName = cityData.find(city => city.value === value)?.label;
        setCity(selectedCityName);
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
            setBirthday(value);
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
        }

    };
    const handleOk = async () => {
        try {
            const formData = {
                name: name,
                birthday: birthday,
                district: district,
                ward: ward,
                city: city,
                gender: 1,
                phone: phone,
                ngo: ngo,
                email: email,
                createdBy: "ss",
                updated_by: "aa",
                status: 1,
                username: "hai",
                password: '1'

            };
            setConfirmLoading(true);
            await dispatch(addCustomer(formData));
            console.log("form", formData)
            message.success("Thêm màu thành công");
            form.resetFields();

        } catch (error) {
            message.error("Failed to add size");
        } finally {

            form.resetFields();

            setConfirmLoading(false);
        }

    }
    return (
        <div>
            <Form
                confirmLoading={confirmLoading}
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 18 }}
                labelWrap
                form={form}
                name="basic"
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
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhap ten',
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
                            label="Tỉnh/Thành phố"
                            name="city"

                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your username!',
                            //     },
                            // ]}
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
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your username!',
                            //     },
                            // ]}
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


                    </Col>
                    <Col span={10}>
                        <Form.Item
                            label="Ngày sinh"
                            name="birthDay"


                        >
                            <DatePicker placeholder="dd/mm/yyyy" value={birthday} onChange={(e) => handleInputChange({ target: { name: 'birthDay', value: e.target.value } })} />

                        </Form.Item>

                        <Form.Item
                            label="Giới Tính"
                            name="gender"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your username!',
                            //     },
                            // ]}
                            style={{ marginTop: '70px' }}
                        >
                            <Radio.Group >
                                <Radio checked>A</Radio>
                                <Radio value={1}>B</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="SDT"
                            name="phone"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your username!',
                            //     },
                            // ]}
                            style={{ marginTop: '70px' }}
                        >
                            <Input placeholder="Số điện thoaị" value={phone} onChange={(e) => handleInputChange({ target: { name: 'phone', value: e.target.value } })} />
                        </Form.Item>
                        <Form.Item
                            label="Quận/Huyện"
                            name="dis"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your username!',
                            //     },
                            // ]}
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
                                onChange={handleDisChange}
                                value={selectedDis}

                            />
                        </Form.Item>


                        <Form.Item
                            label="Số Nhà/Ngõ/Đường"
                            name="ngo"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your username!',
                            //     },
                            // ]}
                            style={{ marginTop: '70px' }}
                        >

                            <Input placeholder="Số nhà/ngõ/đường" value={ngo} onChange={(e) => handleInputChange({ target: { name: 'ngo', value: e.target.value } })} />
                        </Form.Item>
                    </Col>

                </Row>
                <Button type="primary" htmlType="submit" onClick={handleOk} >
                Thêm
            </Button>
            </Form>
            <Button type="primary" htmlType="submit" onClick={handleOk} >
                Thêm
            </Button>
            <Button type="primary" htmlType="submit" >
                Huỷ
            </Button>
        </div>

        // * <form>
        // <Button type="primary" htmlType="submit" onClick={handleOk} >
        //                 Thêm
        //             </Button>\ <Button type="primary" htmlType="submit" >
        //                 Huỷ
        //             </Button>
        // </form> *
    );
};
export default AddKhachHang;