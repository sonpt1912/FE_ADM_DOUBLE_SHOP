import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { add, fetchPromotions } from "../../../store/slice/KhuyenMaiReducer";
import { useFormik } from 'formik';
import * as Yup from 'yup';
//bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { values } from "lodash";

const ModalKhuyenMai = ({ open, closeModal }) => {
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
      await dispatch(add(payload))
        .then(() => {
          dispatch(
            fetchPromotions({
              page: 0,
              pageSize: 5
            })
          )
        });
      message.success("Promotion added successfully");
      closeModal();
      setPayload({
        name: "",
      });
      form.resetFields();
    } catch (error) {
      message.error("Failed to add Promotion");
    } finally {
      closeModal();
      form.resetFields();
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setPayload({
      name: "",
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
          <h4 className="mt-3">Name promotion:</h4>
          <Input
            name="name"
            label="name:"
            placeholder="Input name matertial"
            onChange={(e) => setPayload({ ...payload, name: e.target.value })}
            required
          />

          {/* <Button htmlType="submit" onClick={handleOk}>Update</Button>
            <Button onClick={handleCancel}>Cancel</Button> */}

        </form>
      </Modal>
    </div>
  );
};

export default ModalKhuyenMai;
