import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Radio, Select } from "antd";
import { useDispatch } from "react-redux";

const ModalChatLieuEdit = ({ visible, onCancel, ChatLieus, onUpdateComplete }) => {
  const dispatch = useDispatch();

  // Destructure the colors array
  const [maChatLieu, tenChatLieu, moTa, trangThai] = ChatLieus;

  const [maChatLieuState, setMaChatLieu] = useState(maChatLieu);
  const [tenChatLieuState, setTenChatLieu] = useState(tenChatLieu);
  const [moTaState, setMota] = useState(moTa);
  const [trangThaiState, setTrangThai] = useState(trangThai);

  console.log("ChatLieu in edit", ChatLieus);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();
  useEffect(() => {
    // Update state variables when 'ChatLueu' prop changes
    if (visible) {
      const [maChatLieu, tenChatLieu, moTa, trangThai] = ChatLieus;
      setMaChatLieu(maChatLieu);
      setTenChatLieu(tenChatLieu);
      setMota(moTa);
      setTrangThai(trangThai);
    }
  }, [visible, ChatLieus]);

  const handleUpdate = () => {
    const updatedData = {
      // id: id,
      maChatLieu: maChatLieuState,
      tenChatLieu: tenChatLieuState,
      moTa: moTaState,
      trangThai: trangThaiState,
      updatedTime: currentDateTimeString,
      createdBy: 1,
      updated_by: 1,
      createdTime: currentDateTimeString,
    };

    onCancel();
    if (onUpdateComplete) {
      onUpdateComplete();
    }
  };

  const handleDelete = () => {
    // Cập nhật trường status thành 0
    const updatedStatus = 0;

    const updatedData = {
      // id: id,
      maChatLieu: maChatLieuState,
      tenChatLieu: tenChatLieuState,
      moTa: moTaState,
      trangThai: updatedStatus,
      updatedTime: currentDateTimeString,
      createdBy: 1,
      updated_by: 1,
      createdTime: currentDateTimeString,
    };

    onCancel();
    if (onUpdateComplete) {
      onUpdateComplete();
    }
  };

  return (
    <Modal
      title="Update chất liệu"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="delete" type="danger" onClick={handleDelete}>
          Delete
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleUpdate}>
          OK
        </Button>,
      ]}
    >
      <form>
      <h4>Mã Chất Liêu:</h4>
        <Input
          name="code"
          label="Mã màu:"
          placeholder="Nhập mã màu"
          onChange={(e) => setMaChatLieu(e.target.value)}
          value={maChatLieuState}
        />
        <h4 className="mt-3">Tên Chất Liệu:</h4>
        <Input
          name="name"
          label="Tên màu:"
          placeholder="Nhập tên màu"
          onChange={(e) => setTenChatLieu(e.target.value)}
          value={tenChatLieuState}
        />
        <h4 className="mt-3">Mô tả chất liệu:</h4>
        <Input
          name="description"
          label="Mô tả màu:"
          placeholder="Nhập mô tả màu"
          onChange={(e) => setMota(e.target.value)}
          value={moTaState}
        />
        <div className="mt-3 d-flex">
          <h4>Trạng thái:</h4>
          <Select
            // onChange={(e) => setTrangThai(parseInt(e.target.value))}
            defaultValue={null}>
            <option disabled value={null}>Chọn trạng thái</option>
            <option value={1}>Còn Hàng</option>
            <option value={0}>Hết Hàng</option>
          </Select>
        </div>
      </form>
    </Modal>
  );
};

export default ModalChatLieuEdit;
