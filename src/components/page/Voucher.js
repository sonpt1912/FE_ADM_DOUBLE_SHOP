import React, { useState } from "react";
import CollapseCustom from "../form/CollapseCustom";
import TableComponent from "../form/TableCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space } from "antd";
import InputField from "../form/InputField";
import RadioField from "../form/RadioField";
import ModalSave from "./Voucher/save-modal";
const option = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const components = [
  <InputField
    label="name :"
    placeholder="Enter your username"
    customStyle={{
      width: "450px",
      backgroundColor: "lightblue",
      marginRight: "10px",
    }}
  />,
  <InputField
    label="description :"
    placeholder="Enter your username"
    customStyle={{
      width: "450px",
      backgroundColor: "lightblue",
      marginRight: "10px",
    }}
  />,
  <RadioField options={option} />,
];

const columns = [
  {
    title: "stt",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "hành động",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer" }} />
        <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} />
      </Space>
    ),
  },
];

const dataSource = [
  {
    key: "1",
    name: "John Doe",
    age: 30,
    address: "123 Street St, City",
  },
  {
    key: "2",
    name: "Jane Smith",
    age: 25,
    address: "456 Avenue Ave, Town",
  },
  {
    key: "1",
    name: "John Doe",
    age: 30,
    address: "123 Street St, City",
  },
  {
    key: "2",
    name: "Jane Smith",
    age: 25,
    address: "456 Avenue Ave, Town",
  },
  {
    key: "1",
    name: "John Doe",
    age: 30,
    address: "123 Street St, City",
  },
  {
    key: "2",
    name: "Jane Smith",
    age: 25,
    address: "456 Avenue Ave, Town",
  },
  {
    key: "1",
    name: "John Doe",
    age: 30,
    address: "123 Street St, City",
  },
];

const Voucher = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <CollapseCustom components={components} />
      <div style={{ marginBottom: "30px" }}></div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        totalRecord={100}
        showModal={showModal}
      />
      <br />

      <ModalSave
        visible={isModalVisible}
        onCancel={handleCancel}
        isModalVisible={isModalVisible}
      />
    </div>
  );
};

export default Voucher;
