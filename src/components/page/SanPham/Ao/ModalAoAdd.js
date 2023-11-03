import React, { useState } from "react";
import { Modal, Button } from "antd";
import InputField from "../../../form/InputField";
import RadioComponent from "../../../form/RadioField";
import { useDispatch } from "react-redux";
import { addColor } from "../../../../store/slice/ColorSlice";

const ModalAo = ({ visible, onCancel, onUpdateComplete }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "status") {
      setStatus(parseInt(value));
    } else if (name === "code") {
      setCode(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleOk = () => {
    const formData = {
      code: code,
      name: name,
      description: description,
      createdBy: 1,
      updated_by: 1,
      createdTime: currentDateTimeString,
      updatedTime: "",
      status: status,
    };
    dispatch(addColor(formData));
    setCode("");
    setName("");
    setDescription("");
    onCancel();
    if (onUpdateComplete) {
      onUpdateComplete(); // Gọi hàm callback từ component cha
    }
  };

  /// api get brand
  /// api get collar
  /// api get color
  /// api get size
  /// api get matterial

  return (
    <Modal
      title="Modal Color"
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
          name="code"
          label="Code Color :"
          placeholder="Enter code color"
          onChange={handleInputChange}
          value={code}
        />
        <InputField
          name="name"
          label="Name Color :"
          placeholder="Enter name color"
          customStyle={{
            width: "450px",
            marginRight: "10px",
          }}
          onChange={handleInputChange}
          value={name}
        />
        <InputField
          name="description"
          label="Description Color :"
          placeholder="Enter description color"
          customStyle={{
            width: "450px",
            marginRight: "10px",
          }}
          onChange={handleInputChange}
          value={description}
        />
        <RadioComponent
          name="status"
          options={[
            { label: "Active", value: 1 },
            { label: "Inactive", value: 2 },
          ]}
          onChange={handleInputChange}
          label="Choose a status:"
          value={status}
        />
      </form>
    </Modal>
  );
};

export default ModalAo;
