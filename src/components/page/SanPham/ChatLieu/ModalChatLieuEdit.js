import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { update } from "../../../../store/slice/ChatLieuReducer";

const ModalChatLieuEdit = ({ visible, closeModal, ChatLieus }) => {
  const dispatch = useDispatch();

  // Destructure the colors array
  const [id, code, name, description, status] = ChatLieus;
  const [idState, setId] = useState(id);
  const [codeState, setCode] = useState(code);
  const [nameState, setName] = useState(name);
  const [descriptionState, setDesciption] = useState(description);
  const [statusState, setStatus] = useState(status);

  console.log("ChatLieu in edit", ChatLieus);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();
  useEffect(() => {
    // Update state variables when 'ChatLueu' prop changes
    if (visible) {
      const [id, code, name, description, status] = ChatLieus;
      setId(id);
      setCode(code);
      setName(name);
      setDesciption(description);
      setStatus(status);
    }
  }, [visible, ChatLieus]);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [payload, setPayload] = useState({
    code: "",
    name: "",
    description: "",
  });

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await dispatch(update(payload));
      message.success("Material Updated successfully");
      closeModal();
      setPayload({
        code:"",
        name: "",
        description: "",
      });
      form.resetFields();
    } catch (error) {
      message.error("Failed to Update Material");
    } finally {
      closeModal();
      form.resetFields();

      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setPayload({
      code:"",
      name: "",
      description: "",
    });
    closeModal();
    form.resetFields();
  };

  // const handleUpdate = () => {
  //   const updatedData = {
  //     // id: id,
  //     code: codeState,
  //     name: nameState,
  //     description: descriptionState,
  //     status: statusState,
  //     updatedTime: currentDateTimeString,
  //     createdBy: 1,
  //     updated_by: 1,
  //     createdTime: currentDateTimeString,
  //   };

  //   closeModal();
  //   if (onUpdateComplete) {
  //     onUpdateComplete();
  //   }
  // };

  // const handleDelete = () => {
  //   // Cập nhật trường status thành 0
  //   const updatedStatus = 0;

  //   const updatedData = {
  //     // id: id,
  //     code: codeState,
  //     name: nameState,
  //     description: descriptionState,
  //     status: statusState,
  //     updatedTime: currentDateTimeString,
  //     createdBy: 1,
  //     updated_by: 1,
  //     createdTime: currentDateTimeString,
  //   };

  //   closeModal();
  //   if (onUpdateComplete) {
  //     onUpdateComplete();
  //   }
  // };

  return (
    <Modal
      title="Update chất liệu"
      visible={visible}
      closeModal={closeModal}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={[
        // <Button key="delete" type="danger" onClick={handleDelete}>
        //   Delete
        // </Button>,
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button key="ok" type="primary">
          OK
        </Button>,
      ]}
    >
      <form>
      <h4>ID:</h4>
        <Input
          name="id"
          label="id:"
          // onChange={(e) => setCode(e.target.value)}
          value={idState}
          onChange={(e) => setPayload({ ...payload, code: e.target.value })}
          disabled
        />
      <h4>Mã Chất Liêu:</h4>
        <Input
          name="code"
          label="Mã màu:"
          placeholder="Nhập mã màu"
          // onChange={(e) => setCode(e.target.value)}
          value={codeState}
          onChange={(e) => setPayload({ ...payload, code: e.target.value })}
        />
        <h4 className="mt-3">Tên Chất Liệu:</h4>
        <Input
          name="name"
          label="Name:"
          placeholder="Input name material"
          // onChange={(e) => setName(e.target.value)}
          value={nameState}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
        />
        <h4 className="mt-3">Mô tả chất liệu:</h4>
        <Input
          name="description"
          label="Desciption:"
          placeholder="Input description"
          // onChange={(e) => setDesciption(e.target.value)}
          onChange={(e) => setPayload({ ...payload, description: e.target.value })}
          value={descriptionState}
        />
        <div className="mt-3 d-flex">
          <h4>Trạng thái:</h4>
          <Select className="ms-4"
            // onChange={(e) => setTrangThai(parseInt(e.target.value))}
            value={statusState==0? "Hết Hàng" :"Còn Hàng"}>
              disabled
          </Select>
        </div>
      </form>
    </Modal>
  );
};

export default ModalChatLieuEdit;
