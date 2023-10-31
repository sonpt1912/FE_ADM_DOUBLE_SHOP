import React from "react";
import { Drawer } from "antd";

const PaymentDrawer = ({ visible, onClose }) => {
  return (
    <Drawer
      title="Chi tiết thanh toán"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={700}
    >
      This is Pson
    </Drawer>
  );
};

export default PaymentDrawer;
