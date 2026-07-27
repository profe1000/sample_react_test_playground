"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Spin,
  Alert,
  Tag,
  Descriptions,
  Badge,
  Space,
  Divider,
} from "antd";
import {
  ReloadOutlined,
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import {
  convertToShortDate,
  convertToLongDate,
} from "../../../utils/date.utils";
import { getUser } from "../../../apiservice/admin-AuthService";
import type { IAppUserData } from "../../../apiservice/admin-pages-service.type";
import type { ILoadState } from "../../../utils/loading.utils.";

type IAdminUserDetailsCard = {
  userData?: IAppUserData | null;
  userId?: string | number | null;
};

const AdminUserDetailsCard: React.FC<IAdminUserDetailsCard> = ({
  userId,
  userData,
}) => {
  const [loadState, setLoadState] = useState<ILoadState>("notLoading");
  const [userDetails, setUserDetails] = useState(userData);

  const handleRefresh = async () => {
    setUserDetails(userData);
    setLoadState("loading");
    try {
      const updatedUserData = await getUser(userId || 0);
      setUserDetails(updatedUserData?.data);
      setLoadState("completed");
    } catch (error) {
      console.error("Error refreshing user details:", error);
      setLoadState("error");
    }
  };

  useEffect(() => {
    if (userId && !userData) {
      handleRefresh();
    } else if (userData) {
      setUserDetails(userData);
      setLoadState("completed");
    }
  }, [userId, userData]);

  const getInitials = (user: IAppUserData) => {
    const fullName = user?.fullName || `${user?.firstName} ${user?.lastName}`;
    return fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (blocked: boolean) => {
    return blocked ? "error" : "success";
  };

  const getStatusIcon = (blocked: boolean) => {
    return blocked ? <StopOutlined /> : <CheckCircleOutlined />;
  };

  const renderLoadingState = () => (
    <div className="flex justify-center items-center py-12">
      <div className="text-center">
        <Spin size="large" />
        <p className="mt-3 text-gray-500">Loading user details...</p>
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="text-center py-8">
      <Alert
        message="Error Loading User Details"
        description="We encountered an issue while loading user data. Please try again."
        type="error"
        showIcon
        className="mb-4"
      />
      <Button onClick={handleRefresh} type="primary" icon={<ReloadOutlined />}>
        Retry
      </Button>
    </div>
  );

  const renderNoDataState = () => (
    <div className="text-center py-8">
      <Alert
        message="User Not Found"
        description="The user you are looking for does not exist."
        type="warning"
        showIcon
        className="mb-4"
      />
      <Button onClick={handleRefresh} type="primary" icon={<ReloadOutlined />}>
        Reload Data
      </Button>
    </div>
  );

  const renderUserDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header with Avatar and Basic Info */}
      <div className="text-center">
        <div className="relative inline-block">
          <Avatar
            size={80}
            src={
              userDetails?.imageUrl ||
              `${process.env.PUBLIC_URL}/images/auth/profileSample.svg`
            }
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
          >
            {!userDetails?.imageUrl && getInitials(userDetails!)}
          </Avatar>
          <Badge
            status={userDetails?.blocked ? "error" : "success"}
            className="absolute bottom-0 right-0"
            title={userDetails?.blocked ? "Blocked" : "Active"}
          />
        </div>

        <h3 className="text-xl font-semibold mt-3 text-gray-900">
          {userDetails?.fullName ||
            `${userDetails?.firstName} ${userDetails?.lastName}`}
        </h3>

        <Tag
          color={getStatusColor(userDetails?.blocked || false)}
          icon={getStatusIcon(userDetails?.blocked || false)}
          className="mt-2"
        >
          {userDetails?.blocked ? "Blocked" : "Active"}
        </Tag>
      </div>

      <Divider />

      {/* Detailed Information */}
      <Descriptions
        column={1}
        size="small"
        className="bg-gray-50 p-4 rounded-lg"
      >
        <Descriptions.Item
          label={
            <Space>
              <MailOutlined className="text-blue-500" />
              Email
            </Space>
          }
        >
          <span className="font-medium">{userDetails?.email}</span>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <Space>
              <UserOutlined className="text-green-500" />
              Subscription Plan
            </Space>
          }
        >

          {userDetails?.hasActiveSubscription ? <Tag color="success">Paid Plan</Tag> : <Tag color="blue">Free Plan</Tag>}

        </Descriptions.Item>

        {userDetails?.hasActiveSubscription ?
          <Descriptions.Item
            label={
              <Space>
                <UserOutlined className="text-green-500" />
                Subscription Expires
              </Space>
            }
          >

            {convertToShortDate(userDetails?.subscription?.nextBillingDate || "")}

          </Descriptions.Item> : null}

        <Descriptions.Item
          label={
            <Space>
              <CalendarOutlined className="text-purple-500" />
              Joined Date
            </Space>
          }
        >
          <span className="font-medium">
            {convertToShortDate(userDetails?.dateCreated || "")}
          </span>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <Space>
              <ClockCircleOutlined className="text-orange-500" />
              Last Activity
            </Space>
          }
        >
          <span className="font-medium">
            {convertToLongDate(userDetails?.dateModified || "")}
          </span>
        </Descriptions.Item>
      </Descriptions>

      {/* Refresh Button */}
      <div className=" pt-4">
        <Button
          onClick={handleRefresh}
          icon={<ReloadOutlined />}
          loading={loadState === "loading"}
          type="primary"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Refresh Details
        </Button>
      </div>
    </motion.div>
  );

  return (
    <Card className="border-0" bodyStyle={{ padding: "24px" }}>
      {loadState === "loading" && userDetails && (
        <div className="text-center mb-4">
          <Tag color="blue" icon={<ReloadOutlined spin />}>
            Refreshing user details...
          </Tag>
        </div>
      )}

      {loadState === "loading" && !userDetails && renderLoadingState()}
      {loadState === "error" && !userDetails && renderErrorState()}
      {loadState === "noData" && !userDetails && renderNoDataState()}
      {userDetails && renderUserDetails()}
    </Card>
  );
};

export default AdminUserDetailsCard;
