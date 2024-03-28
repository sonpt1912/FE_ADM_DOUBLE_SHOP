import React, { useState, useEffect } from "react";
import { Space, Input, Table, Collapse, Form, Select, Button, Divider, Row, Col, theme, message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ModalKhuyenMai from "./ModalPromotionAdd";
import ModalKhuyenMaiEdit from "./ModalPromotionEdit";
import ModalKhuyenMaiDetail from "./ModalPromotionChiTiet";
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import { fetchPromotions, Delete, detail, update } from "../../../store/slice/PromotionReducer";
const Promotion = () => {
    const dispatch = useDispatch();
    // const [updateStatus, setUpdateStatus] = useState({ status: 0 });
    const promotions = useSelector((state) => state.promotion.promotions);
    const pagination = useSelector((state) => state.promotion.pagination);
    const [pageSize, setPageSize] = useState();
    console.log("Pagination", pagination);
    const loading = useSelector((state) => state.promotion.status === "loading");

    const [searchParams, setSearchParams] = useState({
        code: "",
        name: "",
        startDate: "",
        endDate: "",
        discountPercent: "",
        status: ""
    });

    useEffect(() => {
        dispatch(
            fetchPromotions({
                page: 0,
                pageSize: 5,
                code: searchParams.code,
                name: searchParams.name,
                status: searchParams.status,
                startDate: searchParams.startDate,
                endDate: searchParams.endDate,
                discountPercent: searchParams.discountPercent
            })
        );
    }, [dispatch]);

    const onClickSearch = () => {
        dispatch(
            fetchPromotions({
                page: 0,
                pageSize: 5,
                code: searchParams.code,
                name: searchParams.name,
                status: searchParams.status,
                startDate: searchParams.startDate,
                endDate: searchParams.endDate,
                discountPercent: searchParams.discountPercent
            })
        );

        setSearchParams({
            code: "",
            name: "",
            startDate: "",
            endDate: "",
            discountPercent: "",
            status: ""
        });
    };

    const columns = [
        {
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
            title: "Giảm giá (VND)",
            dataIndex: "discountAmount",
            key: "discountAmount",
        },
        {
            title: "Giảm giá (%)",
            dataIndex: "discountPercent",
            key: "discountPercent",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (record.status == "0" ? "Ngừng hoạt động" : record.status == "1" ? "Đang hoạt động" : "Chưa hoạt động"),
        },
        {
            title: "Chức năng",
            dataIndex: "ChucNang",
            key: "ChucNang",
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        icon={<EyeOutlined />}
                        style={{ border: "none" }}
                        onClick={() => openModalDetail(record.id)}
                    />
                    <Button
                        icon={<EditOutlined />}
                        style={{ border: "none" }}
                        onClick={() => openModalUpdate(record.id)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        style={{ border: "none" }}
                        onClick={() => handleDelete(record.id)} disabled={record.status === 0}
                    />
                </Space>
            ),
        },
    ];

    const handleTableChange = (pagination) => {
        dispatch(
            fetchPromotions({
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
                    fetchPromotions({
                        page: 0,
                        pageSize: 5,
                        code: searchParams.code,
                        name: searchParams.name,
                        status: searchParams.status
                    })
                )
            });
    };

    //eye
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const openModalDetail = async (id) => {
        const response = await dispatch(detail(id));
        console.log(response)
        setPromotionData(response.payload);
        setIsModalOpenDetail(true);
    };
    const closeModalDetail = () => {
        setIsModalOpenDetail(false);
    };
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
    const [promotionData, setPromotionData] = useState();
    const openModalUpdate = async (id) => {
        const response = await dispatch(detail(id));
        setPromotionData(response.payload);
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
                            <Form.Item label="Tìm mã:">
                                <Input
                                    placeholder="Nhập mã sản phẩm"
                                    style={{ width: "100%" }}
                                    value={searchParams.code}
                                    onChange={(e) =>
                                        setSearchParams({ ...searchParams, code: e.target.value })
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Tìm tên:">
                                <Input
                                    placeholder="Nhập tên sản phẩm"
                                    style={{ width: "100%" }}
                                    value={searchParams.name}
                                    onChange={(e) =>
                                        setSearchParams({ ...searchParams, name: e.target.value })
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Trạng Thái:">
                                <Select
                                    placeholder="Chọn trạng thái"
                                    style={{ width: "100%" }}
                                    value={searchParams.status}
                                    onChange={(value) =>
                                        setSearchParams({ ...searchParams, status: value })
                                    }
                                    allowClear
                                >
                                    <Option value="0">Ngừng hoạt động</Option>
                                    <Option value="1">Đang hoạt động</Option>
                                    <Option value="2">Chưa hoạt động</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Giảm giá(%):">
                                <Input
                                    placeholder="Nhập % (<100)"
                                    style={{ width: "100%" }}
                                    value={searchParams.discountPercent}
                                    onChange={(e) =>
                                        setSearchParams({ ...searchParams, discountPercent: e.target.value })
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Ngày bắt đầu:">
                                <Input
                                    type="Date"
                                    placeholder="Ngày bắt đầu"
                                    style={{ width: "100%" }}
                                    value={searchParams.startDate}
                                    onChange={(e) =>
                                        setSearchParams({ ...searchParams, startDate: e.target.value })
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Ngày kết thúc:">
                                <Input
                                    type="Date"
                                    placeholder="Ngày bắt đầu"
                                    style={{ width: "100%" }}
                                    value={searchParams.endDate}
                                    onChange={(e) =>
                                        setSearchParams({ ...searchParams, endDate: e.target.value })
                                    }
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
                        >
                            Tìm Kiếm
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
            <Divider orientation="left">Giảm giá sản phẩm</Divider>
            <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />


            <div className="mt-4"></div>
            <div style={{ marginBottom: "30px" }}></div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ marginRight: 8 }}>Danh Sách Khuyến mãi</h3>
                <Button type="primary" shape="round" onClick={showModalAdd}>
                    +Thêm mới khuyến mãi
                </Button>
            </div>

            <Table
                className="text-center"
                columns={columns}
                dataSource={promotions}
                total={pagination.totalItems}
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
                onChange={handleTableChange}
            />
            
            <ModalKhuyenMai open={modalAdd} closeModal={closeModalAdd} />

            <ModalKhuyenMaiEdit
                visible={isModalOpenUpdate}
                closeModal={closeModalUpdate}
                KhuyenMais={promotionData}
            />

            <ModalKhuyenMaiDetail
                visible={isModalOpenDetail}
                closeModal={closeModalDetail}
                KhuyenMais={promotionData}
            />
        </div>
    );
};

export default Promotion;
