import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const siderWidth = 200;

// const menuItems = [
//   {
//     key: '1',
//     icon: <UserOutlined />,
//     label: 'Nav 1',
//   },
//   {
//     key: '2',
//     icon: <VideoCameraOutlined />,
//     label: 'Nav 2',
//   },
//   {
//     key: '3',
//     icon: <UploadOutlined />,
//     label: 'Nav 3',
//   },
//   {
//     key: '4',
//     icon: <UserOutlined />,
//     label: 'Nav 4',
//   },
//   {
//     type: 'divider',
//   },
//   {
//     key: 'settings',
//     icon: <SettingOutlined />,
//     label: 'Settings',
//   },
//   {
//     key: 'logout',
//     icon: <LogoutOutlined />,
//     label: 'Logout',
//   },
// ];

const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        theme="light"
        width={siderWidth}
        collapsible
        collapsedWidth={75}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          overflow: 'auto',
          height: '100dvh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          borderRight: '1px solid #f0f0f0',
        }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 8,
          }}
        />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : siderWidth,
          transition: 'margin-left 0.2s',
        }}
      >
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
            }}
          />
        </Header>

        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
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
            Content for {selectedKey}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
