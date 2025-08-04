import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  theme,
  Typography,
  message,
} from "antd";
import grayAbstract from "../../assets/videos/gray-abstract-2.mp4";
import asymptoteLogo from "../../assets/logos/asymptote-logo-white.svg";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { useLogin } = useAuth();
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: any) => {
    // Map username to email for API
    loginMutation.mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "Login successful!",
          });
          navigate("/", { replace: true });

          // TODO: redirect or update UI here
        },
        onError: (error: any) => {
          messageApi.open({
            type: "error",
            content: error.message || "Login failed",
          });
        },
      }
    );
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
      {contextHolder}
      <div>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: -2,
            background:
              "linear-gradient(135deg, #0e161dff 20%, #ac211dff 200%)",
          }}
        />
        {/* Background Video */}
        <video
          src={grayAbstract}
          autoPlay
          loop
          muted
          style={{
            opacity: 1,
            position: "fixed",
            mixBlendMode: "overlay",
            top: 0,
            width: "100%",
            height: "100vh",
            left: 0,
            objectFit: "cover",
            zIndex: -1,
          }}
        />
        {/* Login Form */}
        <Flex
          justify="center"
          align="center"
          style={{ flexDirection: "column" }}
        >
          <img
            src={asymptoteLogo}
            alt="Asymptote Logo"
            style={{ width: "100px", marginBottom: "20px" }}
          />
          <Typography.Paragraph
            style={{ color: theme.useToken().token.colorText }}
          >
            Welcome to Asymptote POS
          </Typography.Paragraph>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            style={{
              width: 400,
              background: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(100px)",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              padding: 32,
              borderRadius: 12,
            }}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={loginMutation.isPending}
                disabled={loginMutation.isPending}
              >
                Log in
              </Button>
              {/* <a href="#">Register now!</a> */}
            </Form.Item>
          </Form>
        </Flex>
      </div>
    </Flex>
  );
};

export default LoginPage;
