import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Space, Input, Table, Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
//bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import ModalChatLieu from "./ModalChatLieuAdd";
import ModalChatLieuEdit from "./ModalChatLieuEdit";
// import ModalColorUpdate from "./ModalChatLieuUpdate";
import { SearchOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
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
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (record.status === 0 ? "Inactive" : "Active"),
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
              value={searchParams.code}
              onChange={(e) =>
                setSearchParams({ ...searchParams, code: e.target.value })
              }
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
      style={{
        maxWidth: 1100,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
        className="text-center"
        columns={columns}
        dataSource={materials}
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
