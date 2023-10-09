import {
  PrimaryButton,
  DangerButton,
  WarningButton,
} from "../form/CustomButton";
import styled from "styled-components";
import InputField from "../form/InputField";
import CustomSelect from "../form/SelectField";
import Checkbox from "../form/CheckboxField";
import React, { useState } from "react";
import RadioExample from "../form/RadioField";
import TableComponent from "../form/TableCustom";
import DatePickerComponent from "../form/DatePickerField";
const Container = styled.div`
  display: flex;
`;

const ThongKe = () => {
  // Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const dataSource = [
    {
      key: "1",
      name: "John Doe",
      age: 30,
      address: "123 Street St, City",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 25,
      address: "456 Avenue Ave, Town",
    },
  ];
  // Radio buttons
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];

  const [selectedValueRadio, setSelectedValueRadio] = useState("");

  const handleRadioChange = (e) => {
    setSelectedValueRadio(e.target.value);
  };
  // Combobox
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };
  // Checkbox buttons
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  // DatePicker
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <div>
        <PrimaryButton>Primary Button</PrimaryButton>
        <DangerButton>Danger Button</DangerButton>
        <WarningButton>Warning Button</WarningButton>
      </div>
      <br />
      <Container>
        <InputField
          label="Username :"
          placeholder="Enter your username"
          customStyle={{
            width: "450px",
            backgroundColor: "lightblue",
            marginRight: "10px",
          }}
        />
        <InputField
          label="Password :"
          placeholder="Enter your password"
          customStyle={{
            width: "450px",
            backgroundColor: "lightgreen",
          }}
        />
      </Container>
      <br />
      <CustomSelect
        label="Select:"
        options={options}
        placeholder="Select an option"
        value={selectedValue}
        onChange={handleChange}
        customStyle={{ width: "300px" }}
      />
      <br />
      <br />
      <Container>
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          label="Example Checkbox"
          largerLabel="Check check Label:"
        />
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          label="Example Checkbox"
        />
      </Container>
      <br />
      <Container>
        <RadioExample
          options={options}
          onChange={handleRadioChange}
          label="Choose an option:"
        />
      </Container>
      <br />
      <div>
        <DatePickerComponent
          label="Date: "
          onChange={handleDateChange}
          placeholder="Select Date"
        />
        <div>
          Selected Date:{" "}
          {selectedDate ? selectedDate.toString() : "No date selected"}
        </div>
      </div>
      <br />
      <TableComponent columns={columns} dataSource={dataSource} />
    </>
  );
};

export default ThongKe;
