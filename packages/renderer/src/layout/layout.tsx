import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Button, Flex, type MenuProps, message } from "antd";
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
  {
    type: "divider",
  },
  {
    key: "/setting",
    icon: <SettingOutlined />,
    label: <Link to="/setting">Settings</Link>,
  },
  {
    key: "/logout",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];

const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const {useLogout} = useAuth();
  const logoutMutation = useLogout();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          theme="light"
          width={siderWidth}
          collapsible
          collapsedWidth={75}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{
            overflow: "auto",
            height: "100%",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            borderRight: "1px solid #5f5f5fff",
          }}
        >
          <div
            style={{
              height: 64,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: 8,
            }}
          />
          <Menu
            theme="light" // TODO: textprimarycolor
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e: any) => {
  if (e.key === "/logout") {
    onLogout();
  } else {
    handleClick(e);
  }
}}

            items={items}

          />
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? 80 : siderWidth,
            transition: "margin-left 0.2s",
          }}
        >
          <Header
            style={{
              padding: "0 16px",
              background: colorBgContainer,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <VerticalLeftOutlined /> : <VerticalRightOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
              }}
            />
          </Header>

          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default LayoutComponent;
