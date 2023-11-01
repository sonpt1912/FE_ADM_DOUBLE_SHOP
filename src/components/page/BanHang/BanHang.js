import React, { useState } from "react";
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
  const [tabContents, setTabContents] = useState({}); // State to hold tab contents

  const catchTabChange = (tabId) => {
    setCurrentTab(tabId);
  };

  const updateTabContent = (tabId, content) => {
    setTabContents((prevContents) => ({
      ...prevContents,
      [tabId]: content,
    }));
  };

  return (
    <PageWrapper>
      <HeaderBanHang
        currentTab={currentTab}
        setCurrentTab={catchTabChange}
        updateTabContent={updateTabContent}
      />
      <ContentWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <ContentBanHang
                currentTab={currentTab}
                tabContent={tabContents[currentTab]}
              />
            }
          />
        </Routes>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default BanHang;
