import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space, Input, Table, Collapse } from "antd";


const components = [
  <Input
    label="name :"
    placeholder="Enter your username"
    customStyle={{
      width: "450px",
      backgroundColor: "lightblue",
      marginRight: "10px",
    }}
  />,
  <Input
    label="description :"
    placeholder="Enter your username"
    customStyle={{
      width: "450px",
      backgroundColor: "lightblue",
      marginRight: "10px",
    }}
  />,
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

const KichCo = () => {
  return (
    <div>
      <Collapse components={components} />
      <div style={{ marginBottom: "30px" }}></div>
      <Table
        columns={columns}
        dataSource={dataSource}
        totalRecord={100}
      />
    </div>
  );
};

export default KichCo;
