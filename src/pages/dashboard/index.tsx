import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Menu, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";

interface IProps {}

function DashboardLayout({}: IProps) {
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <Sider theme="light" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <AppstoreOutlined />,
                label: "终端管理",
                onClick: () => navigate("term-management"),
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: "个人信息",
                onClick: () => navigate("user-info"),
              },
            ]}
          />
        </Sider>
        <Content style={{ padding: "20px" }}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "25px",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default DashboardLayout;
