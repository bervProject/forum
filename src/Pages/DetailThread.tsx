import { Card, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { threadService } from "../services";

const { Text, Paragraph } = Typography;

const DetailThread = () => {
  let { threadId } = useParams();
  const [thread, setThread] = useState<any>(null);

  useEffect(() => {
    threadService
      .get(`/threads/${threadId}`)
      .then((result) => {
        setThread(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [threadId]);

  if (thread == null) {
    return <></>;
  }
  return (
    <>
      <Card title={thread.title}>
        <Text>
          <b>Created by: {thread.user.name}</b>
        </Text>
        <Paragraph>{thread.post}</Paragraph>
      </Card>
    </>
  );
};

export default DetailThread;
