import React from "react";
import { Modal, Button } from "antd";

const ModalTest = ({ visible, onCancel }) => {
  return (
    <Modal
      title="Modal Title"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={onCancel}>
          OK
        </Button>,
      ]}
    >
      {/* Add your modal content here */}
      <p>This is the modal content.</p>
    </Modal>
  );
};

export default ModalTest;
