import React from "react";
import { Table } from "antd";

const CustomTable = ({ dataSource, columns }) => {
  return <Table dataSource={dataSource} columns={columns} />;
};

export default CustomTable;
