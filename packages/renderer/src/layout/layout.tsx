import React, { useState, useEffect } from "react";
import { BorderBottomOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Button,
  Flex,
  type MenuProps,
  message,
  Dropdown,
  Typography,
} from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import asymptoteLogo from "../../src/assets/logos/asymptote-logo-white.svg";
const { Header, Content, Footer, Sider } = Layout;

const siderWidth = 200;

// Menu items
const items: MenuProps["items"] = [
  {
    key: "/dashboard", // Use path as key
    icon: <HomeOutlined />,
    label: <Link to="/dashboard">Home</Link>,
  },
  {
    key: "/nav2",
    icon: <VideoCameraOutlined />,
    label: <Link to="/">Nav 2</Link>,
  },
  {
    key: "/nav3",
    icon: <UploadOutlined />,
    label: <Link to="/">Nav 3</Link>,
  },
  {
    key: "/nav4",
    icon: <UserOutlined />,
    label: <Link to="/">Nav 4</Link>,
  },

];

const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname); // Default selected key
  const { useLogout } = useAuth();
  const logoutMutation = useLogout();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const themes = theme.useToken();
  // Update selectedKey whenever route changes
  useEffect(() => {
    const basePath = "/" + location.pathname.split("/")[1];
    setSelectedKey(basePath);
  }, [location.pathname]);

  const handleClick = (e: any) => {
    if (e.key === "logout") {
      console.log("Logging out...");
      return;
    }
    setSelectedKey(e.key); // For manual clicks, though useEffect also updates it
  };
  const onLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Logout successful!",
        });
        navigate("/login", { replace: true });
      },
      onError: (error: any) => {
        messageApi.open({
          type: "error",
          content: error.message || "Logout failed",
        });
      },
    });
  };
  return (
    <Flex
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
        width: "100%",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <Layout style={{ height: "100%", width: "100%" }}>
        <Sider
          trigger={null}
          width={siderWidth}
          collapsible
          collapsedWidth={75}
          collapsed={true}
          onCollapse={setCollapsed}
          style={{
            overflow: "auto",
            height: "100%",
            position: "fixed",
            padding: 0,
            left: 0,
            top: 0,
            bottom: 0,
            borderRight: "1px solid #c4423d",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: 64,
              margin: 16,
              borderRadius: 8,
            }}
          >
            <img src={asymptoteLogo} width="50" alt="" />
          </div>
          <Menu
          defaultSelectedKeys={[selectedKey]}
  mode="inline"
  selectedKeys={[selectedKey]} // Use controlled selectedKey
  onClick={(e: any) => {
    if (e.key === "/logout") {
      onLogout();
    } else {
      setSelectedKey(e.key);
    }
  }}
  items={[
    ...items,
    {
      key: "/setting", // Also add this so it highlights when accessed from Dropdown
      icon: <SettingOutlined />,
      label: <Link to="/setting">Settings</Link>,
    },
  ]}
/>
          <div
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Dropdown
  menu={{
    selectedKeys: [selectedKey],
    items: [
      {
        key: "/profile",
        icon: <UserOutlined />,
        label: <Link style={{ color: "#ffffff" }} to="/profile">Profile</Link>,
      },
      {
        key: "/setting",
        icon: <SettingOutlined />,
        label: <Link style={{ color: "#ffffff" }} to="/setting">Settings</Link>,
      },
      {
        type: "divider",
      },
      {
        key: "/logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        danger: true,
      },
    ],
    onClick: (e: any) => {
      if (e.key === "/logout") {
        onLogout();
      } else {
        setSelectedKey(e.key);
        navigate(e.key);
      }
    },
  }}
  placement="top"
>
  <Button
    type="text"
    icon={<UserOutlined />}
    style={{ fontSize: "16px", width: "100%", margin: 5 }}
  />
</Dropdown>

          </div>
        </Sider>

        <Layout
          style={{
            marginLeft: 76,
            transition: "margin-left 0.2s",
          }}
        >
          <Header
            style={{
              padding: 24,
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #c4423d",
              justifyContent: "space-between",
              flexDirection: "row-reverse",

            }}
          >
            <Typography.Text level={1}>v1.00</Typography.Text>
            {/* <Button
              type="text"
              icon={
                collapsed ? <VerticalLeftOutlined /> : <VerticalRightOutlined />
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
              }}
            /> */}
          </Header>

          <Content
            style={{
  overflow: "initial",
  background: 'linear-gradient(90deg, #21252cff, #c4413d1e)', // <-- here
  margin: 15,
  borderRadius: 8,
  padding: 24,
  height: '100%'
}}

          >
            <h1 style={{ textAlign: "left",textTransform: "capitalize" }}>{location.pathname.split("/")[1]}.</h1>
            <div
              style={{
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>

          {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    </Flex>
  );
};

export default LayoutComponent;
