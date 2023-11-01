import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import InputField from "../../../form/InputField";
import RadioComponent from "../../../form/RadioField";
import { useDispatch } from "react-redux";
import { updateChatLieu } from "../../../../store/slice/ChatLieuSlice";
import {
  DangerButton,
  PrimaryButton,
  DefaultButton,
} from "../../../form/CustomButton";

const ModalChatLieuEdit = ({ visible, onCancel, chatLieus, onUpdateComplete }) => {
  const dispatch = useDispatch();

  // Destructure the colors array
  const [id, code, name, description, status] = chatLieus;

  const [codeState, setCode] = useState(code);
  const [nameState, setName] = useState(name);
  const [descriptionState, setDescription] = useState(description);
  const [statusState, setStatus] = useState(status);

  console.log("chat lieu in edit", chatLieus);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();
  useEffect(() => {
    // Update state variables when 'chatLieus' prop changes
    if (visible) {
      const [id, code, name, description, status] = chatLieus;
      setCode(code);
      setName(name);
      setDescription(description);
      setStatus(status);
    }
  }, [visible, chatLieus]);

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

    dispatch(updateChatLieu(updatedData));
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

    dispatch(updateChatLieu(updatedData));
    onCancel();
    if (onUpdateComplete) {
      onUpdateComplete();
    }
  };

  return (
    <Modal
      title="Modal material"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <DangerButton key="delete" type="danger" onClick={handleDelete}>
          Delete
        </DangerButton>,
        <DefaultButton key="cancel" onClick={onCancel}>
          Cancel
        </DefaultButton>,
        <PrimaryButton key="ok" type="primary" onClick={handleUpdate}>
          OK
        </PrimaryButton>,
      ]}
    >
      <form>
        <InputField
          name="code"
          label="Mã material:"
          placeholder="Nhập mã material"
          onChange={(e) => setCode(e.target.value)}
          value={codeState}
        />
        <InputField
          name="name"
          label="Tên material:"
          placeholder="Nhập tên material"
          customStyle={{
            width: "450px",
            marginRight: "10px",
          }}
          onChange={(e) => setName(e.target.value)}
          value={nameState}
        />
        <InputField
          name="description"
          label="Mô tả material:"
          placeholder="Nhập mô tả material"
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

export default ModalChatLieuEdit;
