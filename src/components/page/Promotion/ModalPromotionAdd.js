import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select, message, Date, Tree, Col, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromotions } from "../../../store/slice/PromotionReducer";
import { add } from "../../../store/slice/DetailPromotionReducer";
import axios from "axios";
import ModalKhuyenMaiDetail from "./ModalPromotionChiTiet";

const ModalKhuyenMai = ({ open, closeModal, KhuyenMais }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [payload, setPayload] = useState({
    code: "",
    name: "",
    discountAmount: "",
    discountPercent: "",
    startDate: null,
    endDate: null,
  });

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const formValues = await form.validateFields();
      await dispatch(add({ ...formValues, payload }))
        .then(() => {
          dispatch(
            fetchPromotions({
              page: 0,
              pageSize: 5
            })
          )
        });
      message.success("Promotion added successfully");
      closeModal();
      setPayload({
        code: "",
        name: "",
        discountAmount: "",
        discountPercent: "",
        startDate: null,
        endDate: null,
      });
      form.resetFields();
    } catch (error) {
      message.error("Vui lòng nhập đầy đủ thông tin");
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
      discountAmount: "",
      discountPercent: "",
      startDate: null,
      endDate: null,
    });
    closeModal();
    form.resetFields();
  };

  const tree = [
    {
      title: 'name',
      dataIndex: "name",
      key: 'name',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            {
              title: '0-0-0-0',
              key: '0-0-0-0',
            },
            {
              title: '0-0-0-1',
              key: '0-0-0-1',
            },
            {
              title: '0-0-0-2',
              key: '0-0-0-2',
            },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            {
              title: '0-0-1-0',
              key: '0-0-1-0',
            },
            {
              title: '0-0-1-1',
              key: '0-0-1-1',
            },
            {
              title: '0-0-1-2',
              key: '0-0-1-2',
            },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          children: [
            {
              title: '0-0-2-0',
              key: '0-0-2-0',
            },
            {
              title: '0-0-2-1',
              key: '0-0-2-1',
            },
            {
              title: '0-0-2-2',
              key: '0-0-2-2',
            },
          ],
        },
      ],
    },
  ]

  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8072/detail-product/show')
      .then(response => {
        console.log('API response: ', response.data.data)
        setTreeData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <Tree.TreeNode key={item.product} title={item.name}>
            {renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode key={item.id} title={item.name} />;
    });

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
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <div>
      <Modal
        title="add promotion"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
      >
        <div style={{ display: "flex" }}>
          <Col lg={14} md={24} sm={24}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 17, }}
              style={{ maxWidth: 1000, marginTop: "30px" }}
            >
              <Form.Item
                label="code"
                name="code"
                labelAlign="left"
                labelCol={{ span: 9, }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập code"
                  }
                ]}
                onChange={(e) =>
                  setPayload({ ...payload, code: e.target.value })
                }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="name"
                name="name"
                labelAlign="left" // Đảm bảo nhãn được căn chỉnh ở đầu dòng
                labelCol={{ span: 9 }}

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
                labelCol={{ span: 9 }}
                label="Giảm giá theo tiền"
                name="discountAmount"
              // Rest of your code
              >
                <Input type="number" placeholder="VNĐ" min={0}
                />
              </Form.Item>

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
                labelCol={{ span: 9 }}
                label="Giảm giá theo phần trăm"
                name="discountPercent"
              // Rest of your code
              >
                <Input type="number" placeholder="%" min={0} />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                name="startDate"
                label="startDate"
                labelCol={{ span: 9 }}
                rules={[{ required: true }]}
              >
                <Input
                  type="Date"
                  onChange={(e) => setPayload({ ...payload, startDate: e.target.value })}
                  required
                />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                name="endDate"
                label="endDate"
                labelCol={{ span: 9 }}
                rules={[{ required: true }]}

              >
                <Input
                  type="Date"
                  onChange={(e) => setPayload({ ...payload, startDate: e.target.value })}
                  required
                />
              </Form.Item>
            </Form>
          </Col>
          <Col style={{ marginLeft: "30px" }} lg={9} md={24} sm={24}>
            <div style={{ border: '3px solid black', padding: '10px', height: "350px", overflow: "auto" }}>
              <h3 >Chọn sản phẩm</h3>
              {/* <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={tree}
                showLine
                defaultExpandAll
                // expandedKeys={expandedKeys}
                // onExpand={onExpand}
              >
                {renderTreeNodes(treeData)}
              </Tree> */}
              <Tree
                checkable
                checkedKeys={checkedKeys}
                onCheck={onCheck}>
                {renderTreeNodes(treeData)}
              </Tree>
            </div>
          </Col>
        </div>
      </Modal >


    </div >
  );
};

export default ModalKhuyenMai;