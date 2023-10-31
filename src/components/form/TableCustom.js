import React from "react";
import { Table, Pagination, Button } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "./CustomButton";

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
    text-align: center;
  }

  .ant-pagination-total-text {
    float: left;
  }

  .ant-pagination-item {
    display: inline-block;
    margin: 0 4px;
  }

  .ant-pagination-jump-prev,
  .ant-pagination-jump-next,
  .ant-pagination-prev,
  .ant-pagination-next {
    display: inline-block;
  }

  .ant-pagination-options {
    float: right;
  }
`;

const TableComponent = ({
  columns,
  dataSource,
  totalRecord,
  showModal,
  currentPage,
  totalPages,
  pageSize,
  onChange,
  onShowSizeChange,
}) => {
  return (
    <StyledTableWrapper>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Header</span>
            <PrimaryButton type="primary" onClick={showModal}>
              <FontAwesomeIcon icon={faFloppyDisk} />
              Thêm mới
            </PrimaryButton>
          </div>
        )}
        footer={() => (
          <div className="custom-pagination">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalRecord}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
              onChange={onChange}
              onShowSizeChange={onShowSizeChange}
              totalPages={totalPages}
            />
          </div>
        )}
      />
    </StyledTableWrapper>
  );
};

export default TableComponent;
