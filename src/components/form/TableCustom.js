import React from "react";
import { Table, Pagination, Button } from "antd";
import styled from "styled-components";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const StyledTableWrapper = styled.div`
  .ant-table {
    font-family: Arial, sans-serif;
    border: 1px solid #e8e8e8;
    border-radius: 8px;

    .ant-table-thead {
      background-color: #f0f0f0;
    }

    .ant-table-cell {
      padding: 10px;
    }
  }

  .custom-pagination {
    margin-top: 10px;
    text-align: center; /* Canh lề phải */
  }

  .ant-pagination-total-text {
    float: left; /* Canh lề bên trái */
  }

  .ant-pagination-item {
    display: inline-block; /* Hiển thị trên cùng một dòng */
    margin: 0 4px; /* Khoảng cách giữa các nút chuyển trang */
  }

  .ant-pagination-jump-prev,
  .ant-pagination-jump-next,
  .ant-pagination-prev,
  .ant-pagination-next {
    display: inline-block; /* Hiển thị trên cùng một dòng */
  }

  .ant-pagination-options {
    float: right; /* Canh lề bên phải */
  }
`;

const TableComponent = ({ columns, dataSource, totalRecord }) => {
  return (
    <StyledTableWrapper>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Header</span>
            <Button type="primary" className="">
              <FontAwesomeIcon icon={faFloppyDisk} />
              Thêm mới
            </Button>
          </div>
        )}
        footer={() => (
          <div className="custom-pagination">
            <Pagination
              total={totalRecord}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `Total ${total} items`
            }
            />
          </div>
        )}
      />
    </StyledTableWrapper>
  );
};

export default TableComponent;
