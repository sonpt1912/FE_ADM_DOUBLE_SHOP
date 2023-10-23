
import React, { useState } from "react";
import Tablecbn from "../DanhGia/table";

const HangKhachHang = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
    //   key: "key",
    },
    {
      title: "Tên",
      dataIndex: "ten",
    //   key: "ten",
    },
    {
      title: "Hạng",
      dataIndex: "tenHang",
    //   key: "phanLoai",
    },
    {
      title: "Điểm",
      dataIndex: "diem",
    //   key: "danhGia",    
    },
    
  ];
  const dataSource = [
    {
        key: "1",
        ten: "Nguyen Ngoc Minh",
        tenHang: "VIP",
        diem: "100.000.000",
    },
    {
        key: "2",
        ten: "Nguyen Ngoc Minh",
        tenHang: "VIP",
        diem: "100.000.000",
    },
  ];
  return (
    <>
      <Tablecbn columns={columns} dataSource={dataSource} />
    </>
  );
};

export default HangKhachHang;
