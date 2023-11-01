import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import InputField from "../../../form/InputField";
import RadioComponent from "../../../form/RadioField";
import { useDispatch } from "react-redux";
import { updateAo } from "../../../../store/slice/AoSlice";
import {
  DangerButton,
  PrimaryButton,
  DefaultButton,
} from "../../../form/CustomButton";

const ModalAoEdit = ({ visible, onCancel, aos, onUpdateComplete }) => {
  const dispatch = useDispatch();

  // Destructure the colors array
  const [id, name, status] = aos;

  const [nameState, setName] = useState(name);
  const [statusState, setStatus] = useState(status);

  console.log("ao in edit", aos);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();
  useEffect(() => {
    // Update state variables when 'aos' prop changes
    if (visible) {
      const [id, name, status] = aos;
      setName(name);
      setStatus(status);
    }
  }, [visible, aos]);

  const handleUpdate = () => {
    const updatedData = {
      id: id,
      name: nameState,
      status: statusState,
      updatedTime: currentDateTimeString,
      createdBy: 1,
      updated_by: 1,
      createdTime: currentDateTimeString,
    };

    dispatch(updateAo(updatedData));
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
      name: nameState,
      updatedTime: currentDateTimeString,
      createdBy: 1,
      updated_by: 1,
      createdTime: currentDateTimeString,
    };

    dispatch(updateAo(updatedData));
    onCancel();
    if (onUpdateComplete) {
      onUpdateComplete();
    }
  };

  return (
    <Modal
      title="Modal ao"
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
          name="name"
          label="Tên ao:"
          placeholder="Nhập tên ao"
          customStyle={{
            width: "450px",
            marginRight: "10px",
          }}
          onChange={(e) => setName(e.target.value)}
          value={nameState}
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

export default ModalAoEdit;
