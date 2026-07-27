import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Modal, Button } from "antd"; // Assuming Ant Design Modal is used
import "./admin-settings-Comp.css";
import { useAppSelector } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";
import { IAdminAuthType } from "../../../apiservice/admin-AuthService.type";
import { appZIndex } from "../../../utils/appconst";
import AdminProfileChangePasswordComp from "./Admin-Profile-Change-Password-Comp";
import AdminProfileUpdateComp from "./Admin-Profile-Update-Comp";
import AdminConfigUpdateComp from "./Admin-Config-Update-Comp";

export const AdminSettingsComp = () => {
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false);
  const [settingTitle, setSettingTitle] = useState("Settings");
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track which menu item is active

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    Modal.confirm({
      zIndex: appZIndex.modal,
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      onOk: () => {
        navigate("/admin/logout");
      },
    });
  };

  const openModalWithIndex = (index: number) => {
    setActiveIndex(index);
    setSettingTitle(menuItems[index].text)
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveIndex(null); // Reset the active index when modal is closed
  };

  const renderModalContent = () => {
    switch (activeIndex) {
      case 0:
        return <AdminProfileUpdateComp></AdminProfileUpdateComp> // Edit Profile Component
      case 1:
        return <AdminProfileChangePasswordComp></AdminProfileChangePasswordComp> // Change Password Component
      case 2:
        return <AdminConfigUpdateComp></AdminConfigUpdateComp> // Settings Page
      case 3:
        return <p>Help Center content goes here...</p>; // Help Center Component
      default:
        return null;
    }
  };



  const menuItems = [
    {
      icon: <UserOutlined />,
      text: "Edit Profile",
      action: () => openModalWithIndex(0),
    },
    {
      icon: <LockOutlined />,
      text: "Change Password",
      action: () => openModalWithIndex(1),
    },
    {
      icon: <ShoppingOutlined />,
      text: "Update Site Config",
      action: () => openModalWithIndex(2),
      path: "",
    },
    {
      icon: <ShoppingOutlined />,
      text: "More Settings",
      path: "",
    },
    {
      icon: <QuestionCircleOutlined />,
      text: "Help Center",
      action: () => openModalWithIndex(3),
    },
    {
      icon: <LogoutOutlined />,
      text: "Logout",
      action: handleLogout,
    },
  ];

  const authAdminData: IAdminAuthType = useAppSelector(
    (state: RootState) => state?.AdminAuthData
  );

  return (
    <div className="grid p-4">
      {/* Account Settings */}
      <h2 className="pt-2 pb-2 fontKanitRegular text-lg font-medium">
        {authAdminData?.data?.credentials?.email}
      </h2>
      <p className="pt-2 pb-8 fontAlbertSansRegular text-sm">
        {authAdminData?.data?.credentials?.fullName}
      </p>

      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center p-2 pt-4 text-gray-700 pb-4 border-t hover:bg-gray-100 cursor-pointer fontAlbertSansRegular`}
          onClick={() => {
            if (item.path) {
              handleNavigation(item.path);
            } else if (item.action) {
              item.action();
            }
          }}
        >
          <div className="text-xl">{item.icon}</div>
          <span className="pl-4 text-md font-medium">{item.text}</span>
        </div>
      ))}

      {/* Dynamic Modal */}
      <Modal
        zIndex={appZIndex.modal}
        title={settingTitle}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={<Button onClick={closeModal}>Close</Button>}
      >
        <div style={{ top: "50px", maxHeight: "350px", overflowY: "scroll" }}>{renderModalContent()}</div>
      </Modal>
    </div>
  );
};

export default AdminSettingsComp;
