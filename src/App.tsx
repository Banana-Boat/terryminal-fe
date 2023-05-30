import { TermSocketProvider } from "./contexts/term-socket";
import Terminal from "./components/terminal";
import ChatBot from "./components/chat-bot";
import "./App.module.scss";
import { Avatar, Button, Image, Layout, Menu, theme } from "antd";

const { Header, Content } = Layout;

import logo from "./assets/terminal.svg";
import {
  CodeOutlined,
  ControlOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
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
              <span style={{ fontSize: 18, fontWeight: "bold" }}>
                Terryminal
              </span>
            </div>

            <Menu
              mode="horizontal"
              inlineIndent={100}
              defaultSelectedKeys={["2"]}
              items={[
                {
                  key: "1",
                  icon: <ControlOutlined />,
                  label: "控制台",
                },
                {
                  key: "2",
                  icon: <CodeOutlined />,
                  label: "学习",
                },
                {
                  key: "3",
                  icon: <InfoCircleOutlined />,
                  label: "关于",
                },
              ]}
            />
          </div>

          <Button icon={<LogoutOutlined />}>注销</Button>
        </Header>
        <Content
          style={{
            background: colorBgContainer,
            display: "flex",
            height: "calc(100vh - 64px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "60%",
              padding: 10,
            }}
          >
            <TermSocketProvider>
              <Terminal ptyID="xtg1" />
              <Terminal ptyID="xtg2" />
            </TermSocketProvider>
          </div>
          <div style={{ width: "40%", margin: 10, overflow: "scroll" }}>
            <ChatBot />
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default App;
