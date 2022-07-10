import { Button, Card, Select, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { threadService } from "../services";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const Home = () => {
  const auth = useAuth();
  const [limit, setLimit] = useState<number>(5);
  const [threads, setThreads] = useState<any>([]);

  const handleChange = (size: number) => {
    setLimit(size);
  };
  useEffect(() => {
    threadService
      .get(`/threads?limit=${limit}&page=0`)
      .then((result) => {
        setThreads(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [limit]);

  return (
    <div>
      <Title>Redis API Forum</Title>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        {auth.user ? (
          <Button type="primary" href="/thread">
            Create Thread
          </Button>
        ) : undefined}
        <Select defaultValue={5} style={{ width: 120 }} onChange={handleChange}>
          <Option value="5">5</Option>
          <Option value="10">10</Option>
          <Option value="15">15</Option>
          <Option value="20">20</Option>
        </Select>
        {threads.map((thread: any) => (
          <Card
            key={thread.id}
            title={<Link to={`/thread/${thread.id}`}>{thread.title}</Link>}
          >
            <Text>
              <b>Created by: {thread.user.name}</b>
            </Text>
            <Paragraph>{thread.post}</Paragraph>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default Home;
