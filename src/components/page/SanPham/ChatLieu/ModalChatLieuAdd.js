import React, { useState } from "react";
import { Modal, Button, Radio, Input, Select } from "antd";
import { useDispatch } from "react-redux";
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { values } from "lodash";

const ModalChatLieu = ({ visible, onCancel, onUpdateComplete }) => {
  const dispatch = useDispatch();
  const [maChatLieu, setMaChatLieu] = useState("");
  const [tenChatLieu, setTenChatLieu] = useState("");
  const [mieuTa, setMieuTa] = useState("");
  const [trangThai, setTrangThai] = useState(1);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "trangThai") {
      setTrangThai(parseInt(value));
    } else if (name === "maChatLieu") {
      setMaChatLieu(value);
    } else if (name === "tenChatLieu") {
      setTenChatLieu(value);
    } else if (name === "mieuTa") {
      setMieuTa(value);
    }
  };

  const handleOk = () => {
    const formData = {
      maChatLieu: maChatLieu,
      tenChatLieu: tenChatLieu,
      mieuTa: mieuTa,
      createdBy: 1,
      updated_by: 1,
      createdTime: currentDateTimeString,
      updatedTime: "",
      trangThai: trangThai,
    };
    setMaChatLieu("");
    setTenChatLieu("");
    setMieuTa("");
    onCancel();
    // if (onUpdateComplete) {
    //   onUpdateComplete(); // Gọi hàm callback từ component cha
    // }
  };

  return (
    <Modal
      title="Thêm mới chất liệu"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary"
          onClick={handleOk}
        >
          OK
        </Button>,
      ]}
    >
      <form>
        <h4>Mã Chất Liêu:</h4>
        <Input
          name="maChatLieu"
          label="ma ChatLieu :"
          placeholder="Nhập mã chất liệu"
          onChange={handleInputChange}
          value={maChatLieu}
        />
        <h4 className="mt-3">Tên Chất Liệu:</h4>
        <Input
          name="tenChatLieu"
          label="ten ChatLieu :"
          placeholder="Nhập Tên chất liệu"
          onChange={handleInputChange}
          value={tenChatLieu}
        />
        <h4 className="mt-3">Mô tả chất liệu:</h4>
        <Input
          name="mieuTa"
          label="moTa :"
          placeholder="Nhập mieu tả"
          onChange={handleInputChange}
          value={mieuTa}
        />
        <div className="mt-3 d-flex">
          <h4>Trạng thái:</h4>
          <Select className="ms-4" defaultValue={null}>
            <option disabled value={null}>Chọn trạng thái</option>
            <option value={1}>Còn Hàng</option>
            <option value={0}>Hết Hàng</option>
          </Select>
        </div>
        {/* <div className="d-flex">
          <h5>Còn hàng</h5>
          <Radio className="ms-4"
            name="trangThai"
            options={[
              { label: "Active", value: 1 },
              { label: "Inactive", value: 2 },
            ]}
            onChange={handleInputChange}
            label="trạng thái:"
            value={trangThai}
          />
          <h3>|</h3>
          <h5>Hết hàng</h5>
          <Radio className="ms-4"
            name="trangThai"
            options={[
              { label: "Active", value: 1 },
              { label: "Inactive", value: 2 },
            ]}
            onChange={handleInputChange}
            label="trạng thái:"
            value={trangThai}
          />
        </div> */}
      </form>
    </Modal>
  );
};

export default ModalChatLieu;
