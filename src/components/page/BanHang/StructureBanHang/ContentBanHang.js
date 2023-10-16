// ContentBanHang.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Content = styled.div`
  padding: 20px;
`;

const ContentBanHang = ({ title, textCount, onIncrement }) => {
  const [count, setCount] = useState(textCount);

  useEffect(() => {
    setCount(textCount);
  }, [textCount]);

  return (
    <Content>
      <h2>{title} Content</h2>
      <p>This is the content for {title}.</p>
      <button onClick={() => onIncrement()}>+</button>
      <p>Text count: {count}</p>
    </Content>
  );
};

export default ContentBanHang;
