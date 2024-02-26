import React from "react";
import { Row, Col, MenuProps } from "antd";

const NhanVien = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Row>
        <Col span={7} style={{ borderRight: "1px solid" }}>
          col-7
        </Col>
        <Col span={17}>col-17</Col>
      </Row>
    </div>
  );
};

export default NhanVien;
