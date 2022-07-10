import { Button, Card, Form, Input, notification, Typography } from "antd";
import { useState } from "react";
import { useAuth } from "../Provider/AuthProvider";
import { userService } from "../services";

const Profile = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    setIsLoading(true);
    userService
      .put(
        "/users",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        auth.setUserData(result.data.user);
      })
      .catch((err) => {
        console.error(err);
        notification.open({
          message: "Login Failed",
          description: "Login Failed",
          type: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card title="Profile">
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          id: auth.user.id,
          name: auth.user.name,
          email: auth.user.email,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Profile;
