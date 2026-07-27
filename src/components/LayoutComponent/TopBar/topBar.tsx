import { BellOutlined, MenuOutlined, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Space } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";
import Sidebar from "../SideBar/Sidebar";
import "./topbar.css";

export const TopBar = () => {
  const authData: any = useAppSelector(
    (state: RootState) => state?.AdminAuthData
  );
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="w3-col w3-hide-small w3-hide-medium"
        style={{ width: "300px" }}
      >
        <br />
      </div>

      {/* Top Bar Card */}
      <div className="w3-rest navbarcontainerwrapper w3-border-bottom">
        <div className="w3-padding">
          <div className="w3-col" style={{ paddingBottom: "5px" }}>
            <div className="w3-col l9 s7 m8">
              <div
                className="w3-col w3-hide-large"
                style={{ paddingTop: "5px", width: "20px" }}
              >
                <MenuOutlined onClick={showDrawer} rev={undefined} />
              </div>
              <div className="w3-rest">
                <input
                  className="w3-col w3-input w3-border w3-round-xlarge"
                  placeholder="Search"
                />
              </div>
            </div>

            <div className="w3-col l3 s5 m4 w3-center">
              <span className="topBarNotificationBell">
                <Link to={""}>
                  <Space size="middle">
                    <Badge style={{ fontSize: "6px" }} size="small" count={0}>
                      <MailOutlined />
                    </Badge>
                  </Space>
                </Link>
                &nbsp;&nbsp; &nbsp;&nbsp;
              </span>

              <span className="topBarNotificationBell">
                <Link to={""}>
                  <Space size="middle">
                    <Badge style={{ fontSize: "6px" }} size="small" count={0}>
                      <BellOutlined />
                    </Badge>
                  </Space>
                </Link>
                &nbsp;&nbsp; &nbsp;&nbsp;
              </span>

              <img
                className="w3-circle"
                style={{ width: "32px", maxWidth: "100%" }}
                alt="logo"
                src={
                  `${process.env.PUBLIC_URL + "/images/auth/profileSample.svg"
                  }` || authData?.data?.credentials.dpUrl
                }
              />
            </div>
          </div>
        </div>
      </div>

      <Drawer
        zIndex={1000000}
        title={
          <span style={{ color: "#fff", fontWeight: 600 }}>
            Supa Records Hotel
          </span>
        }
        placement="left"
        onClose={onClose}
        open={open}
        width={300}
        style={{
          background: "linear-gradient(to bottom right, #23001E 0%, #3A1434 50%, #9E0059 100%)",
        }}
      >
        <Sidebar onLinkChange={onClose}></Sidebar>
      </Drawer>
    </>
  );
};

export default TopBar;
