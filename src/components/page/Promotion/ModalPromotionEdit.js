import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Form, message, Tabs, Col, Tree } from "antd";
import { useDispatch } from "react-redux";
import { update, fetchPromotions } from "../../../store/slice/PromotionReducer";
import TabPane from "antd/es/tabs/TabPane";
import { Delete } from "../../../store/slice/DetailPromotionReducer";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from 'moment';
import ModalKhuyenMaiDetail from "./ModalPromotionChiTiet";
import { listProduct } from "./ConstListProduct";
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
  const [editableDiscountAmount, setEditableDiscountAmount] = useState(true);
  const [editableDiscountPercent, setEditableDiscountPercent] = useState(true);
  const [form] = Form.useForm();


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

  const [payload, setPayload] = useState({
    code: "",
    name: "",
    discountAmount: "",
    discountPercent: "",
    value: "",
  });

  const handleOk = async () => {
    try {
      const formValues = await form.validateFields();
      if (formValues.discountPercent > 100)
        return message.error("Giảm giá theo phần trăm không được lớn hơn 100%!");
      else if (formValues.discountPercent < 0 || formValues.discountAmount < 0)
        return message.error("Giảm giá không được nhỏ hơn 0!");
      else if (formValues.endDate && formValues.startDate && formValues.endDate <= formValues.startDate)
        return message.error("Ngày kết thúc không thể ở trước hoặc là ngày bắt đầu!")
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

  const [treeData, setTreeData] = useState([]);
  const { TreeNode } = Tree;
  useEffect(() => {
    axios.get('http://localhost:8072/tree/product/show')
      .then(response => {
        console.log('API response: ', response.data.data);
        const dataFromDB = response.data.data;
        const formattedData = formatDataForTree(dataFromDB);
        setTreeData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log("tree: ", treeData);

  const formatDataForTree = (data) => {
    const tree = [];
    data.forEach(product => {
      console.log("product: ", product.name);
      const productNode = {
        title: product.name,
        key: product.id,
        children: product.detailProducts.map(i => ({
          title: `${i.size.name} - ${i.color.name}`,
          key: `${i.id}`,
        })),
      }
      console.log("xxx", productNode);
      tree.push(productNode)
    });
    return tree;
  }

  // const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
  // const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);

  const [expandedKeys, setExpandedKeys] = useState();
  const [checkedKeys, setCheckedKeys] = useState();
  const [selectedKeys, setSelectedKeys] = useState();
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    const filteredKeys = checkedKeysValue.filter(key => !key.startsWith('0-'));
    console.log("checkedKeysValue", filteredKeys);
    listProduct.splice(0, listProduct.length, ...filteredKeys);
    setCheckedKeys(filteredKeys);
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Modal
      title="Cập nhập sản phẩm"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      width={888}
      style={{ border: '3px solid transparent', padding: '0px', height: "1000px", overflow: "auto" }}
    >
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Thông tin" key="form">
          <Form>
            <h4>Mã khuyến mãi:</h4>
            <Input
              name="code"
              value={codeState}
              disabled
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
              placeholder="Nhập tên mới"
              value={nameState}
              onChange={(e) => handleInputChange({
                target: {
                  name: 'name', value: e.target.value
                }
              }
              )}
            />
            <h4>Giảm giá (VND):</h4>
            <Input
              type="number"
              name="discountAmount"
              placeholder="Nhập khuyến mãi mới (VND)"
              value={discountAmountState}
              disabled={discountAmountState === 0}
              onChange={(e) => handleInputChange({
                target: {
                  name: 'discountAmount', value: e.target.value
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
              disabled={discountPercentState === 0}
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
                <p style={{ marginLeft: 30, fontSize: 15 }}>Giá sau khi giảm(VND): [{t.detailProduct.price - KhuyenMais.discountAmount}]</p>
                <p style={{ marginLeft: 30, fontSize: 15 }}>Giá sau khi giảm(%): [{t.detailProduct.price * (1 - (KhuyenMais.discountPercent) / 100)}]</p>
                <Button

                  icon={<DeleteOutlined />}
                  style={{ border: "none" }}
                  onClick={() => handleDelete(t.id)}
                >Xóa</Button>

                <hr></hr>
              </div>
            ))}
          </div>

          {/* <div style={{ borderLeft: '3px solid black', padding: '15px', height: "350px", overflow: "auto" }}>
            <h3 >Chọn sản phẩm</h3>
            <Tree
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              showLine
              defaultExpandAll
            >
              {treeData.map(node => (
                <TreeNode title={node.title}>
                  {node.children && node.children.map(childNode => {
                    // console.log("childNode: ", childNode);
                    return <TreeNode title={childNode.title} key={childNode.key} />
                  })}
                </TreeNode>
              ))}
            </Tree>
          </div> */}
        </TabPane>
      </Tabs>

    </Modal>
  );
};

export default ModalKhuyenMaiEdit;
