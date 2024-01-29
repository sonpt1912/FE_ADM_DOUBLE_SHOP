import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { update, fetchPromotions } from "../../../store/slice/KhuyenMaiReducer";

const ModalKhuyenMaiEdit = ({ visible, closeModal, KhuyenMais }) => {
  const dispatch = useDispatch();

  const [idState, setId] = useState('');
  const [codeState, setCode] = useState('');
  const [nameState, setName] = useState('');
  const [valueState, setValue] = useState();
  const [startDateState, setStartDate] = useState('');
  const [endDateState, setEndDate] = useState('');
  const [statusState, setStatus] = useState('');

  useEffect(() => {
    if (KhuyenMais) {
      setId(KhuyenMais.id);
      setCode(KhuyenMais.code);
      setName(KhuyenMais.name);
      setValue(KhuyenMais.value);
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
    else if (name === "value") {
      setValue(parseInt(value));
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
    value: "",
  });

  const handleOk = async () => {
    try {
      const formData = {
        id: idState,
        name: nameState,
        startDate: startDateState,
        endDate: endDateState,
        createdBy: 1,
        updated_by: 1,
        status: 1
      };
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

  const handleCancel = () => {
    setPayload({
      code: "",
      name: "",
      value: "",
    });
    closeModal();
    form.resetFields();
  };

  return (
    <Modal
      title="Update Promotion"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
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
          placeholder="Input code promotion"
          value={codeState}
          onChange={(e) => handleInputChange({
            target: {
              name: 'code', value: e.target.value
            }
          }
          )}
        />
        <h4>Name Promotion:</h4>
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
        <h4>Value Promotion:</h4>
        <Input
          name="value"
          placeholder="Input value promotion"
          value={valueState}
          onChange={(e) => handleInputChange({
            target: {
              name: 'value', value: e.target.value
            }
          }
          )}
        />
        <h4 className="mt-3">StartDate Promotion:</h4>
        <Input
          name="startDate"
          label="StartDate:"
          placeholder="Input StartDate promotion"
          value={startDateState}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <h4 className="mt-3">EndDate promotion:</h4>
        <Input
          name="endDate"
          label="EndDate:"
          placeholder="Input EndDate promotion"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDateState}
        />
        <div className="mt-3 d-flex">
          <h4>Status:</h4>
          <Select className="ms-4"
            value={statusState == "0" ? "chưa hoạt động" : statusState=="1" ? "đang hoạt động" : "hết hạn"}
            disabled
          >
          </Select>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalKhuyenMaiEdit;
