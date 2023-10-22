import React, { useState, useEffect, useMemo } from "react";
import { BILL_SELL_TYPE } from "./constants/tabInfor";
import FooterBanHang from "./FooterBanHang";
import NormalSell from "./NormalSell";
import ShipperSell from "./ShipperSell";
import "../../../../styles/BanHangCss/ContentBanHang.css";

const ContentBanHang = ({ currentTab }) => {
  const [sellMethods, setSellMethods] = useState(BILL_SELL_TYPE.NORMAL_SELL);

  useEffect(() => {
    console.log("Current tab:", currentTab);
  }, [currentTab]);

  const isNormalSell = useMemo(
    () => sellMethods === BILL_SELL_TYPE.NORMAL_SELL,
    [sellMethods]
  );

  const handlerSellMethodsChange = (type) => {
    console.log("handlerSellMethodsChange", type);
    setSellMethods(type);
  };

  return (
    <>
      <div className="ContentBanHangContainer ">
        {isNormalSell && <NormalSell currentTab={currentTab} />}
        {!isNormalSell && <ShipperSell />}
      </div>
      <FooterBanHang sellMethods={handlerSellMethodsChange} />
    </>
  );
};

export default ContentBanHang;
