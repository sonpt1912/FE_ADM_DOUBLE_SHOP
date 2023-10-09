import React from "react";
import { DatePicker } from "antd";
import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)``;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: medium;
  font-weight: bold;
`;

const DatePickerComponent = ({ label, onChange, placeholder }) => {
  return (
    <div>
      <Label>{label}</Label>
      <StyledDatePicker onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default DatePickerComponent;
