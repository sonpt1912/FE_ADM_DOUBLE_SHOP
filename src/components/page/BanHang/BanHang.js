// BanHang.js

import React from "react";
import HeaderBanHang from "./StructureBanHang/HeaderBanHang";
import ContentBanHang from "./StructureBanHang/ContentBanHang";
import FooterBanHang from "./StructureBanHang/FooterBanHang";
import styled from "styled-components";

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
    <PageWrapper >
      <HeaderBanHang />
      <ContentWrapper>
        <ContentBanHang />
      </ContentWrapper>
      <FooterBanHang />
    </PageWrapper>
  );
};

export default BanHang;
