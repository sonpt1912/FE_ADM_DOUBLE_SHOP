import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space, Input, Table, Collapse } from "antd";
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
        // code: "",
        name: "",
    });

    useEffect(() => {
        dispatch(
            fetchPromotions({
                page: 0,
                pageSize: 5,
                // code: searchParams.code,
                name: searchParams.name,
            })
        );
    }, [dispatch]);

    const onClickSearch = () => {
        dispatch(
            fetchPromotions({
                page: 0,
                pageSize: 5,
                // code: searchParams.code,
                name: searchParams.name,
            })
        );

        setSearchParams({
            // code: "",
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
            title: "name",
            dataIndex: "name",
            key: "name",
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
            render: (text, record) => (record.status === "0" ? "Inactive" : "Active"),
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
                        // code: searchParams.code,
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

    const items = [
        {
            key: '1',
            label: 'Tìm Kiếm',
            children: <div>
                <div className="text-center">
                    <h1>Tìm kiếm</h1>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <p>Tim kiếm theo Mã Chất Liệu:</p>
                        <Input
                            placeholder="Mã Chất Liệu"
                            // value={searchParams.code}
                            // onChange={(e) =>
                            //     setSearchParams({ ...searchParams, code: e.target.value })
                            // }
                        />
                    </div>
                    <div className="col-lg-6">
                        <p>Tim kiếm theo Tên chất liệu:</p>
                        <Input
                            value={searchParams.name}
                            placeholder="Tên Chất Liệu"
                            onChange={(e) =>
                                setSearchParams({ ...searchParams, name: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="mt-4"></div>
                <div className="text-center">
                    <button
                        onClick={onClickSearch}
                        className="ps-4 pe-4 border border-5 border-primary rounded bg-primary" style={{ color: "white" }}>Seach</button>
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
            {/* <Collapse components={components} /> */}
            <div style={{ marginBottom: "30px" }}></div>

            <div className="row mx-auto container">
                <div className="col-lg-9">
                    <h1>Danh Sách Chất Liệu</h1>
                </div>
                <div className="col-lg-3">
                    <button onClick={showModalAdd} className="float-end me-4 border border-5 border-primary rounded bg-primary" style={{ color: "white" }}>+Thêm mới</button>
                </div>
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
