import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderBanHang from "./StructureBanHang/HeaderBanHang";
import ContentBanHang from "./StructureBanHang/ContentBanHang";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const BanHang = () => {
  const [currentTab, setCurrentTab] = useState(1);
  console.log("currentTab: " + currentTab);

  useEffect(() => {
    console.log("Current tab:", currentTab);
    console.log("Content for current tab:"[currentTab]);
  }, [currentTab]);

  const catchTabChange = (tabId) => {
    console.log("catchTabChange", tabId);
    setCurrentTab(tabId);
  };

  return (
    <PageWrapper>
      <HeaderBanHang currentTab={currentTab} setCurrentTab={catchTabChange} />
      <ContentWrapper>
        <Routes>
          <Route
            path="/"
            element={<ContentBanHang currentTab={currentTab} />}
          />
        </Routes>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default BanHang;
