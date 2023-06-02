import "./App.module.scss";
import { Button, Image, Layout, Menu, theme } from "antd";
const { Header, Content } = Layout;
import {
  CodeOutlined,
  ControlOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import logo from "./assets/terminal.svg";
import LearnPage from "./pages/learn-page";
import DashboardPage from "./pages/dashboard-page";
import AboutPage from "./pages/about-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout className="layout">
      <Header
        style={{
          background: colorBgContainer,
          position: "relative",
          display: "flex",
          alignItems: "center",
          height: 64,
          borderBottom: "1px solid #f0f0f0",
          boxShadow: "#ececec 2px 2px 10px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyItems: "space-between",
          }}
        >
          <div style={{ display: "flex", width: 180 }}>
            <Image
              style={{ width: 40, height: 40, marginRight: 10 }}
              preview={false}
              src={logo}
            />
            <span style={{ fontSize: 18, fontWeight: "bold" }}>Terryminal</span>
          </div>

          {/* 待改！！！！！ */}
          {location.pathname !== "/" && (
            <Menu
              mode="horizontal"
              inlineIndent={100}
              defaultSelectedKeys={["2"]}
              items={[
                {
                  key: "1",
                  icon: <ControlOutlined />,
                  label: "控制台",
                  onClick: () => navigate("/dashboard"),
                },
                {
                  key: "2",
                  icon: <CodeOutlined />,
                  label: "学习",
                  onClick: () => navigate("/learn"),
                },
                {
                  key: "3",
                  icon: <InfoCircleOutlined />,
                  label: "关于",
                  onClick: () => navigate("/about"),
                },
              ]}
            />
          )}
        </div>

        {/* 待改！！！！！ */}
        {location.pathname !== "/" && (
          <Button onClick={() => navigate("/")} icon={<LogoutOutlined />}>
            注销
          </Button>
        )}
      </Header>

      <Content
        style={{
          background: colorBgContainer,
          display: "flex",
          height: "calc(100vh - 64px)",
        }}
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/" element={<RegisterPage />} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
