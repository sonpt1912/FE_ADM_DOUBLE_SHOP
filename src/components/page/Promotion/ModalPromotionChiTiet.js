import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Form, message, Tabs } from "antd";
import { useDispatch } from "react-redux";
import { update, fetchPromotions } from "../../../store/slice/PromotionReducer";
import TabPane from "antd/es/tabs/TabPane";

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
  // const []
  const [sizeState, setSize] = useState('');
  const [colorState, setColor] = useState('');

  useEffect(() => {
    if (KhuyenMais) {
      // const color = KhuyenMais.detailPromotions.map(i => i.detailProduct.color.name);
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

  const [activeTab, setActiveTab] = useState("form");

  const handleTabChange = (key) => {
    setActiveTab(key);
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
      style={{ border: '3px solid transparent', padding: '0px', height: "1000px", overflow: "auto" }}
    >

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Thông tin" key="form">
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
        </TabPane>
        <TabPane tab="Chi tiết sản phẩm" >
          <div>
            {KhuyenMais && KhuyenMais.detailPromotions.map((t, index) => (
              <div key={index}>
                {/* <h2>Sản phẩm được giảm giá: [{t.detailProduct.product.name}]</h2> */}
                <p style={{ marginLeft: 30, fontSize: 15 }}>Màu sắc: [{t.detailProduct.color.name}]</p>
                <p style={{ marginLeft: 30, fontSize: 15 }}>Kích cỡ: [{t.detailProduct.size.name}]</p>
                <hr></hr>
              </div>
            ))}
          </div>

        </TabPane>
      </Tabs>

    </Modal>
  );
};

export default ModalKhuyenMaiDetail;
