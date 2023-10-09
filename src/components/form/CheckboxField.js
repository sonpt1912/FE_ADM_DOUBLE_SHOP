import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  /* Hide the default checkbox visually */
  appearance: none;
  width: 16px;
  height: 16px;
  margin: 0;
  cursor: pointer;
  position: relative;

  /* Set the custom checkbox style */
  &:before {
    content: "${({ checked }) => (checked ? "\u2714" : "")}";
    width: 16px;
    height: 16px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-align: center;
    line-height: 16px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
    color: #3498db;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #333;
  margin-left: 8px;
`;

const LargerLabel = styled.label`
  font-size: medium;
  font-weight: bold;
`;

const CheckboxExample = ({ label, largerLabel }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Container>
      <LargerLabel>{largerLabel}</LargerLabel>
      <CheckboxContainer>
        <HiddenCheckbox checked={isChecked} onChange={handleCheckboxChange} />
        <CheckboxLabel>{label}</CheckboxLabel>
      </CheckboxContainer>
    </Container>
  );
};

export default CheckboxExample;
