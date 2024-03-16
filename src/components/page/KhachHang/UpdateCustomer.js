import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Space,
  Input,
  theme,
  Table,
  Collapse,
  Button,
  DatePicker,
  Form,
  Select,
  Col,
  Row,
  Upload,
  message,
  Radio,
  Modal,
  Tabs,
} from "antd";
import {
  ProfileFilled,
  FilterFilled,
  EyeFilled,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import {} from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  detailCustomer,
  updateCustomer,
  detailCustomerAddress,
} from "../../../config/CustomerApi";
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import ModalUpdateAddress from "./ModalUpdateAddress";
import ModalAddAddress from "./ModalAddAddress";

const UpdateCustomer = ({ isOpen, onCancel1, cusUpdate, cusAddress }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [defaul, setDefaul] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [phone, setPhone] = useState("");
  const [ngo, setNgo] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [rank, setRank] = useState("");
  const [username, setUsername] = useState("");
  const [id1, setId1] = useState("");
  const [id, setId] = useState("");
  const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
  // var currentUrl = window.location.href;
  useEffect(() => {
    if (cusUpdate) {
      const dis = cusUpdate.address.map((addr) => addr.district);
      const ward = cusUpdate.address.map((addr) => addr.province);
      const description = cusUpdate.address.map((addr) => addr.description);
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
      setId1(cusUpdate.id);
      setId(cusUpdate.id);

      const cities = cusUpdate.address.map((addr) => addr.city);
      setCity(cities);
      setDistrict(dis);
      setWard(ward);
      setDescription(description);
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
    } else if (name === "defaul") {
      setDefaul(parseInt(value));
    }

    if (name === "name") {
      setNameError('');
  } else if (name === "email") {
      setEmailError('');
  } else if (name === "phone") {
      setPhoneError('');
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
  const handleCancel = () => {
    setNameError("");
    setEmailError("");
    setPhoneError("");
    onCancel1();
    form.resetFields();
};
  const handleOk = async () => {
    
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
      onCancel1();
      setNameError("");
      setEmailError("");
      setPhoneError("");
      message.success("Sửa khách hàng thành công");
      form.resetFields();
    } catch (error) {
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

      onCancel1();
    } finally {
      onCancel1();
      form.resetFields();
      setConfirmLoading(false);
    }
  };

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
      const response = await dispatch(detailCustomerAddress({ id1, id }));
      setCusDataUpdateAddress(response.payload);
      setIsModalUpdateAddress(true);
      onCancel1();
    } catch (error) {
      console.error("Error fetching customer address:", error);
    }
  };
  //add address

  const [isModalAddAddress, setIsModalAddAddress] = useState(false);
  const [cusDataAddress, setCusDataAddress] = useState();
  const openAddAddress = async (id) => {
    const response = await dispatch(detailCustomer(id));
    setCusDataAddress(response.payload);
    setIsModalAddAddress(true);
  };
  const closeAddress = () => {
    setIsModalAddAddress(false);
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

      <ModalAddAddress
        isOpen={isModalAddAddress}
        dataAdd={cusDataAddress}
        onCancel1={closeAddress}
      />
      <Modal
        title="Update khách hàng"
        visible={isOpen}
        // width={600}
        // height = {700}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        style={{
          border: "3px solid transparent",
          padding: "0px",
          height: "700px",
          width: "500px",
          overflow: "auto",
        }}
      >
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Thông tin" key="form">
            <form>
              <h4 className="mt-3">Tên khách hàng</h4>
              <Input
                value={name}
                onChange={(e) =>
                  handleInputChange({
                    target: { name: "name", value: e.target.value },
                  })
                }
              />
              <h4 className="mt-3">Email</h4>
              <Input
                value={email}
                onChange={(e) =>
                  handleInputChange({
                    target: { name: "email", value: e.target.value },
                  })
                }
              />
              <h4 className="mt-3">Số điện thoại</h4>
              <Input
                placeholder="Số điện thoaị"
                value={phone}
                onChange={(e) =>
                  handleInputChange({
                    target: { name: "phone", value: e.target.value },
                  })
                }
              />
            </form>
          </TabPane>
          <TabPane tab="Địa chỉ">
          <div>
              <Button
                type="primary"
                onClick={() => openAddAddress(id1)}
                style={{ marginLeft: "350px" }}
              >
                Thêm địa chỉ
              </Button>

              {cusAddress &&
                cusAddress.map((b, index) => (
                  <div
                    key={index}
                    style={{
                      fontSize: "16px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{marginTop: '20px'}}>
                        {b.description}, {b.province}, {b.district}, {b.city}{" "}
                      </div>

                      <div>
                        <EditFilled
                          style={{ fontSize: "15px", marginLeft: "10px" }}
                          onClick={() => openModalUpdateAddress(id1, b.id)}
                        />
                      </div>
                    </div>

                    <div>
                      {b.defaul === 1 && (
                        <Button
                          type="default"
                          style={{ marginRight: "10px",marginTop: "10px", fontSize: "10px",height: "30px", borderColor: "#1E90FF", color: "#1E90FF" }}
                          onClick={(e) =>
                            handleInputChange({
                              target: { name: "defaul", value: b.id },
                            })
                          }
                        >
                          Mặc định
                        </Button>
                      )}
                    </div>
                    <hr style={{ width: "450px" , marginTop: "20px"}} />
                  </div>
                ))}
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};
export default UpdateCustomer;