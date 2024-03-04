import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Space, Input, theme, Table, Collapse, Button, DatePicker, Form, Select, Col, Row, Upload, message, Radio, Modal, Tabs } from "antd";
import { ProfileFilled, FilterFilled, EyeFilled, EditFilled, DeleteFilled, } from "@ant-design/icons";
import { } from 'antd';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { addCustomer, detailCustomer, fetchCustomer, getAddress, updateCustomer, updateCustomerAddress ,detailCustomerAddress} from "../../../store/slice/KhachHangReducer";
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import ModalUpdateAddress from "./ModalUpdateAddress";


const UpdateKhachHang = ({ isOpen, onCancel1, cusUpdate, cusAddress }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

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
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('')
    const [rank, setRank] = useState('')
    const [username, setUsername] = useState('')
    const [id1, setId1] = useState('')
    const [id, setId] = useState('')
    
    



    // var currentUrl = window.location.href;
    useEffect(() => {

        if (cusUpdate) {
            const dis = cusUpdate.address.map(addr => addr.district);
            const ward = cusUpdate.address.map(addr => addr.province);
            const description = cusUpdate.address.map(addr => addr.description);
            setName(cusUpdate.name);
            setEmail(cusUpdate.email);
            setBirthday(cusUpdate.birthday);
            setGender(cusUpdate.gender);
            setPhone(cusUpdate.phone);
            setNgo(cusUpdate.ngo);
            // setPassword(result.payload.password);
            setStatus(cusUpdate.status);
            setRank(cusUpdate.rank);
            setUsername(cusUpdate.username);
            setId1(cusUpdate.id)
            setId(cusUpdate.id)
          
            const cities = cusUpdate.address.map(addr => addr.city);
            setCity(cities);
            setDistrict(dis);
            setWard(ward
            );
            setDescription(description)

        }

    }, [cusUpdate]);



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
            setDistrict(value);
        } else if (name === "war") {
            setWard(value);
        } else if (name === "ngo") {
            setNgo(value);
        } else if (name === "description") {
            setDescription(value);
            

        }

    };
    //
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const [cusData, setCusData] = useState();
    const openModalDetail = async (id) => {
        const response = await dispatch(detailCustomer(id));
        setCusData(response.payload);
        setIsModalOpenDetail(true);
    };
    const closeModalDetail = () => {
        setIsModalOpenDetail(false);
    };

    const handleOk = async () => {
        if (!name || !phone ) {
            message.error('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        try {
            const formData = {
                id: id1,
                name: name,
                birthday: birthday,
                gender: 1,
                phone: phone,
                ngo: ngo,
                email: email,
                createdBy: "ss",
                updated_by: "aa",
                status: 1,
            };
            setConfirmLoading(true);
            await dispatch(updateCustomer(formData));
            onCancel1()
            message.success("Sửa khách hàng thành công");
            form.resetFields();

        } catch (error) {
            message.error("Sửa khách hàng thất bại");
            onCancel1()
        } finally {
            onCancel1();
            form.resetFields();
            setConfirmLoading(false);
        }

    }




    const [cityData, setCityData] = useState([]);
 
    const [disData, setDisData] = useState([]);
    const [warData, setWarData] = useState([]);

   

    // const handleCityChange = (value, index) => {
    //     const selectedCityName = cusUpdate.address[index]?.city;
    //     const selectedCityCode = cityData.find(city => city.value === value)?.selectedCityName;
    //     // const selectedCityName = cityData.find(city => city.value === value)?.label;
    //     const selectedDisCode = disData.find(dis => dis.value === value)?.value;
    //     const selectedDisName = disData.find(dis => dis.value === value)?.label;
    //     const selectedWarName = warData.find(war => war.value === value)?.label;

    //     setCity(selectedCityName);
     
    //     setSelectedDis(selectedCityCode);
    //     dataDis(value);
    //     setDistrict(selectedDisName);
     
    //     setSelectedWar(selectedDisCode);
    //     setWard(selectedWarName);
    //     dataWar(value);

    // };




    // useEffect(() => {
        // dataCity();
        // dataDis();
        // dataWar();
        // console.log("id1 real", id1)
    // }, []);

    const [activeTab, setActiveTab] = useState("form");

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const [isModalUpdateAddress, setIsModalUpdateAddress] = useState(false);
    const [cusDataUpdateAddress, setCusDataUpdateAddress] = useState();
   
    const openModalUpdateAddress = async (id1, id) => {
    
        try {
            const response = await dispatch(detailCustomerAddress({id1, id}));
            setCusDataUpdateAddress(response.payload);
            setIsModalUpdateAddress(true);
            onCancel1()
        } catch (error) {
            
            console.error("Error fetching customer address:", error);
        }
    };
    
    
   
    const closeModalUpdateAddress = () => {
        setIsModalOpenDetail(true);
        setIsModalUpdateAddress(false);
    };

    return (
        <div>
            <ModalUpdateAddress
                isOpen={isModalUpdateAddress}
                onCancel1={closeModalUpdateAddress}
                dataUpdate={cusDataUpdateAddress}
                idCus={id1}
            />


            <Modal
                title="Update khách hàng"
                visible={isOpen}
                footer={[
                    <Button key="cancel" onClick={onCancel1}>
                        Cancel
                    </Button>,
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}

            >
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab="Thông tin" key="form">
                        <form>

                                    <h4 className="mt-3">Tên khách hàng</h4>
                                    <Input value={name} onChange={(e) => handleInputChange({ target: { name: 'name', value: e.target.value } })} />
                                    <h4 className="mt-3">Email</h4>
                                    <Input value={email} onChange={(e) => handleInputChange({ target: { name: 'email', value: e.target.value } })} />
                                    <h4 className="mt-3">Số điện thoại</h4>
                                    <Input placeholder="Số điện thoaị" value={phone} onChange={(e) => handleInputChange({ target: { name: 'phone', value: e.target.value } })} />

                        </form>
                    </TabPane>
                    <TabPane tab="Địa chỉ" >
                        <div>
                            {cusAddress && cusAddress && cusAddress.map((b, index) => (
                                <div key={index}>
                                    <h2>Địa chỉ {index + 1}</h2>
                                    <form>
                                        <h4>Thành phố</h4>
                                        <Select
                                            style={{ width: '100%' }}
                                            showSearch
                                            placeholder="--- Chọn Tỉnh/Thành phố ---"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={cityData}
                                            // onChange={(value) => handleCityChange(value, index)}
                                            value={b.city}
                                        />
                                        <h4 className="mt-3">Huyện</h4>
                                        <Select
                                            style={{ width: '100%' }}
                                            showSearch
                                            placeholder="--- Chọn Quận/Huyện ---"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            options={disData}
                                            // onChange={handleCityChange}
                                            value={b.district}

                                        />

                                        <h4 className="mt-3">Xã</h4>
                                        <Select
                                            style={{ width: '100%' }}
                                            showSearch
                                            placeholder="--- Chọn Xã/Phường ---"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={warData}
                                            value={b.province}
                                        />
                                        <h4 className="mt-3">Số nhà/ngõ/đường</h4>
                                        <Input name="description" value={description} onChange={(e) => handleInputChange({ target: { name: 'description', value: e.target.value } })} />
                                        
                                    </form>
                                    <h4 className="mt-3"></h4>
                                    <EditFilled style={{ fontSize: '23px' }} onClick={() => openModalUpdateAddress(id1,b.id)} ></EditFilled>


                                </div>
                            ))}


                        </div>
                    </TabPane>
                </Tabs>
            </Modal>


        </div>


    );




};
export default UpdateKhachHang;