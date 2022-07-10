import { Button, Card, Form, Input, Select, Space, Typography } from "antd";

import { useState } from "react";
import { useAuth } from "../Provider/AuthProvider";
import { threadService } from "../services";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const NewThread = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    setIsLoading(true);
    const accessToken = auth.getAccessToken();
    threadService
      .post(
        "/threads",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Title>New Thread</Title>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Form
          name="basic"
          labelCol={{ span: 2 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Card title="New Thread" size="small">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please input your title!" },
                ]}
              >
                <Input size="large" placeholder="Title" />
              </Form.Item>
              <Form.Item label="Tags" name="tags">
                <Select
                  mode="tags"
                  size="large"
                  placeholder="Tags"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Input size="large" placeholder="Category" />
              </Form.Item>
              <Form.Item
                label="Body"
                name="post"
                rules={[
                  {
                    required: true,
                    message: "Please input your body of thread!",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Place your body of thread here"
                  autoSize
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={isLoading}
                >
                  Create
                </Button>
              </Form.Item>
            </Space>
          </Card>
        </Form>
      </Space>
    </div>
  );
};
export default NewThread;
