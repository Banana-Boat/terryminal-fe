import {
  ControlOutlined,
  CodeOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Image } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import logo from "@/assets/terminal.svg";
import { useUserStore } from "@/stores/user";
import { useCallback } from "react";

function AppLayout() {
  const navigate = useNavigate();

  const { isLogin, resetUser } = useUserStore();

  const onLogout = useCallback(() => {
    localStorage.removeItem("token");
    resetUser();
    navigate("/login");
  }, []);

  return (
    <Layout style={{ display: "flex", flexDirection: "column" }}>
      <Header
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          height: 64,
          padding: "0 20px",
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
          {isLogin && (
            <Menu
              mode="horizontal"
              inlineIndent={100}
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <ControlOutlined />,
                  label: "控制台",
                  onClick: () => navigate("dashboard"),
                },
                {
                  key: "2",
                  icon: <CodeOutlined />,
                  label: "学习",
                  onClick: () => navigate("launch-learning"),
                },
                {
                  key: "3",
                  icon: <InfoCircleOutlined />,
                  label: "关于",
                  onClick: () => navigate("about"),
                },
              ]}
            />
          )}
        </div>

        {/* 待改！！！！！ */}
        {isLogin && (
          <Button onClick={onLogout} icon={<LogoutOutlined />}>
            注销
          </Button>
        )}
      </Header>

      <Content
        style={{
          display: "flex",
          height: "calc(100vh - 64px)",
          backgroundColor: "#fff",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
}

export default AppLayout;
