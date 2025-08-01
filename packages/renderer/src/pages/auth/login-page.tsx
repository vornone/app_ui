import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, theme, Typography } from 'antd';
import grayAbstract from '../../assets/videos/gray-abstract.mp4';
import asymptoteLogo from '../../assets/logos/asymptote-logo.svg';
const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div >

      {/* Background Video */}
      <video
        src={grayAbstract}
        autoPlay
        loop
        muted
        style={{
          filter: 'brightness(0.3)',
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '100vh',
          left: 0,
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      {/* Login Form */}
      <Flex justify="center" align="center" style={{flexDirection: 'column' }}>
        <img src={asymptoteLogo} alt="Asymptote Logo" style={{width: '100px', marginBottom: '20px'}} />
        <Typography.Paragraph  style={{ color: theme.useToken().token.colorText }}>
          Welcome to Asymptote POS
        </Typography.Paragraph>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          style={{
            width: 400,
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: 32,
            borderRadius: 12,
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            {/* <a href="#">Register now!</a> */}
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

export default LoginPage;
