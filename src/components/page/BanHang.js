import React from "react";
import { Routes, Route } from "react-router-dom";
import HeaderBanHang from "./BanHang/StructureBanHang/HeaderBanHang";
import FooterBanHang from "./BanHang/StructureBanHang/FooterBanHang";
import styled from "styled-components";
import ContentBanHang from "./BanHang/StructureBanHang/ContentBanHang";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const BanHang = () => {
  return (
    <PageWrapper>
      <HeaderBanHang />
      <ContentWrapper>
        <Routes>
          <Route path=":tabId" element={<ContentBanHang />} />
        </Routes>
      </ContentWrapper>
      <FooterBanHang />
    </PageWrapper>
  );
};

export default BanHang;
