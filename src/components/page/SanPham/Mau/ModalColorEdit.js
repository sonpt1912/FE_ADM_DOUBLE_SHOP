import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import InputField from "../../../form/InputField";
import RadioComponent from "../../../form/RadioField";
import { useDispatch } from "react-redux";
import { updateColor } from "../../../../store/slice/ColorSlice";

const ModalColorEdit = ({ visible, onCancel, colors, onUpdateComplete }) => {
  const dispatch = useDispatch();

  // Destructure the colors array
  const [id, code, name, description, status] = colors;

  const [codeState, setCode] = useState(code);
  const [nameState, setName] = useState(name);
  const [descriptionState, setDescription] = useState(description);
  const [statusState, setStatus] = useState(status);

  console.log("color in edit", colors);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();
  useEffect(() => {
    // Update state variables when 'colors' prop changes
    if (visible) {
      const [id, code, name, description, status] = colors;
      setCode(code);
      setName(name);
      setDescription(description);
      setStatus(status);
    }
  }, [visible, colors]);

  const handleUpdate = () => {
    const updatedData = {
      id: id,
      code: codeState,
      name: nameState,
      description: descriptionState,
      status: statusState,
      updatedTime: currentDateTimeString,
      createdBy: 1,
      updated_by: 1,
      createdTime: currentDateTimeString,
    };

    dispatch(updateColor(updatedData));
    onCancel();
    if (onUpdateComplete) {
      onUpdateComplete();
    }
  };

  const handleDelete = () => {
    // Cập nhật trường status thành 2
    const updatedStatus = 2;

    const updatedData = {
      id: id,
      status: updatedStatus,
      code: codeState,
      name: nameState,
      description: descriptionState,
      updatedTime: currentDateTimeString,
      createdBy: 1,
      updated_by: 1,
      createdTime: currentDateTimeString,
    };

    dispatch(updateColor(updatedData));
    onCancel();
    if (onUpdateComplete) {
      onUpdateComplete();
    }
  };

  return (
    <Modal
      title="Modal Color"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="delete" type="danger" onClick={handleDelete}>
          Delete
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleUpdate}>
          OK
        </Button>,
      ]}
    >
      <form>
        <InputField
          name="code"
          label="Mã màu:"
          placeholder="Nhập mã màu"
          onChange={(e) => setCode(e.target.value)}
          value={codeState}
        />
        <InputField
          name="name"
          label="Tên màu:"
          placeholder="Nhập tên màu"
          customStyle={{
            width: "450px",
            marginRight: "10px",
          }}
          onChange={(e) => setName(e.target.value)}
          value={nameState}
        />
        <InputField
          name="description"
          label="Mô tả màu:"
          placeholder="Nhập mô tả màu"
          customStyle={{
            width: "450px",
            marginRight: "10px",
          }}
          onChange={(e) => setDescription(e.target.value)}
          value={descriptionState}
        />
        <RadioComponent
          name="status"
          options={[
            { label: "Hoạt động", value: 1 },
            { label: "Ngưng hoạt động", value: 2 },
          ]}
          onChange={(e) => setStatus(parseInt(e.target.value))}
          value={statusState}
        />
      </form>
    </Modal>
  );
};

export default ModalColorEdit;
