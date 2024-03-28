import { CaretRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import {
  Collapse,
  theme,
  Form,
  Table,
  Input,
  Button,
  Select,
  DatePicker,
  Divider,
  Space,
  Col,
  Row,
  message,
  Popconfirm,Pagination
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fetchCollars,updateCollar,detailCollar } from "../../../../config/CollarApi";
import ModalAddCollar from "./ModalCollarAdd";
import ModalUpdateCollar from "./ModalCollarEdit";
import ModalCollarDetail from "./ModalDetailCollar";
const { Option } = Select;

const { RangePicker } = DatePicker;

const CoAo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const collars = useSelector((state) => 
  state.collar.collars
 
  );
  const pagination = useSelector((state) => state.collar.pagination);
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const loading = useSelector((state) => state.collar.status === "loading");
  const [isSearching, setIsSearching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);

  const [payload, setPayload] = useState({
    code: "",
    name: "",
    description: "",
    status:""
  });

  const [updateStatus, setUpdateStatus] = useState({ status: 0 });

  const openModal = () => {
    setModalVisible(true);
  };
  const openModalUpdate = () => {
    setModalVisibleUpdate(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrent(1);
  };
  const closeModalUpdate = () => {
    setModalVisibleUpdate(false);
  };

  const [searchParams, setSearchParams] = useState({
    code:"",
    name: "",
    status: "",
  });
  const handleChangeStatus = async (record) => {
    const payloadStatus = {
      code: record.code,
      name: record.name,
      description: record.description,
    };
    const newStatus = record.status === 1 ? 0 : 1;
    setUpdateStatus({ status: newStatus });
    await dispatch(updateCollar({ ...payloadStatus, ...updateStatus }));
    message.success("Collar updated successfully");

    dispatch(
      fetchCollars({
        page: pagination.current ,
        pageSize: pageSize,
      })
    );
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!modalVisible && !modalVisibleUpdate) {
          const response = await dispatch(
            fetchCollars({
              page: current - 1,
              pageSize: pageSize,
              code:searchParams.code,
              name: searchParams.name,
              status: searchParams.status,
            })
          );

          if (response && response.error) {
            if (
              response.error.message ===
              "Access Denied !! Full authentication is required to access this resource"
            ) {
              let count = 5;

              const countdownMessage = () => {
                if (count === 0) {
                  navigate("/login");
                  return;
                }

                const errorMessage =
                  count === 5
                    ? "Access Denied !! Full authentication is required to access this resource."
                    : `Redirecting to login page in ${count} seconds...`;
                message.loading({
                  content: errorMessage,
                  duration: 1,
                  onClose: () => {
                    count--;
                    countdownMessage();
                  },
                });
              };

              countdownMessage();
            } else {
              message.error("Error fetching data. Please try again later.");
              let count = 5;

              const countdownMessage = () => {
                if (count === 0) {
                  navigate("/login");
                  return;
                }
                const errorMessage =
                  count === 5
                    ? "Error fetching data. Please try again later."
                    : `Redirecting to login page in ${count} seconds...`;

                message.loading({
                  content: errorMessage,
                  duration: 1,
                  onClose: () => {
                    count--;
                    countdownMessage();
                  },
                });
              };

              countdownMessage();
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [modalVisible, modalVisibleUpdate, current, pageSize,isSearching]);  

  const onClickEdit = (record) => {
    setPayload({
      code: record.code,
      name: record.name,
      description: record.description,
      status: record.status,
    });
    openModalUpdate();
  };
  
  const onClickSearch = async () => {
    setIsSearching(true);
     
   await dispatch(
      fetchCollars({
        page: pagination.current ,
        pageSize: pageSize,
        code:searchParams.code,
        name: searchParams.name,
        status: searchParams.status,
      })
    );
    setIsSearching(false);
  };

  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [collarDataDetail, setCollarDataDetail] = useState();
  const openModalDetail = async (id) => {
    const response = await dispatch(detailCollar(id));

    setCollarDataDetail(response.payload);

    setIsModalOpenDetail(true);
  };
  const closeModalDetail = () => {
    setIsModalOpenDetail(false);
  };

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
  };

  const getItems = () => [
    {
      key: "1",
      label: "Search",
      children: (
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 1500, margin: "auto", marginTop: "20px" }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Tên">
                <Input
                  placeholder="Nhập tên cổ áo"
                  style={{ width: "100%" }}
                  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  }
                  disabled={ isSearching}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Mã">
                <Input
                  placeholder="Nhập mã cổ áo"
                  style={{ width: "100%" }}
                  value={searchParams.code}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, code: e.target.value })
                  }
                  disabled={ isSearching}
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
                  disabled={ isSearching}
                  allowClear
                >
                  <Option value="0">Không hoạt động</Option>
                  <Option value="1">Hoạt động</Option>
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
              disabled={isSearching}
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      ),
      style: panelStyle,
    },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 75,
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 150,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => (text == "0" ? "Không Hoạt Động" : " Hoạt Động")
    },
    {
      title: "Hành động",
      key: "actions",
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ border: "none" }} icon={<EyeOutlined />} onClick={() => openModalDetail(record.id)}/>
          <Button
            style={{ border: "none" }}
            icon={<EditOutlined />}
            onClick={() => onClickEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this collar?"
            onConfirm={() => handleChangeStatus(record)}
            okText="Yes"
            cancelText="No"
            loading={loading}
          >
            <Button
              style={{ border: "none" }}
              disabled={record.status === 0}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const getTitle = () => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ marginRight: 8 }}>Danh Sách Cổ Áo</span>
      <Button type="primary" shape="round" onClick={openModal}>
        Thêm Cổ Áo
      </Button>
    </div>
  );

  const handleTableChange = (pagination) => {
    const { current } = pagination;
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
    }
    setCurrent(current);
 
  };


  return (
    <div>
      <>
        <Divider orientation="left">Cổ Áo</Divider>
        <Collapse
          // defaultActiveKey={["1"]}
          // expandIcon={({ isActive }) => (
          //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
          // )}
          // style={{
          //   background: token.colorBgContainer,
          // }}
          items={getItems()}
        />
       
        <Table
         columns={columns}
         rowKey={(record) => record.id}
         dataSource={collars}
         pagination={{
           pageSize: pageSize,
           total: pagination.totalItems,
           current: current,
           showSizeChanger: true, // Thêm thuộc tính showSizeChanger vào đây
           showQuickJumper: true,
           showTotal: (totalPages) => `Total ${totalPages} items`,
           
         }}
         scroll={{
           x: 1000,
           y: 300,
         }}
         loading={loading}
         title={getTitle}
         onChange={handleTableChange}
        />
        <ModalAddCollar open={modalVisible} closeModal={closeModal} />
        <ModalUpdateCollar
          open={modalVisibleUpdate}
          loading={loading}
          closeModal={closeModalUpdate}
          payload={payload}
        />
        <ModalCollarDetail
        isOpen={isModalOpenDetail}
        collars={collarDataDetail}
        onCancel1={closeModalDetail}
      />
      </>
    </div>
  );
};

export default CoAo;