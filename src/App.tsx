import { Layout, Typography } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import CustomHeader from "./Components/CustomHeader";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider, RequireAuth } from "./Provider/AuthProvider";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NewThread from "./Pages/NewThread";
import DetailThread from "./Pages/DetailThread";
import Profile from "./Pages/Profile";
const { Title } = Typography;

function App() {
  return (
    <AuthProvider>
      <Layout className="layout">
        <CustomHeader />
        <Content style={{ padding: "10px 50px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/thread"
              element={
                <RequireAuth>
                  <NewThread />
                </RequireAuth>
              }
            />
            <Route
              path="/thread/:threadId"
              element={
                <RequireAuth>
                  <DetailThread />
                </RequireAuth>
              }
            />
            <Route
              path="/me/thread"
              element={
                <RequireAuth>
                  <Title>My Threads</Title>
                </RequireAuth>
              }
            />
            <Route
              path="/me"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Routes>
        </Content>
        <Footer>Copyright 2022 Bervianto Leo Pratama</Footer>
      </Layout>
    </AuthProvider>
  );
}

export default App;
