import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, message, Date } from "antd";
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
    discountAmount: "",
    discountPercent: "",
    startDate: null,
    endDate: null,
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
        code: "",
        name: "",
        discountAmount: "",
        discountPercent: "",
        startDate: null,
        endDate: null,
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
      code: "",
      name: "",
      discountAmount: "",
      discountPercent: "",
      startDate: null,
      endDate: null,
    });
    closeModal();
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="Add promotion"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <form>
          <h4 className="mt-3">Code promotion:</h4>
          <Input
            name="code"
            label="code:"
            placeholder="Input code matertial"
            onChange={(e) => setPayload({ ...payload, code: e.target.value })}
            required
          />
          <h4 className="mt-3">Name promotion:</h4>
          <Input
            name="name"
            label="name:"
            placeholder="Input name matertial"
            onChange={(e) => setPayload({ ...payload, name: e.target.value })}
            required
          />
          <h4 className="mt-3">discountAmount promotion:</h4>
          <Input
            name="discountAmount"
            label="discountAmount:"
            placeholder="Input value matertial"
            onChange={(e) => setPayload({ ...payload, discountAmount: e.target.value })}
            required
          />
          <h4 className="mt-3">discountPercent promotion:</h4>
          <Input
            name="discountPercent"
            label="discountPercent:"
            placeholder="Input value matertial"
            onChange={(e) => setPayload({ ...payload, discountPercent: e.target.value })}
            required
          />
          <h4 className="mt-3">Startdate promotion:</h4>
          <Input
            name="startDate"
            label="startDate:"
            // placeholder="Input name matertial"
            type="Date"
            onChange={(e) => setPayload({ ...payload, startDate: e.target.value })}
            required
          />
          <h4 className="mt-3">Enddate promotion:</h4>
          <Input
            name="endDate"
            label="endDate:"
            // placeholder="Input name matertial"
            type="Date"
            onChange={(e) => setPayload({ ...payload, endDate: e.target.value })}
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
