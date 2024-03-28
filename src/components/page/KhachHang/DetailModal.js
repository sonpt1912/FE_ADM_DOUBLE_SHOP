import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Space, Input, theme, Table, Collapse, Button, DatePicker, Form, Select, Col, Row, Upload, message, Radio, Modal, Tabs } from "antd";
import { } from 'antd';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import { addCustomer, detailCustomer, fetchCustomer, getAddress, updateCustomer } from "../../../store/slice/CustomerReducer";

const DetailKhachHang = ({ isOpenDetail, onCancel1, cus }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
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
    const [defaul, setDefaul] = useState("")
    const [username, setUsername] = useState('')
    const [rank, setRank] = useState('')
    const [id1, setId1] = useState('')
 



    // var currentUrl = window.location.href;
    useEffect(() => {
        if (cus) {
            const dis = cus.address.map(addr => addr.district);
            const ward = cus.address.map(addr => addr.province);
            const description = cus.address.map(addr => addr.description);
            const desaul = cus.address.map(addr => addr.defaul);
            setName(cus.name);
            setEmail(cus.email);
            setBirthday(cus.birthday);
            setGender(cus.gender);
            setPhone(cus.phone);
            setNgo(cus.ngo);
            // setPassword(result.payload.password);
            setStatus(cus.status);
            setRank(cus.rank);
            setUsername(cus.username);
            setId1(cus.id)
            const cities = cus.address.map(addr => addr.city);
            setCity(cities);
            setDistrict(dis);
            setWard(ward
            );
            setDescription(description)
            setDefaul(desaul)
          
        }

    }, [cus]);
    
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
        }
        else if (name === "description") {
            setDescription(value);
        }

        // }

    };




    const [activeTab, setActiveTab] = useState("form");

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <Modal
            title="Thông tin"
          onCancel={onCancel1}
            visible={isOpenDetail}
            footer={[
                <Button key="cancel" onClick={onCancel1}>
                    Cancel
                </Button>,
               
            ]}
            
        >
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="Thông tin" key="form">
                    <form>
                                <h4 className="mt-3">Tên khách hàng:{name} </h4>
                               
                                <h4 className="mt-3">Email: {email}</h4>
                                
                                <h4 className="mt-3">Số điện thoại: {phone}</h4>
                    </form>
                </TabPane>
                <TabPane tab="Địa chỉ" style={{width:1000}} >
                     <div >
                        {cus && cus.address.map((a, index) => (  
                            a.description == "" ? "":(
                            <div key={index}>
                                 <h2>Địa chỉ {index + 1}</h2>
                                <p>Thành phố: {a.city}</p>
                                <p>Quận/Huyện: {a.district}</p>
                                <p>Phường/Xã: {a.province}</p>
                                <p>Số nhà: {a.description}</p>
                            </div> )
                        ))}
                    </div> 

                </TabPane>
            </Tabs>
        </Modal>
    );




};
export default DetailKhachHang;