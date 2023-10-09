import React from "react";
import { Select } from "antd";
import styled, { css } from "styled-components";

const { Option } = Select;

const StyledSelect = styled(Select)`
  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle}
    `}
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: medium;
  font-weight: bold;
`;

const CustomSelect = ({
  options,
  placeholder,
  value,
  onChange,
  customStyle,
  label,
}) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <StyledSelect
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        customStyle={customStyle}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </StyledSelect>
    </>
  );
};

export default CustomSelect;
