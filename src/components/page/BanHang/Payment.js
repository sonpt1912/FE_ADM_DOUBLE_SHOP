import React, { useState } from "react";
import { Modal, Input, Button, Switch } from "antd";
import { useSelector } from "react-redux";

const Payment = ({ visible, onCancel, total, onPayment }) => {
  const [customerPaid, setCustomerPaid] = useState(0);
  const [changeAmount, setChangeAmount] = useState(0);

  const handlePayment = () => {
    if (customerPaid <= 0) {
      alert("Vui lòng nhập số tiền khách đưa hợp lệ.");
      return;
    }
    const change = customerPaid - total;
    setChangeAmount(change);
    onPayment({
      customerPaid: customerPaid,
      changeAmount: change,
    });
    setCustomerPaid(0);
    setChangeAmount(0);
    onCancel();
  };

  return (
    <Modal
      title="Thanh Toán"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setCustomerPaid(0);
            setChangeAmount(0);
            onCancel();
          }}
        >
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handlePayment}>
          Thanh Toán
        </Button>,
      ]}
    >
      <div>
        <Input
          placeholder="Nhập số tiền khách đưa"
          value={customerPaid}
          onChange={(e) => setCustomerPaid(parseFloat(e.target.value) || 0)}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <div>Số tiền khách đưa: {customerPaid} VND</div>
        <div>Tổng tiền cần thanh toán: {total} VND</div>
        <div>
          Phương thức thanh toán:
          <Switch defaultChecked />
          <span style={{ marginLeft: 10 }}>Tiền mặt</span>
        </div>
        <div style={{ marginTop: 10 }}>
          Số tiền thừa: {customerPaid - total} VND
        </div>
      </div>
    </Modal>
  );
};

export default Payment;
