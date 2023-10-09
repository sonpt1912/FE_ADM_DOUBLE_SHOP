// CustomButton.js
import React from "react";
import styled from "styled-components";

const BaseButton = styled.button`
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: #3498db;
  border: 2px solid #2980b9;
`;

export const DangerButton = styled(BaseButton)`
  background-color: #ff4d4f;
  border: 2px solid #e74c3c;
`;

export const WarningButton = styled(BaseButton)`
  background-color: #f39c12;
  border: 2px solid #d68910;
`;
