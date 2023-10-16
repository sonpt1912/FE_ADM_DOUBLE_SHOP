import React, { useEffect } from 'react';

const ContentBanHang = ({ currentTab, tabContents }) => {
  useEffect(() => {
    // Xử lý khi currentTab thay đổi
    console.log('Current tab:', currentTab);
    console.log('Content for current tab:', tabContents[currentTab]);
  }, [currentTab, tabContents]);

  const content = tabContents[currentTab] || 'Không có nội dung cho tab này';
console.log('Content for current tab:');
  return (
    <div>
      <h2>Content of Tab {currentTab}</h2>
      <div>{content}</div>
    </div>
  );
};

export default ContentBanHang;
