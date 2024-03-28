import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  message,
  DatePicker,
  Select,
  Divider,
  Col,
  Row,
} from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import { updateEmployee } from "../../../config/EmployeeApi";

const { TextArea } = Input;
const { Option } = Select;

const ModalUpdateNhanVien = ({ open, closeModal, payload }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
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

  const [updatedValues, setUpdatedValues] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    status: "",
    provice: "",
    gender: "",
    birthDay: null,
    description: "",
    password: "",
  });

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

  useEffect(() => {
    console.log("Starting", payload);
    form.setFieldsValue({
      id: payload.id,
      username: payload.username,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      status: payload.status,
      city: payload.city,
      provice: payload.provice,
      district: payload.district,
      gender: payload.gender,
      birthDay: payload.birthDay,
      description: payload.description,
      password: payload.password,
    });
  }, [form, payload]);

  const handleValuesChange = (_, allValues) => {
    setUpdatedValues({
      username: allValues.username,
      name: allValues.name,
      phone: allValues.phone,
      email: allValues.email,
      status: allValues.status,
      city: allValues.city,
      district: allValues.district,
      provice: allValues.provice,
      gender: allValues.gender,
      birthDay: allValues.birthDay,
      description: allValues.description,
      password: allValues.password,
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      await dispatch(updateEmployee({ ...payload, ...updatedValues }));

      message.success("Thông tin nhân viên được cập nhật thành công");
      closeModal();
      form.resetFields();
    } catch (error) {
      message.error("Không thể cập nhật thông tin nhân viên");
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
    dataDis();
    dataWar();
  }, []);

  return (
    <Modal
      title="Cập Nhật Nhân Viên"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={1200}
      style={{
        top: 20,
      }}
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
        onValuesChange={handleValuesChange}
      >
        <Row>
          <Col span={12}>
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
          </Col>

          <Col span={12}>
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
          </Col>
          <Col span={12}>
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
          </Col>

          <Col span={12}>
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
              <DatePicker placeholder="dd/mm/yyyy" style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
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
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phường/Xã"
              name="provice"
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
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item label="Mô tả" name="description">
              <TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Password" name="password" >
              <Input.Password  />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalUpdateNhanVien;
