import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select, message, Date, Tree, Col, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromotions } from "../../../store/slice/PromotionReducer";
import { add } from "../../../store/slice/DetailPromotionReducer";
import axios from "axios";
import ModalKhuyenMaiDetail from "./ModalPromotionChiTiet";
import { listProduct } from "./ConstListProduct";
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

  // console.log("xxxx, ", listProduct);
  const handleOk = async () => {
    try {
      // console.log("xxx, ", listProduct);
      setConfirmLoading(true);
      const formValues = await form.validateFields();
      // console.log("29: ", payload.detailProduct);
      // console.log("payload: ", payload);
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
      title: 'All',
      dataIndex: "All",
      key: 9999999999,
      children: [
        {
          title: 'Áo nỉ',
          key: 999999999,
          children: [
            {
              title: 'Black-M',
              key: 1,
            },
            {
              title: 'White-L',
              key: 2,
            },
            {
              title: 'Vilolet-XL',
              key: 3,
            },
          ],
        },
        {
          title: 'Áo gió',
          key: 888888888,
          children: [
            {
              title: 'Black-M',
              key: 4,
            },
            {
              title: 'White-L',
              key: 5,
            },
            {
              title: 'Vilolet-XL',
              key: 6,
            },
          ],
        },
        {
          title: 'Áo thun',
          key: 777777777,
          children: [
            {
              title: 'Black-M',
              key: 7,
            },
            {
              title: 'White-L',
              key: 8,
            },
            {
              title: 'Vilolet-XL',
              key: 9,
            },
          ],
        },
      ],
    },
  ]

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
    <div>
      <Modal
        title="Thêm khuyến mãi"
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
                
                label="Mã"
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
                <Input placeholder="Nhập mã khuyến mãi" />
              </Form.Item>

              <Form.Item
                
                label="Tên"
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
                <Input placeholder="Nhập tên khuyếm mãi"/>
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
                label="Ngày bắt đầu"
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
                label="Ngày kết thúc"
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

              >

              </Form.Item>
            </Form>
          </Col>
          <Col style={{ marginLeft: "30px" }} lg={9} md={24} sm={24}>
            <div style={{ borderLeft: '3px solid black', padding: '15px', height: "350px", overflow: "auto" }}>
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
            </div>
          </Col>
        </div>
      </Modal >


    </div >
  );
};

export default ModalKhuyenMai;
