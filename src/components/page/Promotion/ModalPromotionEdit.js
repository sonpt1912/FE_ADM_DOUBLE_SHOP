import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Form, message, Tabs, Col } from "antd";
import { useDispatch } from "react-redux";
import { update, fetchPromotions } from "../../../store/slice/PromotionReducer";
import TabPane from "antd/es/tabs/TabPane";
import { Delete } from "../../../store/slice/DetailPromotionReducer";
import { DeleteOutlined } from "@ant-design/icons";

const ModalKhuyenMaiEdit = ({ visible, closeModal, KhuyenMais }) => {
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
    }
    else if (name === "discountAmount") {
      setDiscountAmount(value);
    }
    else if (name === "discountPercent") {
      setDiscountPercent(value);
    }
    else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [payload, setPayload] = useState({
    code: "",
    name: "",
    discountAmount: "",
    discountPercent: "",
    value: "",
  });

  const handleOk = async () => {
    try {
      const formData = {
        id: idState,
        code: codeState,
        name: nameState,
        discountAmount: discountAmountState,
        discountPercent: discountPercentState,
        startDate: startDateState,
        endDate: endDateState,
        createdBy: 1,
        updated_by: 1,
        status: 1
      };
      if (formData.discountPercent > 100)
        return message.error("Giảm giá theo phần trăm không được lớn hơn 100%");
      setConfirmLoading(true);
      await dispatch(update(formData))
        .then(() => {
          dispatch(
            fetchPromotions({
              page: 0,
              pageSize: 5
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

  const handleDelete = (id) => {
    dispatch(Delete(id))
      .then(() => {
        dispatch(
          fetchPromotions({
            page: 0,
            pageSize: 5,
          })
        )
      });
      window.location.reload();
  };

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
      title="Cập nhập sản phẩm"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
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
            <h4>Mã khuyến mãi:</h4>
            <Input
              name="code"
              placeholder="Input code promotion"
              value={codeState}
              onChange={(e) => handleInputChange({
                target: {
                  name: 'code', value: e.target.value
                }
              }
              )}
            />
            <h4>Tên khuyến mãi:</h4>
            <Input
              name="name"
              placeholder="Input name promotion"
              value={nameState}
              onChange={(e) => handleInputChange({
                target: {
                  name: 'name', value: e.target.value
                }
              }
              )}
            />
            <h4>Giảm giá(%):</h4>
            <Input
              type="number"
              name="discountPercent"
              placeholder="Input value promotion"
              value={discountPercentState}
              onChange={(e) => handleInputChange({
                target: {
                  name: 'discountPercent', value: e.target.value
                }
              }
              )}
            />
            <h4 className="mt-3">Ngày bắt đầu:</h4>
            <Input
              name="startDate"
              placeholder="Input StartDate promotion"
              type="Date"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDateState}
            />
            <h4 className="mt-3">Ngày kết thúc:</h4>
            <Input
              name="endDate"
              placeholder="Input EndDate promotion"
              type="Date"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDateState}
            />
            <div className="mt-3 d-flex">
              <h4>Trạng thái:</h4>
              <Select className="ms-4"
                value={statusState == "0" ? "chưa hoạt động" : statusState == "1" ? "đang hoạt động" : "hết hạn"}
                disabled
              >
              </Select>
            </div>
          </Form>
        </TabPane>
        <TabPane tab="Chi tiết sản phẩm" >
          <div >
            {KhuyenMais && KhuyenMais.detailPromotions.map((t, index) => (
              <div key={index}>
                <h2>Sản phẩm được giảm giá: [{t.detailProduct.product.name}]</h2>
                <p style={{ marginLeft: 30, fontSize: 15 }}>Màu sắc: [{t.detailProduct.color.name}]</p>
                <p style={{ marginLeft: 30, fontSize: 15 }}>Kích cỡ: [{t.detailProduct.size.name}]</p>
                <p style={{ marginLeft: 30, fontSize: 15 }}>Giá trước khi giảm: [{t.detailProduct.price}]</p>
                <p style={{ marginLeft: 30, fontSize: 15 }}>Giá sau khi giảm: [{t.detailProduct.price * (1 - (KhuyenMais.discountPercent) / 100)}]</p>
                <Button
                  
                  icon={<DeleteOutlined />}
                  style={{ border: "none" }}
                  onClick={() => handleDelete(t.id)}
                >Xóa</Button>
                
                <hr></hr>
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>

    </Modal>
  );
};

export default ModalKhuyenMaiEdit;
