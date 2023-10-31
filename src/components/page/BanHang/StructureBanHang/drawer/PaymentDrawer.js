import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import "../../../../../styles/BanHangCss/DrawerPayment.css";
import RadioComponent from "../../../../form/RadioField";

const PaymentDrawer = ({ visible, onClose }) => {
  const options = [
    { label: "Tiền mặt", value: "option1" },
    { label: "Chuyển khoản", value: "option2" },
    { label: "Tiền mặt và chuyển khoản ", value: "option3" },
  ];

  const [currentDateTime, setCurrentDateTime] = useState("");
  const [selectedValueRadio, setSelectedValueRadio] = useState("option1");

  const handleRadioChange = (e) => {
    setSelectedValueRadio(e.target.value);
    console.log("Selected Value: ", e.target.value);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Drawer
      title={
        <div className="drawer-title">
          <div>Chi tiết thanh toán</div>
          <div>{currentDateTime}</div>
        </div>
      }
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={700}
    >
      <h1>Khách lẻ</h1>
      <div className="col-payment">
        <div className="title-payment">Tổng tiền hàng :</div>
        <div className="price-payment">1.999.999</div>
      </div>
      <div className="col-payment">
        <div className="title-payment">Vouvher :</div>
        <div className="price-payment">1.999.999</div>
      </div>
      <div className="col-payment">
        <div className="title-payment">Thuế (10%) :</div>
        <div className="price-payment">1.999.999</div>
      </div>
      <div className="col-payment">
        <div className="title-payment">Khách cần trả :</div>
        <div className="price-payment">1.999.999</div>
      </div>
      <div className="col-payment">
        <div className="title-payment">Tổng tiền hàng :</div>
        <div className="price-payment">1.999.999</div>
      </div>
      <div className="col-payment">
        <div className="title-payment">Phương thức thanh toán :</div>
        <RadioComponent
          options={options}
          onChange={handleRadioChange}
          value={selectedValueRadio}
        />
      </div>
      <div className="col-payment">
        <div className="title-payment">Tiền mặt :</div>
        <div className="price-payment">1.999.999</div>
      </div>
      <div className="col-payment">
        <div className="title-payment">Chuyển khoản :</div>
        <div className="price-payment">1.999.999</div>
      </div>
      <div className="button-payment">
        <Button type="primary" className="btn-paying">
          Thanh Toán
        </Button>
      </div>
    </Drawer>
  );
};

export default PaymentDrawer;
