import React, { useEffect } from 'react';

const ContentBanHang = ({ currentTab }) => {
  useEffect(() => {
    // Xử lý khi currentTab thay đổi
    console.log('Current tab:', currentTab);

  }, [currentTab]);

 
console.log('Content for current tab:');
  return (
    <div>
      <h2>Content of Tab {currentTab}</h2>
      <div>{currentTab}</div>
    </div>
  );
};

export default ContentBanHang;
