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
  EditFilled,
  EyeFilled,
  DeleteFilled,EyeOutlined,EditOutlined,DeleteOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fetchVouchers,updateVoucher,detailVoucher } from "../../../config/voucherApi";
import ModalAddVoucher from "./ModalVoucherAdd";
import ModalUpdateVoucher from "./ModalVoucherEdit";
import ModalVoucherDetail from "./ModalDetailVoucher";
import moment from 'moment';
const { Option } = Select;

const { RangePicker } = DatePicker;

const Voucher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vouchers = useSelector((state) => 
  state.voucher.vouchers
 
  );
  const pagination = useSelector((state) => state.voucher.pagination);
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const loading = useSelector((state) => state.voucher.status === "loading");
  const [isSearching, setIsSearching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);

  const [payload, setPayload] = useState({
    code: "",
    name:"",
    quantity:"",
    discountAmount:"",
    discountPercent:"",
    minimumOrder:"",
    startDate: "",
    endDate:"",
    status:""
  });
  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss"); // Định dạng ngày tháng theo ý muốn, ví dụ: "YYYY-MM-DD HH:mm:ss"
  };
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
    code: "",
    name:"",
    quantity:"",
    discountAmount:"",
    discountPercent:"",
    minimumOrder:"",
    startDate: "",
    endDate:"",
    status:"",
  });
  const handleChangeStatus = async (record) => {
    const payloadStatus = {
        code: record.code,
        name:record.name,
        quantity:record.quantity,
        discountAmount:record.discountAmount,
        discountPercent:record.discountPercent,
        minimumOrder:record.minimumOrder,
        startDate: moment(record.startDate).format("YYYY-MM-DD HH:mm:ss"),
        endDate:moment(record.endDate).format("YYYY-MM-DD HH:mm:ss")
      
    };
    const newStatus = record.status === 1 ? 0 : 1;
    setUpdateStatus({ status: newStatus });
    await dispatch(updateVoucher({ ...payloadStatus, ...updateStatus }));
    message.success("Voucher updated successfully");
    
    dispatch(
      fetchVouchers({
        page: pagination.current ,
        pageSize: pageSize,
      })
    );
  };
  const updateExpiredVouchers = async () => {
    vouchers.forEach(async (voucher) => {
      if (moment(voucher.endDate).isBefore(moment()) && voucher.status === 1) {
        await handleChangeStatus(voucher);
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!modalVisible && !modalVisibleUpdate) {
          const formattedStartDate = searchParams.startDate ? searchParams.startDate.format('YYYY-MM-DD') : ''; // Chuyển đổi startDate sang chuỗi
     const formattedEndDate = searchParams.endDate ? searchParams.endDate.format('YYYY-MM-DD') : ''; // Chuyển đổi endDate sang chuỗi
          const response = await dispatch(
            fetchVouchers({
              page: current - 1,
              pageSize: pageSize,
              code:searchParams.code,
              name:searchParams.name,
              quantity:searchParams.quantity,
              discountAmount:searchParams.discountAmount,
              discountPercent:searchParams.discountPercent,
              startDate: formattedStartDate,
              endDate:formattedEndDate,
              status: searchParams.status ,
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
    updateExpiredVouchers();


    
  }, [modalVisible, modalVisibleUpdate, current, pageSize,isSearching]);  
  useEffect(() => {
    const updateExpiredVouchers = async () => {
      vouchers.forEach(async (voucher) => {
        if (
          moment(voucher.endDate).isBefore(moment()) &&
          voucher.status === 1
        ) {
          await handleChangeStatus(voucher);
        }
      });
    };

    updateExpiredVouchers();
  }, [vouchers]);
  const onClickEdit = (record) => {
    setPayload({
        code: record.code,
        name:record.name,
        quantity:record.quantity,
        discountAmount:record.discountAmount,
        discountPercent:record.discountPercent,
        minimumOrder:record.minimumOrder,
        startDate: moment(record.startDate).format("YYYY-MM-DD HH:mm:ss"),
        endDate:moment(record.endDate).format("YYYY-MM-DD HH:mm:ss") ,
        status:record.status 
    });
    openModalUpdate();
  };
  
  const onClickSearch = async () => {
    setIsSearching(true);
     
     const formattedStartDate = searchParams.startDate ? searchParams.startDate.format('YYYY-MM-DD') : ''; // Chuyển đổi startDate sang chuỗi
     const formattedEndDate = searchParams.endDate ? searchParams.endDate.format('YYYY-MM-DD') : ''; // Chuyển đổi endDate sang chuỗi
    
   await dispatch(
      fetchVouchers({
        page: current - 1,
        pageSize: pageSize,
        code:searchParams.code,
        name:searchParams.name,
        quantity:searchParams.quantity,
        discountAmount:searchParams.discountAmount,
        discountPercent:searchParams.discountPercent,
        startDate: formattedStartDate,
        endDate:formattedEndDate,
        status: searchParams.status ,
      })
    );
    setIsSearching(false);
    
  };

  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [collarDataDetail, setVoucherDataDetail] = useState();
  const openModalDetail = async (id) => {
    const response = await dispatch(detailVoucher(id));

    setVoucherDataDetail(response.payload);

    setIsModalOpenDetail(true);
  };
  const closeModalDetail = () => {
    setIsModalOpenDetail(false);
  };
  const handleChangeStartDate = (date, dateString) => {
  
    setSearchParams(prevState => ({
      ...prevState,
      startDate: date 
      ? moment(dateString, 'YYYY-MM-DD') : null,
    }));
  };
  const handleChangeEndDate = (date, dateString) => {
    setSearchParams(prevState => ({
      ...prevState,
      endDate: dateString ? moment(dateString, 'YYYY-MM-DD') : null,
    }));
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
              <Form.Item label="Code"
               labelCol={{ span: 7 }} // Định dạng width của label
               wrapperCol={{ span: 13 }} // Định dạng width của input
              >
                <Input
                  placeholder="Enter code"
                  style={{ width: "100%" }}
                  value={searchParams.code}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, code: e.target.value })
                  }
                  disabled={isSearching}
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Trạng Thái"
                 labelCol={{ span: 7 }} // Định dạng width của label
                 wrapperCol={{ span: 13 }} // Định dạng width của input
              >
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
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Giảm theo phần trăm (%)"   
   labelCol={{ span: 10 }} // Định dạng width của label
   wrapperCol={{ span: 13 }} // Định dạng width của input
   style={{ marginRight: "10px" }} // Thêm margin bên phải cho label
    >
                <Input

                  placeholder="Enter discountPercent"
                  style={{ width: "100%" }}
                  value={searchParams.discountPercent}
                  
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, discountPercent: e.target.value })
                  }
                  disabled={ isSearching}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Giá trị giảm (VNĐ)"
               labelCol={{ span: 7 }} // Định dạng width của label
               wrapperCol={{ span: 13 }} // Định dạng width của input
              >
                <Input
                  placeholder="Enter discountAmount"
                  style={{ width: "100%" }}
                  value={searchParams.discountAmount}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, discountAmount: e.target.value })
                  }
                  disabled={ isSearching}
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Ngày bắt đầu" 
                 labelCol={{ span: 7 }} // Định dạng width của label
                 wrapperCol={{ span: 13 }} // Định dạng width của input
              > 
                <DatePicker
                  placeholder="Enter start date"
                  style={{ width: "100%" }}
                  value={searchParams.startDate}
                  
                  onChange={handleChangeStartDate}
                  disabled={ isSearching}
                  allowClear
                />
              </Form.Item>
            </Col>
           
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label="Ngày kết thúc" 
             labelCol={{ span: 10 }} // Định dạng width của label
             wrapperCol={{ span: 13 }} // Định dạng width của input
             style={{ marginRight: "10px" }} // Thêm margin bên phải cho label
              >
                <DatePicker
                  placeholder="Enter end date"
                  style={{ width: "100%" }}
                  value={searchParams.endDate}
                  onChange={handleChangeEndDate}
                  disabled={ isSearching}
                  allowClear
                />
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
              Search
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
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: "Giá trị giảm (VNĐ)",
        dataIndex: "discountAmount",
        key: "discountAmount",
        width: 150,
        
    },
    {
      title: "Giảm theo phần trăm (%)",
      dataIndex: "discountPercent",
      key: "discountPercent",
      width: 150,
      
  },
   
   
    {
        title: "Ngày bắt đầu",
        dataIndex: "startDate",
        key: "startDate",
        width: 150,
        render: (text) => formatDate(text) // Sử dụng formatDate để định dạng ngày tháng

        
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,
      render: (text) => formatDate(text) // Sử dụng formatDate để định dạng ngày tháng

      
  },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => (text == "1" ? "Hoạt động" : "Không hoạt động")
    },
    {
      title: "Hành động",
      key: "actions",
      width: 100,
      render: (text, record) => (
        <Space size="middle" >
          <Button style={{ border: "none" }} icon={<EyeFilled />} onClick={() => openModalDetail(record.id)}/>
          <Button
            style={{ border: "none" }}
            icon={<EditFilled />}
            onClick={() => onClickEdit(record)}
          />
          {/* <Popconfirm
            title="Are you sure you want to delete this voucher?"
            onConfirm={() => handleChangeStatus(record)}
            okText="Yes"
            cancelText="No"
            loading={loading}
          >
            <Button
              style={{ border: "none" }}
              disabled={record.status === 0}
              icon={<DeleteFilled />}
            />
          </Popconfirm> */}
        </Space>
      ),
    },
  ];
  const getTitle = () => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ marginRight: 8 }}>Danh Sách phiếu giảm giá</span>
      <Button type="primary" shape="round" onClick={openModal}>
        Thêm Phiếu giảm giá
      </Button>
    </div>
  );
 
  const handleTableChange = (pagination) => {
    const { current } = pagination;
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
    }
    // Kiểm tra và cập nhật trạng thái của phiếu giảm giá khi ngày kết thúc đã qua
 
    setCurrent(current);
 
  };


  return (
    <div>
      <>
        <Divider orientation="left">Phiếu giảm giá</Divider>
        <Collapse
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{
            background: token.colorBgContainer,
          }}
          items={getItems()}
        />
       
        <Table
         columns={columns}
         rowKey={(record) => record.id}
         dataSource={vouchers}
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
     <ModalAddVoucher open={modalVisible} closeModal={closeModal} />
        <ModalUpdateVoucher
          open={modalVisibleUpdate}
          loading={loading}
          closeModal={closeModalUpdate}
          payload={payload}
        />
        <ModalVoucherDetail
        isOpen={isModalOpenDetail}
        vouchers={collarDataDetail}
        onCancel1={closeModalDetail}
      />
      </>
    </div>
  );
};

export default Voucher;