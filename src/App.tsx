import { Layout, Typography } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import CustomHeader from "./Components/CustomHeader";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider, RequireAuth } from "./Provider/AuthProvider";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
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
              path="/threads"
              element={
                <RequireAuth>
                  <Title>Threads</Title>
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
