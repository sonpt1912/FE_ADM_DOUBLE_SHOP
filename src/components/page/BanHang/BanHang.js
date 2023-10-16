import React, { useState,useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderBanHang from './StructureBanHang/HeaderBanHang';
import ContentBanHang from './StructureBanHang/ContentBanHang';
import FooterBanHang from './StructureBanHang/FooterBanHang';
import NormalSell from './StructureBanHang/NormalSell';
import ShipperSell from './StructureBanHang/ShipperSell';
import styled from 'styled-components';
import { BILL_SELL_TYPE } from './StructureBanHang/constants/tabInfor';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;


const BanHang = () => {
  const [currentTab, setCurrentTab] = useState(1); // Thêm state cho currentTab
  const [sellMethods, setSellMethods] = useState(BILL_SELL_TYPE.NORMAL_SELL)
  console.log("currentTab: " + currentTab);

  useEffect(() => {
    console.log('Current tab:', currentTab);
    console.log('Content for current tab:'[currentTab]);
  }, [currentTab]);

  const catchTabChange = (tabId) => {
    console.log('catchTabChange', tabId);
    setCurrentTab(tabId);
  };
  const isNormalSell = useMemo(() => sellMethods === BILL_SELL_TYPE.NORMAL_SELL, [sellMethods])
  const handlerSellMethodsChange = (type) => {
    console.log('handlerSellMethodsChange', type);
    setSellMethods(type)
  }

  return (
    <PageWrapper>
      <HeaderBanHang currentTab={currentTab} setCurrentTab={catchTabChange} />
      <ContentWrapper>
        {/* <Routes>
          <Route
            path="/"
            element={<ContentBanHang currentTab={currentTab} />}
          />
        </Routes> */}
        { isNormalSell && <NormalSell />}
        { !isNormalSell && <ShipperSell />}
      </ContentWrapper>
      <FooterBanHang sellMethods={handlerSellMethodsChange}/>
    </PageWrapper>
  );
};

export default BanHang;
