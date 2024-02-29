import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space, Input, Table, Collapse, Form, Select, Button, Divider, Row, Col, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";

import ModalKhuyenMai from "./ModalKhuyenMaiAdd";
import ModalKhuyenMaiEdit from "./ModalKhuyenMaiEdit";
import ModalKhuyenMaiDetail from "./ModalKhuyenMaiChiTiet";
import Material from "../SanPham/ChatLieu/ChatLieu";
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import { fetchPromotions, Delete, detail } from "../../../store/slice/KhuyenMaiReducer";
const Promotion = () => {
    const dispatch = useDispatch();
    const promotions = useSelector((state) => state.promotion.promotions);
    const pagination = useSelector((state) => state.promotion.pagination);
    console.log("Pagination", pagination);
    const loading = useSelector((state) => state.promotion.status === "loading");

    const [searchParams, setSearchParams] = useState({
        code: "",
        name: "",
    });

    useEffect(() => {
        dispatch(
            fetchPromotions({
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
            fetchPromotions({
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
            title: "code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "discountAmount",
            dataIndex: "discountAmount",
            key: "discountAmount",
        },
        {
            title: "discountPercent",
            dataIndex: "discountPercent",
            key: "discountPercent",
        },
        {
            title: "startDate",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "endDate",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "status",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (record.status == "0" ? "Ngừng hoạt động" : record.status == "1" ? "Đang hoạt động" : "Chưa hoạt động"),
        },
        {
            title: "ChucNang",
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
                        onClick={() => handleDelete(record.id)} disabled={record.status === 0} />

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
                            <Form.Item label="Code">
                                <Input
                                    placeholder="Enter code"
                                    style={{ width: "100%" }}
                                    value={searchParams.code}
                                    onChange={(e) =>
                                        setSearchParams({ ...searchParams, code: e.target.value })
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Name">
                                <Input
                                    placeholder="Enter name"
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
                                    <Option value="0">0</Option>
                                    <Option value="1">1</Option>
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
                            Search
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
            <Divider orientation="left">Promotion</Divider>
            <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />


            <div className="mt-4"></div>
            <hr />
            <div style={{ marginBottom: "30px" }}></div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ marginRight: 8 }}>Danh Sách </h3>
                <Button type="primary" shape="round" onClick={showModalAdd}>
                    Add Promotion
                </Button>
            </div>

            <Table
                className="text-center"
                columns={columns}
                dataSource={promotions}
                bordered
                pagination={{
                    pageSize: pagination.pageSize,
                    total: pagination.totalItems,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    // showTotal: (totalPages) => `Total ${totalPages} items`,
                }}
                scroll={{
                    x: 1000,
                    y: 300,
                }}
                loading={loading}
                // title={getTitle}
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
