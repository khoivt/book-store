import { useState } from "react";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Divider, Badge, Drawer, Avatar, Popover, App } from "antd";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";
import "./app.header.scss";
import { Link } from "react-router-dom";
import { useCurrentApp } from "components/context/app.context";
import { logoutAPI } from "@/services/api";

const AppHeader = (props: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { isAuthenticated, user, setUser, setIsAuthenticated } =
    useCurrentApp();

  const navigate = useNavigate();
  const { message } = App.useApp();

  const handleLogout = async () => {
    const res = await logoutAPI();

    if (res.data) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
      message.success("Logout successful!");
      navigate("/");
    }
  };

  let items = [
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => alert("me")}>
          Manage Account
        </label>
      ),
      key: "account",
    },
    {
      label: <Link to="/history">Transaction History</Link>,
      key: "history",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Log out
        </label>
      ),
      key: "logout",
    },
  ];
  if (user?.role === "ADMIN") {
    items.unshift({
      label: <Link to="/admin">Admin</Link>,
      key: "admin",
    });
  }

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;

  const contentPopover = () => {
    return (
      <div className="pop-cart-body">
        {/* <div className='pop-cart-content'>
                    {carts?.map((book, index) => {
                        return (
                            <div className='book' key={`book-${index}`}>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} />
                                <div>{book?.detail?.mainText}</div>
                                <div className='price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {carts.length > 0 ?
                    <div className='pop-cart-footer'>
                        <button onClick={() => navigate('/order')}>Xem giỏ hàng</button>
                    </div>
                    :
                    <Empty
                        description="Không có sản phẩm trong giỏ hàng"
                    />
                } */}
      </div>
    );
  };
  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <span className="logo">
                <span onClick={() => navigate("/")}>
                  {" "}
                  <FaReact className="rotate icon-react" />
                  BookStore
                </span>

                <VscSearchFuzzy className="icon-search" />
              </span>
              <input
                className="input-search"
                type={"text"}
                placeholder="What are you looking for?"
                // value={props.searchTerm}
                // onChange={(e) => props.setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <nav className="page-header__bottom">
            <ul id="navigation" className="navigation">
              <li className="navigation__item">
                <Popover
                  className="popover-carts"
                  placement="topRight"
                  rootClassName="popover-carts"
                  title={"Product Recently Add"}
                  content={contentPopover}
                  arrow={true}
                >
                  <Badge
                    // count={carts?.length ?? 0}
                    count={10}
                    size={"small"}
                    showZero
                  >
                    <FiShoppingCart className="icon-cart" />
                  </Badge>
                </Popover>
              </li>
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")}> Login</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <Space>
                      <Avatar src={urlAvatar} />
                      {user?.fullName}
                    </Space>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Manage Account</p>
        <Divider />

        <p>Logout</p>
        <Divider />
      </Drawer>
    </>
  );
};

export default AppHeader;
