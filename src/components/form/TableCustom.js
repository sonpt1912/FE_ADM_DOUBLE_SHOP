import React from "react";
import { Table } from "antd";
import styled from "styled-components";
import _ from "lodash";

const StyledTableWrapper = styled.div`
  .ant-table {
    font-family: Arial, sans-serif;
    border: 1px solid #e8e8e8;
    border-radius: 4px;

    .ant-table-thead {
      background-color: #f0f0f0;
    }

    .ant-table-cell {
      padding: 10px;
    }
  }
`;

const TableComponent = ({ columns, dataSource }) => {
  return (
    <StyledTableWrapper>
      <Table columns={columns} dataSource={dataSource} />
    </StyledTableWrapper>
  );
};

export default TableComponent;
