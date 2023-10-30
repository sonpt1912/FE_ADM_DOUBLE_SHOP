import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Tabs, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBarcode } from "@fortawesome/free-solid-svg-icons";
const { TabPane } = Tabs;

const HeaderContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;

  .tabs-container {
    display: flex;
    align-items: center;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px 0 20px;

  .ant-tabs-tab {
    cursor: pointer;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &.active {
      background-color: #000;
    }
  }
`;

const getTabsFromLocalStorage = () => {
  const savedTabs = JSON.parse(localStorage.getItem("tabs"));
  return savedTabs || [{ id: 1, title: "Tab 1" }];
};

const getNextTabIdFromLocalStorage = () => {
  const savedNextTabId = JSON.parse(localStorage.getItem("nextTabId"));
  return savedNextTabId || 2;
};

const getTextCountsFromLocalStorage = () => {
  const savedTextCounts = JSON.parse(localStorage.getItem("textCounts"));
  return savedTextCounts || {};
};
const HeaderBanHang = ({ currentTab, setCurrentTab }) => {
  const [tabs, setTabs] = useState(getTabsFromLocalStorage());
  const [nextTabId, setNextTabId] = useState(getNextTabIdFromLocalStorage());
  const [textCounts, setTextCounts] = useState(getTextCountsFromLocalStorage());
  const [activeTab, setActiveTab] = useState("1");
  const [tabContents, setTabContents] = useState({});
  const [productsByTab, setProductsByTab] = useState({});

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
    localStorage.setItem("nextTabId", JSON.stringify(nextTabId));
    localStorage.setItem("textCounts", JSON.stringify(textCounts));
    localStorage.setItem("tabContents", JSON.stringify(tabContents));
  }, [tabs, nextTabId, textCounts, tabContents]);

  const renderTabContent = () => {
    if (tabs.length > 0 && activeTab) {
      return <div className="content">{tabContents[activeTab]}</div>;
    }

    return <div>Không có tab nào hoặc tab không tồn tại.</div>;
  };

  const handleAddTab = () => {
    const newTab = {
      id: String(nextTabId),
      title: `Tab ${nextTabId}`,
    };

    setTabs([...tabs, newTab]);
    setNextTabId(nextTabId + 1);
    setTextCounts((prevCounts) => ({
      ...prevCounts,
      [newTab.id]: 0,
    }));

    setActiveTab(newTab.id);

    // Cập nhật danh sách sản phẩm cho tab mới (ban đầu rỗng)
    setProductsByTab({ ...productsByTab, [newTab.id]: [] });

    setTabContents((prevContents) => ({
      ...prevContents,
      [newTab.id]: `Content for ${newTab.title}`,
    }));
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentTab(Number(key));
  };

  const clearCartForTab = (tabId) => {
    const cartKey = `cart_${tabId}`;
    localStorage.removeItem(cartKey);
  };

  const handleDeleteTab = (tabId) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);
    setTextCounts((prevCounts) => {
      const { [tabId]: deletedCount, ...restCounts } = prevCounts;
      return restCounts;
    });

    setTabContents((prevContents) => {
      const { [tabId]: deletedContent, ...restContents } = prevContents;
      return restContents;
    });

    // Gọi hàm xóa dữ liệu giỏ hàng của tab tương ứng
    clearCartForTab(tabId);

    // Kiểm tra và cập nhật activeTab nếu cần
    if (activeTab === tabId && updatedTabs.length > 0) {
      setActiveTab(updatedTabs[0].id);
    }
  };

  const renderTabs = () => {
    return tabs.map((tab) => (
      <TabWrapper key={tab.id} onClick={() => handleTabChange(tab.id)}>
        <div className="tab-content">{tab.title}</div>
        <div className="tab-actions">
          <Button type="link" onClick={() => handleDeleteTab(tab.id)}>
            x
          </Button>
        </div>
      </TabWrapper>
    ));
  };

  return (
    <HeaderContainer>
      <InputContainer>
        <Input
          placeholder="Tìm kiếm hàng hóa"
          style={{ flex: 1 }}
          prefix={<FontAwesomeIcon icon={faSearch} />}
        />
        <Icon>
          <FontAwesomeIcon icon={faBarcode} style={{ cursor: "pointer" }} />
        </Icon>
      </InputContainer>

      <div className="tabs-container">
        {renderTabs()}
        <Button type="link" onClick={handleAddTab}>
          + Add Tab
        </Button>
      </div>
    </HeaderContainer>
  );
};

export default HeaderBanHang;
