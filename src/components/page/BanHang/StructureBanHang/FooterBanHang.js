// FooterBanHang.js

import React from "react";
import { BILL_SELL_TYPE } from "./constants/tabInfor";
import "../../../../styles/BanHangCss/FooterBanHang.css";

const FooterBanHang = ({ sellMethods }) => {
  const handerSelectBuyMethods = (type) => {
    sellMethods(type);
  };

  return (
    <div className="FooterBanHang">
      <div
        className="sell"
        onClick={() => handerSelectBuyMethods(BILL_SELL_TYPE.NORMAL_SELL)}
      >
        Bán Thường
      </div>
      <div
        className="sell"
        onClick={() => handerSelectBuyMethods(BILL_SELL_TYPE.SHIPPER_SELL)}
      >
        Bán Giao Hàng
      </div>
    </div>
  );
};

export default FooterBanHang;
