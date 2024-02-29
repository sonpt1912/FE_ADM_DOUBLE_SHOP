import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select, message, Date, Tree, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { add, fetchPromotions } from "../../../store/slice/KhuyenMaiReducer";
import axios from "axios";

const ModalKhuyenMai = ({ open, closeModal }) => {
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
      await dispatch(add(payload))
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
      message.error("Failed to add Promotion");
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
    // Gọi API để lấy dữ liệu cây từ backend
    axios.get('http://localhost:8072/promotion/hien-thi')
      .then(response => {
        setTreeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderTree = (node) => (
    <ul key={node.code}>
      <li>{node.name}</li>
      {/* {node.children && node.children.map(child => renderTree(child))} */}
    </ul>
  );

  // const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
  // const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);

  const [expandedKeys, setExpandedKeys] = useState();
  const [checkedKeys, setCheckedKeys] = useState();
  const [selectedKeys, setSelectedKeys] = useState();
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <div>
      <Modal
        title="Add promotion"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <div style={{ display: "flex" }}>
          <Col lg={12} md={6} sm={6}>
            <form>
              <h4 className="mt-3">Code promotion:</h4>
              <Input
                name="code"
                label="code:"
                placeholder="Input code matertial"
                onChange={(e) => setPayload({ ...payload, code: e.target.value })}
                required
              />
              <h4 className="mt-3">Name promotion:</h4>
              <Input
                name="name"
                label="name:"
                placeholder="Input name matertial"
                onChange={(e) => setPayload({ ...payload, name: e.target.value })}
                required
              />
              <h4 className="mt-3">discountAmount promotion:</h4>
              <Input
                name="discountAmount"
                label="discountAmount:"
                placeholder="Input value matertial"
                onChange={(e) => setPayload({ ...payload, discountAmount: e.target.value })}
                required
              />
              <h4 className="mt-3">discountPercent promotion:</h4>
              <Input
                name="discountPercent"
                label="discountPercent:"
                placeholder="Input value matertial"
                onChange={(e) => setPayload({ ...payload, discountPercent: e.target.value })}
                required
              />
              <h4 className="mt-3">Startdate promotion:</h4>
              <Input
                name="startDate"
                label="startDate:"
                // placeholder="Input name matertial"
                type="Date"
                onChange={(e) => setPayload({ ...payload, startDate: e.target.value })}
                required
              />
              <h4 className="mt-3">Enddate promotion:</h4>
              <Input
                name="endDate"
                label="endDate:"
                // placeholder="Input name matertial"
                type="Date"
                onChange={(e) => setPayload({ ...payload, endDate: e.target.value })}
                required
              />


              {/* <Button htmlType="submit" onClick={handleOk}>Update</Button>
            <Button onClick={handleCancel}>Cancel</Button> */}
            </form>
          </Col>
          <Col lg={12} md={6} sm={6}>
            <h5>Chọn sản phẩm</h5>
            <Tree
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={tree}
            />
            {/* {treeData.map(rootNode => renderTree(rootNode))} */}
          </Col>
        </div>
      </Modal>


    </div >
  );
};

export default ModalKhuyenMai;
