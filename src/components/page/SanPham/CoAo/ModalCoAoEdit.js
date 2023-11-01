import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import InputField from "../../../form/InputField";
import RadioComponent from "../../../form/RadioField";
import { useDispatch } from "react-redux";
import { updateCoAo } from "../../../../store/slice/CoAoSlice";
import {
  DangerButton,
  PrimaryButton,
  DefaultButton,
} from "../../../form/CustomButton";

const ModalCoAoEdit = ({ visible, onCancel, coAos, onUpdateComplete }) => {
  const dispatch = useDispatch();

  // Destructure the colors array
  const [id, code, name, description, status] = coAos;

  const [codeState, setCode] = useState(code);
  const [nameState, setName] = useState(name);
  const [descriptionState, setDescription] = useState(description);
  const [statusState, setStatus] = useState(status);

  console.log("collar in edit", coAos);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();
  useEffect(() => {
    // Update state variables when 'collars' prop changes
    if (visible) {
      const [id, code, name, description, status] = coAos;
      setCode(code);
      setName(name);
      setDescription(description);
      setStatus(status);
    }
  }, [visible, coAos]);

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

    dispatch(updateCoAo(updatedData));
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

    dispatch(updateCoAo(updatedData));
    onCancel();
    if (onUpdateComplete) {
      onUpdateComplete();
    }
  };

  return (
    <Modal
      title="Modal collar"
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
          label="Mã collar:"
          placeholder="Nhập mã collar"
          onChange={(e) => setCode(e.target.value)}
          value={codeState}
        />
        <InputField
          name="name"
          label="Tên collar:"
          placeholder="Nhập tên collar"
          customStyle={{
            width: "450px",
            marginRight: "10px",
          }}
          onChange={(e) => setName(e.target.value)}
          value={nameState}
        />
        <InputField
          name="description"
          label="Mô tả collar:"
          placeholder="Nhập mô tả collar"
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

export default ModalCoAoEdit;
