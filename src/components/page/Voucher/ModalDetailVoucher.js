import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, Select, ColorPicker, message, DatePicker } from 'antd';
import { detailVoucher,updateVoucher } from '../../../config/VoucherApi';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
const { Option } = Select;



const ModalVoucherDetail = ({ isOpen, onCancel1, vouchers }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
 
  const [name,setName]=useState('');
  const [quantity,setQuantity]=useState('');
  const[discountAmount,setDiscountAmount]=useState('');
  const [discountPercent,setDiscountPercent]=useState('');
  const[startDate,setStartDate]=useState('');
  const[endDate,setEndDate]=useState('');
  const [status, setStatus] = useState('');
  const [createtime, setCreateTime] = useState('');
  const[minimumOrder,setMinimumOrder]=useState('');
  const [id, setId] = useState("")
  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss"); // Định dạng ngày tháng theo ý muốn, ví dụ: "YYYY-MM-DD HH:mm:ss"
  };
  useEffect(() => {
    
    if (vouchers) {
    
        setName(vouchers.name);
      setQuantity(vouchers.quantity);
      setDiscountAmount(vouchers.discountAmount);
      setDiscountPercent(vouchers.discountPercent);
      setStartDate(vouchers.startDate);
      setEndDate(vouchers.endDate);
      setStatus(vouchers.status); 
      setMinimumOrder(vouchers.minimumOrder);
      setId(vouchers.id);
    }
  }, [vouchers]);


  const handleCancel = () => {
    onCancel1();
    form.resetFields();
  };
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (

<Modal
      title="Chi tiết phiếu giảm giá"
      open={isOpen}
      onCancel={handleCancel}
   
    >
      <form>
       
           <h4>Tên phiếu giảm giá</h4>
        <Input 
        showText 
        value={name}
        
         />
        
        <h4 className="mt-3">Giảm theo tiền</h4>
        <Input
          name="discountAmount"
         
          value={`${formatNumberWithCommas(discountAmount)} VNĐ`}          />
          
          <h4 className="mt-3">Giảm theo phần trăm</h4>
        <Input
          name="discountPercent"
         
          value={`${(discountPercent)} %`}          />
           <h4 className="mt-3">Số lượng </h4>
        <Input
          name="quantity"
          
         value={quantity}
          />
          <h4 className="mt-3">Giá trị đơn tối thiểu</h4>
        <Input
          name="minimumOrder"
         
          value={`${formatNumberWithCommas(minimumOrder)} VNĐ`}
          />
          

           <h4 className="mt-3">Trạng thái</h4>
          <Input value={status == 1 ? "Hoạt động" : "Không hoạt động"}></Input>
          <h4 className="mt-3">Ngày bắt đầu</h4>
        <Input
          name="startDate"
         
         value={moment(formatDate(startDate))}
        
          />
           <h4 className="mt-3">Ngày kết thúc</h4>
            <Input
          name="endDate"
         
         value={moment(formatDate(endDate))}
         
          />
          
      </form>
    </Modal>);};
export default ModalVoucherDetail;