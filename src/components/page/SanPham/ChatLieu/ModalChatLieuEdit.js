import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { update, fetchMaterials } from "../../../../store/slice/ChatLieuReducer";

const ModalChatLieuEdit = ({ visible, closeModal, ChatLieus }) => {
  const dispatch = useDispatch();

  // Destructure the colors array
  // const [id, code, name, description, status] = ChatLieus;
  const [idState, setId] = useState('');
  const [codeState, setCode] = useState('');
  const [nameState, setName] = useState('');
  const [descriptionState, setDesciption] = useState('');
  const [statusState, setStatus] = useState('');

  useEffect(() => {
    // Update state variables when 'ChatLueu' prop changes
    if (ChatLieus) {
      // const [id, code, name, description, status] = ChatLieus;
      setId(ChatLieus.id);
      setCode(ChatLieus.code);
      setName(ChatLieus.name);
      setDesciption(ChatLieus.description);
      setStatus(ChatLieus.status);
    }
  }, [ChatLieus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setStatus(parseInt(value));
    }
    else if (name === "code") {
      setCode(value);
    }
    else if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDesciption(value);
    }
  };

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [payload, setPayload] = useState({
    code: "",
    name: "",
    description: "",
  });

  const handleOk = async () => {
    try {
      const formData = {
        id: idState,
        code: codeState,
        name: nameState,
        createdBy: 1,
        updated_by: 1,
        status: 1,
        description: descriptionState
      };
      setConfirmLoading(true);
      await dispatch(update(formData))
        .then(() => {
          dispatch(
            fetchMaterials({
              page: 0,
              pageSize: 3
            })
          )
        });
      message.success("thành công");
      console.log(update(formData))
      closeModal();
      form.resetFields();
    } catch (error) {
      message.error("Failed to update size");
    } finally {
      closeModal();
      form.resetFields();
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setPayload({
      code: "",
      name: "",
      description: "",
    });
    closeModal();
    form.resetFields();
  };

  return (
    <Modal
      title="Update Material"
      // visible={visible}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      // footer={[
      //   <Button key="cancel" onClick={handleCancel}>
      //     Cancel
      //   </Button>,
      //   <Button key="ok" type="primary" onClick={handleOk}>
      //     OK
      //   </Button>,
      // ]}
    >
      <Form>
        <h4>ID:</h4>
        <Input
          name="id"
          // onChange={(e) => setCode(e.target.value)}
          value={idState}
          disabled
        />
        <h4>Code Material:</h4>
        <Input
          name="code"
          placeholder="Nhập mã màu"
          // onChange={(e) => setCode(e.target.value)}
          value={codeState}
          // onChange={(e) => setPayload({ ...payload, code: e.target.value })}
          onChange={(e) => handleInputChange({
            target: {
              name: 'code', value: e.target.value
            }
          }
          )}
        />
        <h4 className="mt-3">Name Material:</h4>
        <Input
          name="name"
          label="Name:"
          placeholder="Input name material"
          // onChange={(e) => setName(e.target.value)}
          value={nameState}
          onChange={(e) => setName(e.target.value)}
        // onChange={(e) => setPayload({ ...payload, name: e.target.value })}
        />
        <h4 className="mt-3">Description Material:</h4>
        <Input
          name="description"
          label="Desciption:"
          placeholder="Input description"
          onChange={(e) => setDesciption(e.target.value)}
          // onChange={(e) => setPayload({ ...payload, description: e.target.value })}
          value={descriptionState}
        />
        <div className="mt-3 d-flex">
          <h4>Status:</h4>
          <Select className="ms-4"
            // onChange={(e) => setTrangThai(parseInt(e.target.value))}
            value={statusState == 0 ? "Hết Hàng" : "Còn Hàng"}
            disabled
          >
          </Select>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalChatLieuEdit;
