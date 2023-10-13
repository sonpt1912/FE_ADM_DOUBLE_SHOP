
import React, { useState } from "react";
import TableComponent from "../form/TableCustom";

const DanhGia = () => {
  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Phân loại hàng",
      dataIndex: "phanLoai",
      key: "phanLoai",
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      key: "danhGia",
    },
    {
      title: "Hình ảnh",
      dataIndex: "anh",
      key: "anh",
    },
    {
      title: "Phản hồi",
      dataIndex: "phanHoi",
      key: "phanHoi",
    },
  ];
  const dataSource = [
    {
      key: "1",
      ten: "Nguyen Ngoc Minh",
      time: "12/10/2023",
      phanLoai: "Ao nike the thao",
      danhGia: "10/10",
      anh: "ai đó giúp t đi t méo bt làm phần ảnh",
      phanHoi: "Hang tot, chat lieu mat me"
    },
    {
      key: "2",
      ten: "Nguyen Ngoc Minh",
      time: "12/10/2023",
      phanLoai: "Ao nike the thao",
      danhGia: "10/10",
      anh: "ai đó giúp t đi t méo bt làm phần ảnh",
      phanHoi: "Hang tot, chat lieu mat me"
    },
  ];
  return (
    <>
      <TableComponent columns={columns} dataSource={dataSource} />
    </>
  );
};

export default DanhGia;
