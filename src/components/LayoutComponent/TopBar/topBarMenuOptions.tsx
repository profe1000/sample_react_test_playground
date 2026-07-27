import {
  DashboardOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LogoutOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";
import { appZIndex } from "../../../utils/appconst";
import "./topbar.css";
import TopBarSwitchAccount from "./topBarSwitchAccount";
type NotificationType = "success" | "info" | "warning" | "error";

type ITopBarMenuOption = {
  onLinkChange?: () => void;
  onUserType?: string;
};

export const TopBarMenuOption: React.FC<ITopBarMenuOption> = ({
  onLinkChange,
}) => {
  const location = useLocation();
  const [currentUrlPath, setCurrentUrlPath] = useState("");
  const [menu, setMenu] = useState<IMenuType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [accountType, setAccountType] = useState<"Advertiser" | "Publisher">(
    "Publisher"
  );
  const [api, contextHolder] = notification.useNotification();
  const { confirm } = Modal;

  const authData:  any = useAppSelector(
    (state: RootState) => state?.AdminAuthData
  );

  const navigate = useNavigate();

  type IMenuType = {
    icon: string | any;
    url: string;
    title: string;
    onClick?: () => void;
  };

  //Logout Confirmation
  const showLogoutConfirm = () => {
    confirm({
      title: "Are you sure you want to logout from this application.",
      icon: <ExclamationCircleFilled rev={undefined} />,
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      zIndex: appZIndex.modal,
      onOk() {
        navigate("/advertiser/logout");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const menuPublisher: IMenuType[] = [
    { icon: <UserAddOutlined />, url: "/publisher/profile", title: "Profile" },
    {
      icon: <EditOutlined />,
      url: "/publisher/profile-edit",
      title: "Edit Profile",
    },
    {
      icon: <UserSwitchOutlined />,
      url: "/publisher/",
      title: "Switch Account",
      onClick: () => {
        setAccountType("Advertiser");
        setOpenModal(true);
      },
    },
    {
      icon: <LogoutOutlined />,
      url: "/publisher/logout",
      title: "Logout",
      onClick: () => {
        showLogoutConfirm();
      },
    },
  ];

  const menuAdvertiser: IMenuType[] = [
    { icon: <UserAddOutlined />, url: "/advertiser/profile", title: "Profile" },
    {
      icon: <EditOutlined />,
      url: "/advertiser/profile-edit",
      title: "Edit Profile",
    },
    {
      icon: <UserSwitchOutlined />,
      url: "/advertiser/",
      title: "Switch Account",
      onClick: () => {
        setAccountType("Publisher");
        setOpenModal(true);
      },
    },
    {
      icon: <LogoutOutlined />,
      url: "/advertiser/logout",
      title: "Logout",
      onClick: () => {
        showLogoutConfirm();
      },
    },
  ];

  const handleCancelModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // execute on location change
    setCurrentUrlPath(location.pathname);
    if (onLinkChange) {
      onLinkChange();
    }
    updateMenuType();
  }, [location, authData]);

  const updateMenuType = () => {
    // Used Url path to check
    if (currentUrlPath.includes("/publisher")) {
      setMenu(menuPublisher);
      // console.log(menu);
    } else if (currentUrlPath.includes("/advertiser")) {
      setMenu(menuAdvertiser);
    }

    // Used Redux value if it exist
    if (authData.data?.credentials.activeUserType === "Publisher") {
      setMenu(menuPublisher);
    } else if (authData.data?.credentials.activeUserType === "Advertiser") {
      setMenu(menuAdvertiser);
    }
  };

  const success = () => {
    openNotificationWithIcon(
      "success",
      "",
      "Account has being switch successfully"
    );
    handleCancelModal();
    if (accountType === "Advertiser") {
      // Navigate to Advertiser
      navigate("/advertiser");
    } else if (accountType === "Publisher") {
      // Navigate to Publisher
      navigate("/publisher");
    }
  };

  const failure = () => {
    openNotificationWithIcon("error", "", "Error Switching Account");
  };

  // Show Notification
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
    background?: string
  ) => {
    api[type]({
      message,
      description,
      placement: "bottomRight",
      style: { background },
    });
  };
  return (
    <>
      {/* " The context is use to hold the notification from ant design" */}
      {contextHolder}
      <div className="w3-col">
        {menu.map((item: IMenuType, index: number) => (
          <div key={index}>
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className={
                  "w3-btn botton " +
                  (currentUrlPath === item.url ? "buttonSelected" : "")
                }
              >
                <span
                  className={
                    "buttonText " +
                    (currentUrlPath === item.url ? " buttonTextSelected " : "")
                  }
                >
                  {item.icon}
                  &nbsp;{item.title}
                </span>
              </button>
            ) : (
              <Link
                className={
                  "w3-btn botton " +
                  (currentUrlPath === item.url ? "buttonSelected" : "")
                }
                to={item.url}
              >
                <span
                  className={
                    "buttonText " +
                    (currentUrlPath === item.url ? " buttonTextSelected " : "")
                  }
                >
                  {item.icon}
                  &nbsp;{item.title}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>

      <Modal
        zIndex={appZIndex.modal}
        open={openModal}
        title={"Switch Account"}
        onCancel={handleCancelModal}
        width={700}
        footer={[
          <p style={{ minHeight: "200px" }}>
            &nbsp; <br />
            &nbsp; <br />
          </p>,
        ]}
      >
        <TopBarSwitchAccount
          accountType={accountType}
          onFormFailure={failure}
          onFormSuccess={success}
        ></TopBarSwitchAccount>
      </Modal>
    </>
  );
};

export default TopBarMenuOption;
