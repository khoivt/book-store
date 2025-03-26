import { FORMATE_DATE, FORMATE_DATE_VN } from "@/services/helpers";
import { Badge, Descriptions, DescriptionsProps, Drawer } from "antd";
import dayjs from "dayjs";

interface IUserDetail {
  openDrawer: boolean;
  userDetail: IUserTable | null;
  setOpenDrawer: (v: boolean) => void;
  setUserDetail: (v: IUserTable | null) => void;
}

const UserDetail = (props: IUserDetail) => {
  const { openDrawer, userDetail, setOpenDrawer, setUserDetail } = props;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Id",
      children: <p>{userDetail?._id}</p>,
      span: 3,
    },
    {
      key: "2",
      label: "Full Name",
      children: <p>{userDetail?.fullName}</p>,
      span: 3,
    },
    {
      key: "3",
      label: "Email",
      children: <p>{userDetail?.email}</p>,
      span: 3,
    },
    {
      key: "4",
      label: "Phone",
      children: <p>{userDetail?.phone}</p>,
      span: 3,
    },
    {
      key: "5",
      label: "Role",
      children: <Badge status="processing" text={userDetail?.role} />,
      span: 3,
    },
    {
      key: "6",
      label: "Created At",
      children: <p>{dayjs(userDetail?.createdAt).format(FORMATE_DATE_VN)}</p>,
      span: 2,
    },
    {
      key: "7",
      label: "Updated At",
      children: <p>{dayjs(userDetail?.updatedAt).format(FORMATE_DATE_VN)}</p>,
      span: 2,
    },
  ];
  return (
    <Drawer
      title="User Detail"
      width={"50vw"}
      onClose={() => {
        setOpenDrawer(false);
        setUserDetail(null);
      }}
      open={openDrawer}
    >
      <Descriptions title="User Info" bordered items={items} />
    </Drawer>
  );
};

export default UserDetail;
