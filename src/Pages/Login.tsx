import {
  Button,
  Card,
  Form,
  Input,
  notification,
  Space,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { useState } from "react";

const { Title } = Typography;

const Login = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [api,] = notification.useNotification();
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    setIsLoading(true);
    auth
      .signin({ email: values.email, password: values.password })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
        api.error({
          title: "Login Failed",
          description: "Login Failed"
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (auth.user) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div>
      <Title>Login</Title>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Form
          name="basic"
          labelCol={{ span: 2 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Card title="Login" size="small">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Email"
                  prefix={<UserOutlined />}
                  type="email"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={isLoading}
                >
                  Login
                </Button>
              </Form.Item>
            </Space>
          </Card>
        </Form>
      </Space>
    </div>
  );
};

export default Login;
