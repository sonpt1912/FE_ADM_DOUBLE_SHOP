import React, { useState } from "react";
import { Modal, Button } from "antd";
import InputField from "../../../form/InputField";
import RadioComponent from "../../../form/RadioField";
import { useDispatch } from "react-redux";
import { addAo } from "../../../../store/slice/AoSlice";

const ModalAo = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "status") {
      setStatus(parseInt(value));
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleOk = () => {
    const formData = {
      name: name,
      createdBy: 1,
      updated_by: 1,
      createdTime: currentDateTimeString,
      updatedTime: "",
      status: status,
    };
    dispatch(addAo(formData));
    setName("");
    onCancel();
  };

  return (
    <Modal
      title="Modal product"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <form>
        <InputField
          name="name"
          label="Name product :"
          placeholder="Enter name product"
          customStyle={{
            width: "450px",
            marginRight: "10px",
          }}
          onChange={handleInputChange}
          value={name}
        />
        <RadioComponent
          name="status"
          options={[
            { label: "Active", value: 1 },
            { label: "Inactive", value: 2 },
          ]}
          onChange={handleInputChange}
          label="Status:"
          value={status}
        />
      </form>
    </Modal>
  );
};

export default ModalAo;
