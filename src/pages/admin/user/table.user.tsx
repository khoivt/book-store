import { getUsersAPI } from "@/services/api";
import { dateRangeValidate } from "@/services/helpers";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Descriptions, Drawer, Space, Tag } from "antd";
import { useRef, useState } from "react";
import UserDetail from "./detail.user";

type TSearch = {
  fullName: string;
  email: string;
  createdAt: string;
  createdAtRange: string;
};

const TableUser = () => {
  const actionRef = useRef<ActionType>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userDetail, setUserDetail] = useState<IUserTable | null>(null);
  const columns: ProColumns<IUserTable>[] = [
    {
      title: "_id",
      dataIndex: "_id",
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <a
            href="#"
            onClick={() => {
              setOpenDrawer(true);
              setUserDetail(entity)
            }}
          >
            {entity._id}
          </a>
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      copyable: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      valueType: "date",
      sorter: true,
      defaultSortOrder: "descend",
      hideInSearch: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAtRange",
      valueType: "dateRange",
      hideInTable: true,
    },
    {
      title: "Action",
      hideInSearch: true,
      render() {
        return (
          <>
            <EditTwoTone
              twoToneColor={"#f57800"}
              style={{ cursor: "pointer", marginRight: 15 }}
            />
            <DeleteTwoTone
              twoToneColor={"#ff4d4f"}
              style={{ cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });
  return (
    <>
      <ProTable<IUserTable, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          let query = "";
          if (params) {
            query += `current=${params.current}&pageSize=${params.pageSize}`;
            if (params.fullName) {
              query += `&fullName=/${params.fullName}/i`;
            }
            if (params.email) {
              query += `&email=/${params.email}/i`;
            }
            const createdAtRange = dateRangeValidate(params.createdAtRange);
            if (createdAtRange) {
              query += `&createdAt>=${createdAtRange[0]}&createdAt<=${createdAtRange[1]}`;
            }

            if (sort && sort.createdAt) {
              query += `&sort=${
                sort.createdAt === "ascend" ? "createdAt" : "-createdAt"
              }`;
            }
          }
          const res = await getUsersAPI(query);
          if (res.data) {
            setMeta(res.data.meta);
          }
          return {
            data: res.data?.result,
            page: 1,
            success: true,
            total: res.data?.meta.total,
          };
        }}
        rowKey="_id"
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return <div>{`${range[0]}-${range[1]} per ${total} rows`}</div>;
          },
        }}
        headerTitle="Table user"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            Add new
          </Button>,
        ]}
      />
      <UserDetail openDrawer={openDrawer}
  userDetail={userDetail}
  setOpenDrawer={setOpenDrawer}
  setUserDetail={setUserDetail}/>
    </>
  );
};

export default TableUser;
