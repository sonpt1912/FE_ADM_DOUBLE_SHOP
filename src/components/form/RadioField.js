import React from "react";
import { Radio } from "antd";
import styled from "styled-components";

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-size: medium;
  font-weight: bold;
`;

const RadioComponent = ({ options, onChange, label, value, name }) => {
  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <Radio.Group onChange={onChange} value={value} name={name}>
        {options.map((option, index) => (
          <Radio key={index} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioComponent;
