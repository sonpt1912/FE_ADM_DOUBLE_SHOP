import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message, Select, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { updateVoucher } from "../../../config/api2";
import moment from 'moment';
import 'moment/locale/vi'; // Import Vietnamese locale data
const { TextArea } = Input;

const ModalUpdateVoucher = ({ open, closeModal, payload }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [updatedValues, setUpdatedValues] = useState({
    name: "",
    quantity:"",
    discountAmount:"",
    discountPercent:"",
    minimumOrder:"",
    startDate:"",
    endDate:""
  });
  const [editableDiscountAmount, setEditableDiscountAmount] = useState(true);
  const [editableDiscountPercent, setEditableDiscountPercent] = useState(true);


const handleChange = (date, dateString) => {
  setUpdatedValues(prevState => ({
    ...prevState,
    startDate: dateString,
    endDate: dateString
  }));
};
  useEffect(() => {
    form.setFieldsValue({
      code: payload.code,
      name:payload.name,
      quantity:payload.quantity,
      discountAmount:payload.discountAmount,
      discountPercent:payload.discountPercent,
      minimumOrder:payload.minimumOrder,
      startDate: payload.startDate ? moment(payload.startDate) : null,
      endDate: payload.endDate ? moment(payload.endDate) : null,
      status: payload.status,
    });
    setEditableDiscountAmount(payload.discountAmount > 0);
    setEditableDiscountPercent(payload.discountPercent > 0);
  }, [form, payload]);

  const handleValuesChange = (_, allValues) => {
    setUpdatedValues({
      name: allValues.name,
   
    quantity:allValues.quantity,
    discountAmount:allValues.discountAmount,
    discountPercent:allValues.discountPercent,
    minimumOrder:allValues.minimumOrder,
    startDate: allValues.startDate ? moment(allValues.startDate).format("YYYY-MM-DD HH:mm:ss") : "",
    endDate: allValues.endDate ? moment(allValues.endDate).format("YYYY-MM-DD HH:mm:ss") : ""
      
    });
  };
   
  const handleOk = async () => {
    try {
     
      const formValues = await form.validateFields();
      setConfirmLoading(true);
      await dispatch(updateVoucher({ ...formValues, ...updatedValues }));
      message.success("Voucher updated successfully");
      closeModal();
      form.resetFields();
    } catch (error) {
      message.error("Please fill in all required fields");
    } finally {
      // closeModal();
      // form.resetFields();
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  return (
    <Modal
      title="Cập Nhật phiếu giảm giá"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      
    >
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 17,
        }}
        style={{
          maxWidth: 1000,
          marginTop: "30px",
        }}
        onValuesChange={handleValuesChange}
      >
        <Form.Item label="Mã" name="code" labelCol={{span:9}} wrapperCol={{span:16}} labelAlign="left"
         rules={[
          {
            required: true,
            message: "Vui lòng nhập mã giảm giá"
          }
        ]}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item label="Tên" name="name" labelCol={{span:9}} wrapperCol={{span:16}} labelAlign="left" 
        rules={[
            {
              required: true,
              message: "Vui lòng nhập tên phiếu giảm giá"
            }
          ]}>
          <Input />
        </Form.Item>
        {payload.discountAmount !== 0 && (
        <Form.Item label="Giá trị giảm (VNĐ)" name="discountAmount" labelCol={{span:9}} wrapperCol={{span:16}} labelAlign="left"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập giá trị giảm"
          }
        ]}
        >
  <Input  disabled={!editableDiscountAmount} type="number"/>
</Form.Item>)}
{payload.discountPercent !== 0 && (
<Form.Item label="Giảm theo phần trăm (%)" name="discountPercent" labelCol={{span:9}} wrapperCol={{span:16}} labelAlign="left"
rules={[
  {
    required: true,
    message: "Vui lòng nhập giảm giá theo phần trăm"
  }
]}
>
  <Input  disabled={!editableDiscountPercent} type="number"/>
</Form.Item>)}
<Form.Item label="Hoá đơn tối thiểu (VNĐ)" name="minimumOrder" labelCol={{span:9}} wrapperCol={{span:16}} labelAlign="left"
rules={[
  {
    required: true,
    message: "Vui lòng nhập hoá đơn tối thiểu"
  }
]}
>
          <Input type="number"/>
        </Form.Item>

        <Form.Item label="Số lượng " name="quantity" labelCol={{span:9}} wrapperCol={{span:16}} labelAlign="left"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số lượng"
          }
        ]}
        >
          <Input type="number"/>
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" name="startDate" labelCol={{span:9}} wrapperCol={{span:16}} labelAlign="left"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập ngày bắt đầu"
          }
        ]}
        >
        <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime onChange={handleChange} />


        </Form.Item>
        <Form.Item label="Ngày kết thúc" name="endDate" labelCol={{span:9}} wrapperCol={{span:16}} labelAlign="left"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập ngày kết thúc"
          }
        ]}
        >
        <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime onChange={handleChange} 
          />

        </Form.Item>
       
      </Form>
    </Modal>
  );
};

export default ModalUpdateVoucher;

