import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputField from '../../../form/InputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import ContentBanHang from './ContentBanHang'; // Adjust the import path as needed

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #000;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Icon = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;

function getTabsFromLocalStorage() {
  const savedTabs = JSON.parse(localStorage.getItem('tabs'));
  return savedTabs || [{ id: 1, title: 'Tab 1' }];
}

function getNextTabIdFromLocalStorage() {
  const savedNextTabId = JSON.parse(localStorage.getItem('nextTabId'));
  return savedNextTabId || 2;
}

function getTextCountsFromLocalStorage() {
  const savedTextCounts = JSON.parse(localStorage.getItem('textCounts'));
  return savedTextCounts || {};
}

const HeaderBanHang = () => {
  const { tabId } = useParams();
  const [tabs, setTabs] = useState(getTabsFromLocalStorage());
  const [nextTabId, setNextTabId] = useState(getNextTabIdFromLocalStorage());
  const [textCounts, setTextCounts] = useState(getTextCountsFromLocalStorage());

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
    localStorage.setItem('nextTabId', JSON.stringify(nextTabId));
    localStorage.setItem('textCounts', JSON.stringify(textCounts));
  }, [tabs, nextTabId, textCounts]);

  const handleAddTab = () => {
    const newTab = {
      id: nextTabId,
      title: `Tab ${nextTabId}`,
    };

    setTabs([...tabs, newTab]);
    setNextTabId(nextTabId + 1);

    setTextCounts((prevCounts) => ({
      ...prevCounts,
      [newTab.id]: 0,
    }));
  };

  const handleDeleteTab = (tabId) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);
    setTextCounts((prevCounts) => {
      const { [tabId]: deletedCount, ...restCounts } = prevCounts;
      return restCounts;
    });
  };

  const handleIncrement = (tabId) => {
    const updatedCounts = {
      ...textCounts,
      [tabId]: (textCounts[tabId] || 0) + 1,
    };

    setTextCounts(updatedCounts);
  };

  return (
    <div>
      <Header>
        <InputContainer>
          <InputField
            placeholder="Tìm kiếm hàng hóa"
            customStyle={{ flex: 1 }}
            icon={<FontAwesomeIcon icon={faSearch} />}
          />
          <Icon>
            <FontAwesomeIcon icon={faBarcode} style={{ cursor: 'pointer' }} />
          </Icon>
        </InputContainer>
      </Header>

      <ul>
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link to={`/tab/${tab.id}`}>{tab.title}</Link>
            <button onClick={() => handleDeleteTab(tab.id)}>x</button>
          </li>
        ))}
        <li>
          <button onClick={handleAddTab}>+</button>
        </li>
      </ul>

      <Routes>
        {tabs.map((tab) => (
          <Route
            key={tab.id}
            path={`tab/${tab.id}`}
            element={<ContentBanHang title={tab.title} textCount={textCounts[tab.id] || 0} onIncrement={() => handleIncrement(tab.id)} />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default HeaderBanHang;
