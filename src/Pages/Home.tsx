import { Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Title } = Typography;

const Home = () => {
  const [threads, setThreads] = useState<any>([]);
  useEffect(() => {
    axios.get("http://localhost:5284/threads?limit=10&page=0").then(result => {
        setThreads(result.data);
    }).catch(err => {
        console.log(err);
    })
  }, [threads]);

  return (
    <div>
      <Title>Redis API Forum</Title>
      {threads.forEach((thread: any) => <div>{thread.title}</div>)}
    </div>
  );
};

export default Home;
