"use client";

import { Button, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { usePathname, useSearchParams } from "next/navigation";

import ModalCreateUser from "../modal/modal.createuser";
import { useState } from "react";

interface IProps {
  users: any;
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}

const UserTable = (props: IProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, meta } = props;
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: any) => {
        return <p>{type ? "Admin" : "User"}</p>;
      },
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: any) => {
        return (
          <Tag color={isActive ? "green" : "red"}>
            {isActive ? "Yes" : "No"}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      render: (record: any) => {
        return (
          <div>
            <Button
              shape="circle"
              icon={<EditOutlined />}
              className="mr-3"
              onClick={() => console.log(record, "kkkk")}
            />
            <Button shape="circle" icon={<DeleteOutlined />} danger />
          </div>
        );
      },
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pagination.current);
      params.set("limit", pagination.pageSize);
      window.location.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span>Manager Users</span>
        <Button onClick={() => setIsModalOpen(true)}>Create User</Button>
      </div>
      <Table
        bordered
        dataSource={users}
        columns={columns}
        rowKey={"id"}
        pagination={{
          current: meta.currentPage,
          pageSize: meta.itemsPerPage,
          showSizeChanger: true,
          total: meta.totalItems,
          showTotal: () => {
            return <>Total {meta.totalItems} users</>;
          },
        }}
        onChange={onChange}
      />
      <ModalCreateUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default UserTable;
