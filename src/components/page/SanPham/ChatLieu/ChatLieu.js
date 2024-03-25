import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Space, Input, Table, Collapse, Form, Select, Button, Divider, Row, Col, theme} from "antd";
import { useDispatch, useSelector } from "react-redux";

import ModalChatLieu from "./ModalChatLieuAdd";
import ModalChatLieuEdit from "./ModalChatLieuEdit";
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import { fetchMaterials, Delete, detail } from "../../../../store/slice/ChatLieuReducer";

const Material = () => {
  const dispatch = useDispatch();
  const materials = useSelector((state) => state.material.materials);
  const pageSize = useSelector((state) => state.material.materials);
  const pagination = useSelector((state) => state.material.pagination);
  console.log("Pagination", pagination);
  const loading = useSelector((state) => state.material.status === "loading");

  const [searchParams, setSearchParams] = useState({
    code: "",
    name: "",
  });

  useEffect(() => {
    dispatch(
      fetchMaterials({
        page: 0,
        pageSize: 5,
        code: searchParams.code,
        name: searchParams.name,
        status: searchParams.status
      })
    );
  }, [dispatch]);

  const onClickSearch = () => {
    dispatch(
      fetchMaterials({
        page: 0,
        pageSize: 5,
        code: searchParams.code,
        name: searchParams.name,
        status: searchParams.status
      })
    );

    setSearchParams({
      code: "",
      name: "",
    });
  };

  const columns = [
    {
      // title: "id",
      // dataIndex: "id",
      // key: "id",
      // // render: (text, record, index) => index + 1,
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (record.status === 0 ? "Inactive" : "Active"),
    },
    {
      title: "Chức năng",
      dataIndex: "ChucNang",
      key: "ChucNang",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} style={{ border: "none" }} />
          <Button
            icon={<EditOutlined />}
            style={{ border: "none" }}
            onClick={() => openModalUpdate(record.id)}
          />
          <Button icon={<DeleteOutlined />} style={{ border: "none" }} onClick={() => handleDelete(record.id)} disabled={record.status === 0}/>
            
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    dispatch(
      fetchMaterials({
        page: pagination.current - 1,
        pageSize: pagination.pageSize,
        ...searchParams,
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(Delete(id))
      .then(() => {
        dispatch(
          fetchMaterials({
            page: 0,
            pageSize: 5,
            code: searchParams.code,
            name: searchParams.name,
          })
        )
      });
  };

  const [selectedChatLieu, setSelectedChatLieu] = useState([]);
  console.log(selectedChatLieu + " selected");
  // Modal for view
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const showViewModal = () => {
    setIsViewModalVisible(true);
  };

  const hideViewModal = () => {
    setIsViewModalVisible(false);
  };

  const modal = [

  ]
  // Modal add
  const [modalAdd, setModalAdd] = useState(false);

  const showModalAdd = () => {
    setModalAdd(true);
  };

  const closeModalAdd = () => {
    setModalAdd(false);
  };

  // Modal for edit
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [materialData, setMaterialData] = useState();
  const openModalUpdate = async (id) => {
    const response = await dispatch(detail(id));
    console.log("Response from detailMaterial:", response);
    setMaterialData(response.payload);
    console.log("Material Data:", materialData);
    setIsModalOpenUpdate(true);

  };

  const closeModalUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const { Option } = Select;

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
  };


  const items = [
    {
      key: '1',
      label: 'Tìm Kiếm',
      children: (
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 1500, margin: "auto", marginTop: "20px" }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Mã">
                <Input
                  placeholder="Nhập mã"
                  style={{ width: "100%" }}
                  value={searchParams.code}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, code: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Tên">
                <Input
                  placeholder="Nhập tên"
                  style={{ width: "100%" }}
                  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Trạng Thái">
                <Select
                  style={{ width: "100%" }}
                  value={searchParams.status}
                  onChange={(value) =>
                    setSearchParams({ ...searchParams, status: value })
                  }
                  allowClear
                >
                  <Option value="0">Inactive</Option>
                  <Option value="1">Active</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ offset: 10 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              onClick={onClickSearch}
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      ),
      style: panelStyle
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div>
      <Divider orientation="left">Chất liệu</Divider>
      <div>
        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
      </div>

      <div className="mt-4"></div>
      {/* <Collapse components={components} /> */}
      <div style={{ marginBottom: "30px" }}></div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ marginRight: 8 }}>Danh Sách chất liệu</h3>
        <Button type="primary" shape="round" onClick={showModalAdd}>
          +Thêm mới chất liệu
        </Button>
      </div>

      <Table
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        className="text-center"
        columns={columns}
        dataSource={materials}
        pagination={{
          pageSize: pagination.pageSize,
          total: pagination.totalItems,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (totalPages) => `Total ${totalPages} items`,
        }}
        scroll={{
          x: 1000,
          y: 300,
        }}
        loading={loading}
        // title={getTitle}
        onChange={handleTableChange}
      />

      <ModalChatLieu open={modalAdd} closeModal={closeModalAdd} />

      <ModalChatLieuEdit
        visible={isModalOpenUpdate}
        closeModal={closeModalUpdate}
        ChatLieus={materialData}

      // onUpdateComplete={onUpdateComplete}
      />

      {/* <ModalMaterialUpdate
        isOpen={isModalOpenUpdate}
        materials={marerialData}
        onCancel1={closeModalUpdate}
      /> */}
    </div>
  );
};

export default Material;
