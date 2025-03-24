import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentApp } from "../context/app.context";
import { Button, Result } from "antd";

interface IProps {
  children: ReactNode;
}
const ProtectedRoute = (props: IProps) => {
  const { isAuthenticated, user } = useCurrentApp();
  const location = useLocation();
  if (!isAuthenticated) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  }

  const isAdminRoute = location.pathname.includes("admin");
  if (isAuthenticated && isAdminRoute) {
    const userRole = user?.role;
    if (userRole !== "ADMIN") {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Button type="primary">Back Home</Button>}
        />
      );
    }
  }
  return <>{props.children}</>;
};

export default ProtectedRoute;
