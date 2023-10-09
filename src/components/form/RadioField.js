import React from "react";
import { Radio } from "antd";
import styled from "styled-components";

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-size: medium;
  font-weight: bold;
`;

const RadioComponent = ({ options, onChange, label }) => {
  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <Radio.Group onChange={onChange}>
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
