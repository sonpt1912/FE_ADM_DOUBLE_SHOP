import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Select, message, DatePicker, InputNumber } from "antd";
import axios from "axios";
import { createEmployee } from "../../../config/NhanVienApi";

const { Option } = Select;
const { TextArea } = Input;

const ModalAddNhanVien = ({ open, closeModal }) => {
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [cityData, setCityData] = useState([]);
  const [disData, setDisData] = useState([]);
  const [warData, setWarData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDis, setSelectedDis] = useState("");
  const [selectedWar, setSelectedWar] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [password, setPassword] = useState("");

  const dataCity = async () => {
    try {
      const response = await fetch(
        `https://vapi.vnappmob.com/api/province`
      ).then((res) => res.json());
      setCityData(
        response.results.map((city) => ({
          label: city.province_name,
          value: city.province_id,
        }))
      );
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const dataDis = async (selectedCityCode) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${selectedCityCode}`
      );
      setDisData(
        response.data.results.map((dis) => ({
          label: dis.district_name,
          value: dis.district_id,
        }))
      );
    } catch (error) {
      console.error("Error fetching district data:", error);
    }
  };

  const dataWar = async (selectedDisCode) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${selectedDisCode}`
      );
      setWarData(
        response.data.results.map((war) => ({
          label: war.ward_name,
          value: war.ward_id,
        }))
      );
    } catch (error) {
      console.error("Error fetching ward data:", error);
    }
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    const selectedCityCode = cityData.find(
      (city) => city.value === value
    )?.value;
    const selectedCityName = cityData.find(
      (city) => city.value === value
    )?.label;
    setCity(selectedCityName);
    dataDis(selectedCityCode);
    setSelectedDis("");
    setSelectedWar("");
  };

  const handleDisChange = (value) => {
    setSelectedDis(value);
    const selectedDisCode = disData.find((dis) => dis.value === value)?.value;
    const selectedDisName = disData.find((dis) => dis.value === value)?.label;
    setDistrict(selectedDisName);
    dataWar(selectedDisCode);
    setSelectedWar("");
  };

  const handleWarChange = (value) => {
    setSelectedWar(value);
    const selectedWarName = warData.find((war) => war.value === value)?.label;
    setWard(selectedWarName);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      const payload = {
        username: values.username,
        name: values.name,
        phone: values.phone,
        email: values.email,
        city: city,
        province: ward,
        district: district,
        gender: values.gender,
        password: values.password,
        birthDay: values.birthDay,
        description: values.description,
      };

      await dispatch(createEmployee(payload));

      message.success("Nhân viên được thêm thành công");
      closeModal();
      form.resetFields();
    } catch (error) {
      message.error("Không thể thêm nhân viên");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  useEffect(() => {
    dataCity();
  }, []);

  return (
    <Modal
      title="Thêm Mới Nhân Viên"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập username",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ và tên",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
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
              type: "email",
              message: "Vui lòng nhập đúng định dạng email",
            },
            {
              required: true,
              message: "Vui lòng nhập email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="birthDay"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày sinh",
            },
          ]}
        >
          <DatePicker placeholder="dd/mm/yyyy"  style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
          ]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Thành phố"
          name="city"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn thành phố",
            },
          ]}
        >
          <Select onChange={handleCityChange}>
            {cityData.map((city) => (
              <Option key={city.value} value={city.value}>
                {city.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Quận/Huyện"
          name="district"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn quận/huyện",
            },
          ]}
        >
          <Select onChange={handleDisChange}>
            {disData.map((dis) => (
              <Option key={dis.value} value={dis.value}>
                {dis.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Phường/Xã"
          name="ward"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn phường/xã",
            },
          ]}
        >
          <Select onChange={handleWarChange}>
            {warData.map((war) => (
              <Option key={war.value} value={war.value}>
                {war.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giới tính",
            },
          ]}
        >
          <Select>
            <Option value={1}>Nam</Option>
            <Option value={0}>Nữ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddNhanVien;