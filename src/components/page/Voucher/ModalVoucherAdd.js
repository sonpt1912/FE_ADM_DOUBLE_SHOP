import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message, DatePicker,TimePicker ,Radio} from "antd";
import { useDispatch } from "react-redux";
import { saveVoucher } from "../../../config/VoucherApi";
import moment from "moment";
const { TextArea } = Input;

const ModalAddVoucher = ({ open, closeModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [discountType, setDiscountType] = useState("amount"); // Lưu loại giảm giá đang được chọn

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value); // Cập nhật loại giảm giá đang được chọn khi người dùng thay đổi
  };


  const onDateTimeChange = (date, dateString) => {
    console.log(date, dateString);
    setPayload({
      ...payload,
      startDate: moment(dateString).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(dateString).format("YYYY-MM-DD HH:mm:ss")
    });
  };
  const [payload, setPayload] = useState({
     name:"",
     discountAmount:"",
     discountPercent:"",
     quantity:"",
     minimumOrder:"",
     startDate:"",
     endDate:""
  });

  const handleOk = async () => {
   
    try {
      setConfirmLoading(true);
      const formValues = await form.validateFields();
         // Kiểm tra giảm giá theo tiền không được nhỏ hơn giá trị đơn tối thiểu
         if (formValues.discountAmount > formValues.minimumOrder) {
          message.error("Giảm giá theo tiền không được lớn hơn giá trị đơn tối thiểu");
          return;
      }
             // Kiểm tra giảm giá theo tiền và giảm giá theo phần trăm không được nhập số âm
             if (formValues.discountType === "amount" && formValues.discountAmount < 0) {
              message.error("Giảm giá theo tiền không được là số âm");
              return;
          }
          if (formValues.discountType === "percent" && formValues.discountPercent < 0) {
              message.error("Giảm giá theo phần trăm không được là số âm");
              return;
          }
  
          // Kiểm tra số lượng và giá trị đơn tối thiểu không được là số âm
          if (formValues.quantity < 0) {
              message.error("Số lượng không được là số âm");
              return;
          }
          if (formValues.minimumOrder < 0) {
              message.error("Giá trị đơn tối thiểu không được là số âm");
              return;
          }
    
       // Kiểm tra nếu loại giảm giá là theo phần trăm và giảm giá lớn hơn 70%
    if (discountType === "percent" && formValues.discountPercent > 70) {
      message.error("Giảm giá theo phần trăm không được lớn hơn 70%");
      return; // Ngăn việc tiếp tục thực hiện lưu dữ liệu
    }
   
      await dispatch(saveVoucher({ ...formValues, discountType }));
      message.success("Voucher added successfully");
      closeModal();
      
      form.resetFields();
    } catch (error) {
      message.error("Please fill in all required fields");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setPayload({
      name:"",
      discountAmount:"",
      discountPercent:"",
      quantity:"",
      minimumOrder:"",
      startDate:"",
      endDate:""
    });
    closeModal();
    form.resetFields();
  };
  

  return (
    <Modal
      title="Thêm Mới phiếu giảm giá"
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
      >
       
        <Form.Item
          label="Tên phiếu giảm giá"
          name="name"
          labelAlign="left" // Đảm bảo nhãn được căn chỉnh ở đầu dòng
          labelCol={{
            span: 9, // Đặt chiều rộng cho nhãn
          }}
      
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên phiếu giảm giá"
            }
          ]}
          onChange={(e) =>
            setPayload({ ...payload, name: e.target.value })
          }
        >
          <Input />
        </Form.Item>
     
          <Form.Item label="Loại giảm giá" required="true" labelCol={{ span: 9 }} labelAlign="left">
          <Radio.Group onChange={handleDiscountTypeChange} value={discountType} style={{ display: 'flex', flexDirection: 'column' }}>
            <Radio value="amount" >Giảm theo tiền</Radio>
            <Radio value="percent">Giảm theo phần trăm</Radio>
          </Radio.Group>
        </Form.Item>

        {discountType === "amount" && (
          <Form.Item
          labelAlign="left" // Đảm bảo nhãn được căn chỉnh ở đầu dòng
          onChange={(e) =>
            setPayload({ ...payload, discountAmount: e.target.value })
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giảm giá theo tiền"
            }
          ]}
          labelCol={{
            span: 9, // Đặt chiều rộng cho nhãn
          }}
            label="Giảm giá theo tiền"
            name="discountAmount"
            // Rest of your code
          >
            <Input type="number" placeholder="VNĐ" 
          

            />
          </Form.Item>
        )}

        {discountType === "percent" && (
          <Form.Item
          labelAlign="left" // Đảm bảo nhãn được căn chỉnh ở đầu dòng
          onChange={(e) =>
            setPayload({ ...payload, discountPercent: e.target.value })
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giảm giá theo phần trăm"
            }
          ]}
          labelCol={{
            span: 9, // Đặt chiều rộng cho nhãn
          }}
            label="Giảm giá theo phần trăm"
            name="discountPercent"
            // Rest of your code
          >
            <Input type="number" placeholder="%"/>
          </Form.Item>
        )}
       
        <Form.Item
          label="Số lượng "
          name="quantity"
          labelAlign="left" // Đảm bảo nhãn được căn chỉnh ở đầu dòng
          labelCol={{
            span: 9, // Đặt chiều rộng cho nhãn
          }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng phiếu giảm giá"
            }
          ]}
          onChange={(e) =>
         
            setPayload({ ...payload, quantity: e.target.value })
          }
        >
          <Input type="number" min={0}/>
          
        </Form.Item>
        <Form.Item
          label="Giá trị đơn tối thiểu"
          name="minimumOrder"
          labelAlign="left" // Đảm bảo nhãn được căn chỉnh ở đầu dòng
          labelCol={{
            span: 9, // Đặt chiều rộng cho nhãn
          }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá trị đơn tối thiểu"
            }
          ]}
          onChange={(e) =>
         
            setPayload({ ...payload, minimumOrder: e.target.value })
          }
        >
          <Input type="number" placeholder="VNĐ"/>
          
        </Form.Item>
        <Form.Item
          label="Ngày bắt đầu"
          name="startDate"
          labelAlign="left" // Đảm bảo nhãn được căn chỉnh ở đầu dòng
          labelCol={{
            span: 9, // Đặt chiều rộng cho nhãn
          }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ngày bắt đầu"
            }
          ]}
        
        >
          <DatePicker showTime={{ format: 'HH:mm:ss' }} onChange={onDateTimeChange} format="YYYY-MM-DD HH:mm:ss"/>
        </Form.Item>
        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          labelAlign="left" // Đảm bảo nhãn được căn chỉnh ở đầu dòng
          labelCol={{
            span: 9, // Đặt chiều rộng cho nhãn
          }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ngày kết thúc"
            }
          ]}
          
        >
          <DatePicker showTime={{ format: 'HH:mm:ss' }} onChange={onDateTimeChange}  format="YYYY-MM-DD HH:mm:ss"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddVoucher;
