import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { update, fetchPromotions } from "../../../store/slice/KhuyenMaiReducer";

const ModalKhuyenMaiDetail = ({ visible, closeModal, KhuyenMais }) => {
  const dispatch = useDispatch();

  const [idState, setId] = useState('');
  const [codeState, setCode] = useState('');
  const [nameState, setName] = useState('');
  const [discountAmountState, setDiscountAmount] = useState('');
  const [discountPercentState, setDiscountPercent] = useState('');
  const [startDateState, setStartDate] = useState('');
  const [endDateState, setEndDate] = useState('');
  const [statusState, setStatus] = useState('');

  useEffect(() => {
    if (KhuyenMais) {
      setId(KhuyenMais.id);
      setCode(KhuyenMais.code);
      setName(KhuyenMais.name);
      setDiscountAmount(KhuyenMais.discountAmount);
      setDiscountPercent(KhuyenMais.discountPercent);
      setStartDate(KhuyenMais.startDate);
      setEndDate(KhuyenMais.endDate);
      setStatus(KhuyenMais.status);
    }
  }, [KhuyenMais]);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [payload, setPayload] = useState({
    code: "",
    name: "",
    discountAmount: "",
    discountPercent: "",
    startDate: null,
    endDate: null,
    value: "",
  });

  const handleCancel = () => {
    setPayload({
      code: "",
      name: "",
      discountAmount: "",
      discountPercent: "",
      startDate: null,
      endDate: null,
      value: "",
    });
    closeModal();
    form.resetFields();
  };

  return (
    <Modal
      title="Update Promotion"
      open={visible}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={[
        <Button onClick={handleCancel}>Cancel</Button>
      ]}
    >
      <Form>
        <h4>ID:</h4>
        <Input
          name="id"
          value={idState}
          disabled
        />
        <h4>Code Promotion:</h4>
        <Input
          name="code"
          value={codeState}
          disabled
        />
        <h4>Name Promotion:</h4>
        <Input
          name="name"
          value={nameState}
          disabled
        />
        <h4>discountAmount Promotion:</h4>
        <Input
          name="discountAmount"
          value={discountAmountState}
          disabled
        />
        <h4>discountPercent Promotion:</h4>
        <Input
          name="discountPercent"
          value={discountPercentState}
          disabled
        />
        <h4 className="mt-3">StartDate Promotion:</h4>
        <Input
          name="startDate"
          label="StartDate:"
          type="Date"
          value={startDateState}
          disabled
        />
        <h4 className="mt-3">EndDate promotion:</h4>
        <Input
          name="endDate"
          label="EndDate:"
          type="Date"
          value={endDateState}
          disabled
        />
        <div className="mt-3 d-flex">
          <h4>Status:</h4>
          <Select className="ms-4"
            value={statusState == "0" ? "chưa hoạt động" : statusState == "1" ? "đang hoạt động" : "hết hạn"}
            disabled
          >
          </Select>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalKhuyenMaiDetail;
