import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { add } from "../../../../store/slice/ChatLieuReducer";
import { fetchMaterials } from "../../../../store/slice/ChatLieuReducer";
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
      await dispatch(add(payload));
      message.success("Material added successfully");
      closeModal();
      setPayload({
        code:"",
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
      code:"",
      name: "",
      description: "",
    });
    closeModal();
    form.resetFields();
  };

  

  return (
    <Modal
      title="Thêm mới chất liệu"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <form>
        <h4>Code material:</h4>
        <Input
          name="code"
          label="code:"
          placeholder="Input code Material"
          onChange={(e) => setPayload({ ...payload, code: e.target.value })}

        />
        <h4 className="mt-3">Name material:</h4>
        <Input
          name="name"
          label="name:"
          placeholder="Input name matertial"
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}

        />
        <h4 className="mt-3">Desciption material:</h4>
        <Input
          name="desciption"
          label="desciption :"
          placeholder="Nhập mieu tả"
          onChange={(e) => setPayload({ ...payload, description: e.target.value })}

        />
        {/* <div className="mt-3 d-flex">
          <h4>Status:</h4>
          <Select className="ms-4" defaultValue={null}>
            <option disabled value={null}>Chọn trạng thái</option>
            <option value={1}>Còn Hàng</option>
            <option value={0}>Hết Hàng</option>
          </Select>
        </div> */}
      </form>
    </Modal>
  );
};

export default ModalChatLieu;
