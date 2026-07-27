import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";
import { appZIndex } from "../../../utils/appconst";
import "./Sidebar.css";
import {
  ExclamationCircleFilled,
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  FolderOpenOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  CreditCardOutlined,
  TagsOutlined,
  UserOutlined,
  TeamOutlined,
  KeyOutlined,
  BarChartOutlined,
  SettingOutlined,
  WalletOutlined,
  LogoutOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import {
  IAdminAuthType,
  IAdminTypeData,
} from "../../../apiservice/admin-AuthService.type";

type ISideBarType = {
  onLinkChange?: () => void;
  onUserType?: string;
};

const Sidebar: React.FC<ISideBarType> = ({ onLinkChange }) => {
  const location = useLocation();
  const [currentUrlPath, setCurrentUrlPath] = useState("");
  const [menu, setMenu] = useState<IMenuType[]>([]);
  const { confirm } = Modal;

  const authData: IAdminAuthType = useAppSelector(
    (state: RootState) => state?.AdminAuthData
  );

  const navigate = useNavigate();

  type IMenuType = {
    icon: string | any;
    url: string;
    title: string;
    onClick?: () => void;
  };

  // Logout Confirmation
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
        navigate("/admin/logout");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const menuSuper: IMenuType[] = [
    {
      icon: <DashboardOutlined />,
      url: "/admin",
      title: "Dashboard",
    },
    {
      icon: <BarChartOutlined />,
      url: "/admin/transactions",
      title: "Transactions",
    },
    {
      icon: <CreditCardOutlined />,
      url: "/admin/billings",
      title: "Billings",
    },
    {
      icon: <DollarCircleOutlined />,
      url: "/admin/fees",
      title: "Fees",
    },
    {
      icon: <TeamOutlined />,
      url: "/admin/residents",
      title: "Residents",
    },
    {
      icon: <SettingOutlined />,
      url: "/admin/settings",
      title: "Settings",
    },
    {
      icon: <LogoutOutlined />,
      url: "/admin/logout",
      onClick() {
        showLogoutConfirm();
      },
      title: "Logout",
    },
  ];


  useEffect(() => {
    // execute on location change
    setCurrentUrlPath(location.pathname);
    if (onLinkChange) {
      onLinkChange();
    }
    updateMenuType();
  }, [location, authData]);

  const updateMenuType = () => {
    // console.log(authData?.data?.credentials?.userRoleTypeId);
    setMenu(menuSuper);
  };

  return (
    <>
      <div className="w3-col">
        {/* <div className="fixedHeaderSideBar w3-padding w3-border-bottom w3-hide-small w3-hide-medium w3-center w3-margin-bottom navbarcontainerwrapper bg-red-600">
          <Link to={"/"}>
            <span>
              <img
                style={{ width: "200px" }}
                src={`${process.env.PUBLIC_URL + "/images/logo_red_small.png"}`}
                alt=""
              />
            </span>
          </Link>
        </div>

        <div
          className="w3-col w3-hide-small w3-hide-medium"
          style={{ height: "80px" }}
        >
          <br />
        </div> */}

        <div className="mb-4 mt-4 p-4">
          <Link to={"/"}>
            <span>
              <img
                style={{ width: "200px" }}
                src="/images/logo.png"
                alt=""
                className="mx-auto block rounded-2xl"
              />
            </span>
          </Link>
        </div>

        <div className="w-full h-screen">
          {menu.map((item: IMenuType, index: number) => (
            <div key={index} className="mb-2">
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className={
                    "w-full flex items-center h-14 px-4 font-sans text-white rounded-lg hover:bg-brand-hover " +
                    (currentUrlPath === item.url ? "bg-brand" : "")
                  }
                >
                  <span
                    className={
                      "text-white flex items-center space-x-2 " +
                      (currentUrlPath === item.url ? "font-bold" : "")
                    }
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </span>
                </button>
              ) : (
                <Link
                  className={
                    "w-full flex items-center h-14 px-4 font-sans text-white rounded-lg hover:bg-brand-hover " +
                    (currentUrlPath === item.url ? "bg-brand" : "")
                  }
                  to={item.url}
                >
                  <span
                    className={
                      "text-white flex items-center space-x-2 " +
                      (currentUrlPath === item.url ? "font-bold" : "")
                    }
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
