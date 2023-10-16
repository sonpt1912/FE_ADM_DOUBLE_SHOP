import React, { useState,useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderBanHang from './BanHang/StructureBanHang/HeaderBanHang';
import ContentBanHang from './BanHang/StructureBanHang/ContentBanHang';
import FooterBanHang from './BanHang/StructureBanHang/FooterBanHang';
import styled from 'styled-components';

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
  console.log("currentTab: " + currentTab);

  useEffect(() => {
    console.log('Current tab:', currentTab);
    console.log('Content for current tab:'[currentTab]);
  }, [currentTab]);

  const catchTabChange = (tabId) => {
    console.log('catchTabChange', tabId);
    setCurrentTab(tabId);
  };

  return (
    <PageWrapper>
      <HeaderBanHang setCurrentTab={setCurrentTab} />
      <ContentWrapper>
        <Routes>
          <Route
            path="/"
            element={<ContentBanHang currentTab={currentTab} />}
          />
        </Routes>
      </ContentWrapper>
      <FooterBanHang />
    </PageWrapper>
  );
};

export default BanHang;
