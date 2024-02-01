import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space, Input, Table, Collapse, Form, Select, Button, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";

import ModalKhuyenMai from "./ModalKhuyenMaiAdd";
import ModalKhuyenMaiEdit from "./ModalKhuyenMaiEdit";
import { SearchOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

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
            title: "value",
            dataIndex: "value",
            key: "value",
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
                    <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer" }} />
                    <FontAwesomeIcon
                        icon={faEdit}
                        style={{ cursor: "pointer" }}
                        onClick={() => openModalUpdate(record.id)}
                    // onClick={showEditModal}
                    />
                    <button
                        onClick={() => handleDelete(record.id)}
                        disabled={record.status === "0"}
                    >Delete</button>
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
                    })
                )
            });
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
        console.log("Response from detailPromotion:", response);
        setPromotionData(response.payload);
        console.log("Promotion Data:", promotionData);
        setIsModalOpenUpdate(true);
    };

    const closeModalUpdate = () => {
        setIsModalOpenUpdate(false);
    };

    const { Option } = Select;

    const items = [
        {
            key: '1',
            label: 'Tìm Kiếm',
            children: <div>
                <div>
                    <h1>Tìm kiếm</h1>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Form.Item label="Code" >
                            <Input placeholder="Search by Code" style={{ width: "270px" }}
                                value={searchParams.code}
                                onChange={(e) =>
                                    setSearchParams({ ...searchParams, code: e.target.value })
                                }

                            />
                        </Form.Item>
                        <Form.Item label="Name" style={{ marginLeft: "30px" }} >
                            <Input placeholder="Search by Name" style={{ width: "270px" }}
                                value={searchParams.name}
                                onChange={(e) =>
                                    setSearchParams({ ...searchParams, name: e.target.value })
                                }
                            />
                        </Form.Item>


                        <Form.Item label="Status" style={{ marginLeft: "30px" }}>
                            <Select
                                style={{ width: "270px", }}
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
                    </div>
                </div>
                <div className="text-center">
                    <Form.Item wrapperCol={{ offset: 10 }}>
                        <Button type="primary" htmlType="submit" onClick={onClickSearch} >
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </div>
            </div>,
        },
    ];
    const onChange = (key) => {
        console.log(key);
    };

    return (
        <div>

            <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />


            <div className="mt-4"></div>
            <hr />
            <div style={{ marginBottom: "30px" }}></div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ marginRight: 8 }}>Danh Sách </h3>
                <Button type="primary" shape="round" onClick={showModalAdd}>
                    Thêm Màu
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
            <ModalKhuyenMai open={modalAdd} closeModal={closeModalAdd} />

            <ModalKhuyenMaiEdit
                visible={isModalOpenUpdate}
                closeModal={closeModalUpdate}
                KhuyenMais={promotionData}
            />
        </div>
    );
};

export default Promotion;
