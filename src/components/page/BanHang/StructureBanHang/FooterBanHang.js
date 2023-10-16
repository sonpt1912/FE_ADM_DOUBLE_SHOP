// FooterBanHang.js

import React from "react";
import styled from "styled-components";
import { BILL_SELL_TYPE } from "./constants/tabInfor";

const Footer = styled.div`
  background-color: #2ecc71;
  color: #fff;
  padding: 10px;
`;

const FooterBanHang = ({ sellMethods }) => {
  const handerSelectBuyMethods = (type) => {
    sellMethods(type)
  }

  return <Footer>
    <div onClick={() => handerSelectBuyMethods(BILL_SELL_TYPE.NORMAL_SELL)}>ban thuong</div>
    <div onClick={() => handerSelectBuyMethods(BILL_SELL_TYPE.SHIPPER_SELL)}>ban giao hang</div>
  </Footer>;
};

export default FooterBanHang;
