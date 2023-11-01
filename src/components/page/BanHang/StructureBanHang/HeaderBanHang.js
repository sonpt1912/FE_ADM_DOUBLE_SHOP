import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Input, Tabs, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBarcode } from "@fortawesome/free-solid-svg-icons";

const HeaderContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #00000036;
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
  margin: 0 10px 0 10px;
  cursor: pointer;
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs .ant-tabs-top .ant-tabs-card {
    margin-top: -33px;
    margin-left: 10px !important;
  }
  .ant-tabs-nav {
    margin: 0 0 -10px 0 !important;
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
  const [activeKey, setActiveKey] = useState("");
  const [items, setItems] = useState([]);
  const [tabContents, setTabContents] = useState({});

  const newTabIndex = useRef(1);

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
    setCurrentTab(newActiveKey);
    updateTabContent(newActiveKey, tabContents[newActiveKey]);
  };
  const add = () => {
    const newActiveKey = `Tab ${newTabIndex.current++}`; // Change "newTab" to "Tab"
    const newPanes = [...items];
    newPanes.push({
      label: newActiveKey,
      key: newActiveKey,
    });
    setItems(newPanes);

    setActiveKey(newActiveKey);
    setCurrentTab(newActiveKey);
    updateTabContent(newActiveKey, `Content of ${newActiveKey}`); // Change "new Tab" to the newActiveKey
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    const newPanes = items.filter((item) => item.key !== targetKey);

    if (newPanes.length === 0) {
      // Nếu không còn tab nào, thêm một tab mới trống
      const newActiveKey = `Tab ${newTabIndex.current++}`;
      newPanes.push({
        label: newActiveKey,
        key: newActiveKey,
      });

      // Đặt tab mới thêm vào làm tab hoạt động

      setActiveKey(newActiveKey);
      setCurrentTab(newActiveKey);
      updateTabContent(newActiveKey, `Content of ${newActiveKey}`);
    } else if (newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }

    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const updateTabContent = (tabId, content) => {
    setTabContents((prevContents) => ({
      ...prevContents,
      [tabId]: content,
    }));
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
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
      <StyledTabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    </HeaderContainer>
  );
};

export default HeaderBanHang;
