// ModalColorUpdate.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, Select, ColorPicker, message, Radio } from 'antd';

import TextArea from 'antd/es/input/TextArea';
import { addCustomerAddress } from '../../../config/CustomerApi';

import axios from "axios";
const { Option } = Select;

const ModalAddAddress = ({ isOpen, onCancel1, dataAdd }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [ngo, setNgo] = useState('')
    const [description, setDescription] = useState('');
    const [defaul, setDefaul] = useState(1)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [id, setId] = useState('')
    const [idAdd, setIdAdd] = useState('')
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

        if (name === "city") {
            setCity(value);
        } else if (name === "dis") {
            selectedDis(value);
        } else if (name === "war") {
            setWard(value);
        } else if (name === "ngo") {
            setNgo(value);
        } else if (name === "description") {
            setDescription(value);
         

        }else if (name === "defaul") {
            setDefaul(parseInt(value));
        }

    };
    const handleOk = async () => {
        if (!city || !district || !ward || !description) {
            message.error('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        try {
            const formData = {
                id: id,
                createdBy: "ss",
                updated_by: "aa",
                status: 1,
                updated_time: '2024-10-10',
                district: district,
                province: ward,
                city: city,
                description: description,
                defaul: defaul

            };
            console.log(formData)
            await dispatch(addCustomerAddress(formData));
            message.success("Thêm địa chỉ thành công");
            form.resetFields();
            onCancel1();
        } catch (error) {
            onCancel1();
            message.error("Thêm địa chỉ không thành công");
        } finally {
            onCancel1();
            form.resetFields();
            setConfirmLoading(false);
        }

    }
    useEffect(() => {

        if (dataAdd) {

            setId(dataAdd.id)


        }

    }, [dataAdd]);




    return (

        <Modal
            title="Thêm địa chỉ"
            visible={isOpen}
            footer={[
                <Button key="cancel" onClick={onCancel1}>
                    Cancel
                </Button>,
                <Button key="ok" type="primary"
                    onClick={handleOk}
                >
                    OK
                </Button>,
            ]}
        >
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
                    onChange={handleCityChange}
                    value={selectedCity}

                />
                <h4 className="mt-3">Huyện</h4>
                <Select
                    style={{ width: '100%' }}
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
                    onChange={handleWarChange}
                    value={selectedWar}
                />
                <h4 className="mt-3">Số nhà/ngõ/đường</h4>
                <Input
                    name="description"
                    value={description}
                    onChange={(e) => handleInputChange({ target: { name: 'description', value: e.target.value } })}
                />
    

            </form>
        </Modal>);
};
export default ModalAddAddress;
