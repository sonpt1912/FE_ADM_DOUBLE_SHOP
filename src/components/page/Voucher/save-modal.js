import React from "react";
import { Modal, Button, Tabs, Input } from "antd";
import axios from "axios";
import { Row, Col } from "antd";

const { TabPane } = Tabs;

const ModalSave = ({ visible, onCancel }) => {
  return (
    <Modal
      width={1000}
      title="Thêm mới voucher"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={onCancel}>
          Save
        </Button>,
      ]}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin" key="1">
          <Row>
            <Col span={12}>
              <Input
                label="Mã đợt phát hành :"
                placeholder="Enter your username"
                customStyle={{
                  border: "1px solid #000",
                  outline: "none",
                }}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Tên đợt phát hành :"
                placeholder="Enter your username"
                customStyle={{
                  border: "1px solid #000",
                  outline: "none",
                }}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Mệnh giá:"
                placeholder="Enter your username"
                customStyle={{
                  border: "1px solid #000",
                  outline: "none",
                }}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Tổng tiền hàng :"
                placeholder="Enter your username"
                customStyle={{
                  border: "1px solid #000",
                  outline: "none",
                }}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Tình trạng :"
                placeholder="Enter your username"
                customStyle={{
                  border: "1px solid #000",
                  outline: "none",
                }}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Ghỉ chú :"
                placeholder="Enter your username"
                customStyle={{
                  border: "1px solid #000",
                  outline: "none",
                }}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Áp dụng" key="2">
          <p>Áp dụng</p>
        </TabPane>
        <TabPane tab="Danh sách" key="3">
          <p>Danh sách</p>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default ModalSave;
