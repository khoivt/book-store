import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useCurrentApp } from "./components/context/app.context";
import AppHeader from "./components/layout/app.header";
import { fetchAccountAPI } from "./services/api";
import HashLoader from "react-spinners/HashLoader";

const Layout = () => {
  const { isAppLoading, setUser, setIsAppLoading, setIsAuthenticated } =
    useCurrentApp();
  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      if (res.data) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
      setIsAppLoading(false);
    };

    fetchAccount();
  }, []);

  return (
    <>
      {isAppLoading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <HashLoader />
        </div>
      ) : (
        <div>
          <AppHeader />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Layout;
