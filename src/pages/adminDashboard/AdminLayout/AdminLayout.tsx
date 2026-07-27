import "./AdminLayout.css";
import { Outlet } from "react-router-dom";
import { Layout, Space } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Sidebar from "../../../components/LayoutComponent/SideBar/Sidebar";
import TopBar from "../../../components/LayoutComponent/TopBar/topBar";

const AdminLayout = () => {
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", height: "100%" }}
      size={[0, 48]}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className="w3-hide-small w3-hide-medium"
          width={300}
        >
          <div className="sideMenuFixed bg-gradient-to-br from-primary via-primary-light to-brand">
            <Sidebar></Sidebar>
          </div>
        </Sider>
        <Layout>
          <div className="fixedHeader">
            <TopBar></TopBar>
          </div>
          <Content className="content admin-content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Space>
  );
};

export default AdminLayout;
