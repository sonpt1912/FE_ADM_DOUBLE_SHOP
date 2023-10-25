import React from "react";
import { Input } from "antd";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Label = styled.label`
  margin-right: 10px;
  font-size: medium;
  font-weight: bold;
`;

const StyledInput = styled(Input)`
  padding: 10px;
  border: 2px solid #3498db;
  border-radius: 5px;
  flex: 1;

  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle}
    `}

  @media (max-width: 768px) {
    padding: 8px;
    border-width: 1px;
  }
`;

const InputField = ({
  placeholder,
  value,
  onChange,
  label,
  customStyle,
  name,
}) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <StyledInput
        placeholder={placeholder}
        customStyle={customStyle}
        value={value}
        onChange={onChange}
        name={name}
      />
    </Container>
  );
};

export default InputField;
