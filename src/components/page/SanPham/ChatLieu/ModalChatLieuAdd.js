import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { add, fetchMaterials } from "../../../../store/slice/ChatLieuReducer";
//bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { values } from "lodash";

const ModalChatLieu = ({ open, closeModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [payload, setPayload] = useState({
    code: "",
    name: "",
    description: "",
  });

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await dispatch(add(payload)).then(() => {
        dispatch(
          fetchMaterials({
            page: 0,
            pageSize: 5,
          })
        );
      });
      message.success("Material added successfully");
      closeModal();
      setPayload({
        code: "",
        name: "",
        description: "",
      });
      form.resetFields();
    } catch (error) {
      message.error("Failed to add Material");
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
    <div>
      <Modal
        title="Thêm mới chất liệu"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={null}
        confirmLoading={confirmLoading}
      >
        <form>
          <h4>Mã:</h4>
          <Input
            name="code"
            label="code:"
            placeholder="Input code Material"
            onChange={(e) => setPayload({ ...payload, code: e.target.value })}
            required
          />
          <h4 className="mt-3">Tên:</h4>
          <Input
            name="name"
            label="name:"
            placeholder="Input name matertial"
            onChange={(e) => setPayload({ ...payload, name: e.target.value })}
            required
          />
          <h4 className="mt-3">Mô tả:</h4>
          <Input
            name="desciption"
            label="desciption :"
            placeholder="Nhập mieu tả"
            onChange={(e) =>
              setPayload({ ...payload, description: e.target.value })
            }
            required
          />

        </form>
      </Modal>
    </div>
  );
};

export default ModalChatLieu;
