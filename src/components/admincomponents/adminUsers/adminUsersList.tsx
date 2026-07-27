"use client";

import type React from "react";

import {
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ReloadOutlined,
  SearchOutlined,
  FilterOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Button,
  Empty,
  Modal,
  notification,
  Pagination,
  Result,
  Spin,
  Card,
  Avatar,
  Tag,
  Space,
  Input,
  Select,
  Row,
  Col,
  Badge,
  Tooltip,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { useAppDispatch } from "../../../Redux/reduxCustomHook";
import type { ILoadState } from "../../../utils/loading.utils.";
import "./adminUsers.css";
import {
  checkInMember,
  checkOutMember,
  getUsers,
} from "../../../apiservice/admin-AuthService";
import { adminGetDistrict } from "../../../apiservice/admin-pages-service";
import type { IAppUserData } from "../../../apiservice/admin-pages-service.type";
import { appZIndex } from "../../../utils/appconst";
import { convertToShortDate } from "../../../utils/date.utils";
import AdminUserDetailsCard from "./adminUserDetailsCard";

type NotificationType = "success" | "info" | "warning" | "error";

type IAdminUserList = {
  externalFilter?: any;
  initialDefaultFilter?: any;
  hidePagination?: boolean;
};

type DistrictOption = {
  id: number;
  name: string;
};

export const AdminUserList: React.FC<IAdminUserList> = ({
  externalFilter,
  initialDefaultFilter,
  hidePagination = false,
}) => {
  const [usersLoadState, setUsersLoadState] = useState<ILoadState>("loading");
  const [loadusersData, setLoadUsersData] = useState(true);
  const [usersDefaultFilter, setUsersDefaultFilter] = useState(
    initialDefaultFilter || { skip: 0, limit: 10, search: "" }
  );
  const [tableData, setTableData] = useState<IAppUserData[]>([]);
  const [filteredData, setFilteredData] = useState<IAppUserData[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [viewedUser, setViewedUser] = useState<IAppUserData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [districtFilter, setDistrictFilter] = useState<string>("all");
  const [districts, setDistricts] = useState<DistrictOption[]>([]);
  const [memberAction, setMemberAction] = useState<Record<number, "check-in" | "check-out">>({});

  // Pagination Constant/Variables
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(
    initialDefaultFilter?.limit || 10
  );

  // For Navigator/Redux
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (externalFilter) {
      setUsersDefaultFilter((current) => ({
        ...current,
        ...externalFilter,
      }));
      const nextLimit = Number(externalFilter?.limit || perPage || 10);
      const nextSkip = Number(externalFilter?.skip || 0);
      setPerPage(nextLimit);
      setCurrentPage(Math.floor(nextSkip / nextLimit) + 1);
      setLoadUsersData(true);
      setUsersLoadState("loading");
    }
  }, [externalFilter]);

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        const response = await adminGetDistrict({ pageSize: 1000, page: 1 });
        setDistricts(response?.data ?? []);
      } catch {
        openNotificationWithIcon(
          "warning",
          "Districts unavailable",
          "The district filter could not be loaded."
        );
      }
    };

    loadDistricts();
  }, []);

  // Filter data based on search and status
  useEffect(() => {
    let filtered = tableData;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => {
        if (statusFilter === "active") return !user.blocked;
        if (statusFilter === "blocked") return user.blocked;
        return true;
      });
    }

    if (districtFilter !== "all") {
      filtered = filtered.filter(
        (user) => String(user.districtId) === districtFilter
      );
    }

    setFilteredData(filtered);
  }, [tableData, searchTerm, statusFilter, districtFilter]);

  const usersDataResult = useFormatApiRequest(
    () => getUsers(usersDefaultFilter),
    loadusersData,
    () => {
      setLoadUsersData(false);
    },
    () => {
      processusersResult();
    }
  );

  const processusersResult = async () => {
    if (usersDataResult.httpState === "SUCCESS") {
      setTableData(usersDataResult.data?.data || []);
      setUsersLoadState("completed");
      setTotalItems(usersDataResult.data?.meta?.total || 1);
    } else if (usersDataResult.httpState === "ERROR") {
      setUsersLoadState("error");
    } else if (usersDataResult.httpState === "LOADING") {
      setUsersLoadState("loading");
    }
  };

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

  const onPageChange = (page: number, pageSize: number) => {
    const nextSkip = (page - 1) * pageSize;
    setCurrentPage(page);
    setPerPage(pageSize);
    setUsersDefaultFilter({
      ...usersDefaultFilter,
      skip: nextSkip,
      limit: pageSize,
    });
    setLoadUsersData(true);
  };

  const handleDistrictFilterChange = (value: string) => {
    setDistrictFilter(value);
    setCurrentPage(1);
    setUsersDefaultFilter((current) => {
      const { districtId, ...filters } = current;
      return value === "all"
        ? { ...filters, skip: 0 }
        : { ...filters, skip: 0, districtId: value };
    });
    setLoadUsersData(true);
  };

  const toggleBlockUser = async (user: IAppUserData) => {
    const action = user.blocked ? "unblock" : "block";
    const confirmationText = user.blocked ? "unblocked" : "blocked";

    Modal.confirm({
      zIndex: appZIndex.modal,
      title: `Are you sure you want to ${action} ${user?.fullName}?`,
      okText: `Yes, ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        openNotificationWithIcon(
          "success",
          `User ${confirmationText}`,
          `${user?.fullName} has been ${confirmationText} successfully.`
        );
        user.blocked = !user.blocked;
        setTableData([...tableData]);
      },
    });
  };

  const viewUser = (user: IAppUserData) => {
    setViewedUser(user);
    setIsViewModalVisible(true);
  };

  const closeViewModal = () => {
    setIsViewModalVisible(false);
    setViewedUser(null);
  };

  const getDistrictName = (districtId: number) =>
    districts.find((district) => district.id === districtId)?.name ||
    `District ${districtId}`;

  const updateMemberAttendance = async (
    user: IAppUserData,
    action: "check-in" | "check-out"
  ) => {
    setMemberAction((current) => ({ ...current, [user.id]: action }));

    try {
      if (action === "check-in") {
        await checkInMember(user.id);
      } else {
        await checkOutMember(user.id);
      }

      openNotificationWithIcon(
        "success",
        `Member checked ${action === "check-in" ? "in" : "out"}`,
        `${user.fullName || `${user.firstName} ${user.lastName}`} has been checked ${
          action === "check-in" ? "in" : "out"
        } successfully.`
      );
      setLoadUsersData(true);
    } catch (error: any) {
      openNotificationWithIcon(
        "error",
        `Check ${action === "check-in" ? "in" : "out"} failed`,
        error?.response?.data?.detail || "Please try again."
      );
    } finally {
      setMemberAction((current) => {
        const updated = { ...current };
        delete updated[user.id];
        return updated;
      });
    }
  };

  const openDetails = (id: string | number) => {
    navigate(`/admin/users/${id}`);
  };

  const resetPassword = async () => {
    Modal.confirm({
      zIndex: appZIndex.modal,
      title: `Are you sure you want to reset password for ${viewedUser?.fullName}?`,
      okText: `Yes`,
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        openNotificationWithIcon(
          "success",
          `User Password Reset`,
          `${viewedUser?.fullName}'s password has been reset successfully.`
        );
      },
    });
  };

  const getInitials = (user: IAppUserData) => {
    const fullName = user?.fullName || `${user?.firstName} ${user?.lastName}`;
    return fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const columns: ColumnsType<IAppUserData> = [
    {
      title: "User",
      key: "user",
      render: (_, user) => (
        <div className="flex items-center space-x-3">
          <Avatar
            size={40}
            src={
              user.imageUrl ||
              `${process.env.PUBLIC_URL}/images/auth/profileSample.svg`
            }
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
          >
            {!user.imageUrl && getInitials(user)}
          </Avatar>
          <div>
            <div className="font-semibold text-gray-900">
              {user?.fullName || `${user?.firstName} ${user?.lastName}`}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Check-In Status",
      key: "checkInStatus",
      render: (_, user) => {
        const hasCheckedIn = Boolean(user?.dateCheckIn);
        const hasCheckedOut = Boolean(user?.dateCheckOut);

        if (hasCheckedOut) {
          return <Tag color="default">Checked Out</Tag>;
        }

        if (hasCheckedIn) {
          return <Tag color="success">Checked In</Tag>;
        }

        return <Tag color="warning">Pending Check-In</Tag>;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (_, user) => (
        <Tag color={user.blocked ? "error" : "success"}>
          {user.blocked ? "Blocked" : "Active"}
        </Tag>
      ),
    },
    {
      title: "District",
      dataIndex: "districtId",
      key: "districtId",
      render: (districtId) => getDistrictName(districtId),
    },
    {
      title: "Joined",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (date) => convertToShortDate(date),
    },
    {
      title: "Last Login",
      dataIndex: "dateModified",
      key: "dateModified",
      render: (date) => convertToShortDate(date),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <Space>
          <Tooltip title={user.dateCheckIn ? "Already checked in" : "Check In"}>
            <Button
              type="text"
              icon={<LoginOutlined />}
              onClick={() => updateMemberAttendance(user, "check-in")}
              loading={memberAction[user.id] === "check-in"}
              disabled={!!user.dateCheckIn || !!memberAction[user.id]}
              className="text-emerald-600 hover:text-emerald-800"
            />
          </Tooltip>
          <Tooltip
            title={
              user.dateCheckOut
                ? "Already checked out"
                : !user.dateCheckIn
                  ? "Check in before checking out"
                  : "Check Out"
            }
          >
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={() => updateMemberAttendance(user, "check-out")}
              loading={memberAction[user.id] === "check-out"}
              disabled={!user.dateCheckIn || !!user.dateCheckOut || !!memberAction[user.id]}
              className="text-amber-600 hover:text-amber-800"
            />
          </Tooltip>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => viewUser(user)}
              className="text-blue-600 hover:text-blue-800"
            />
          </Tooltip>
          <Tooltip title={user.blocked ? "Unblock User" : "Block User"}>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => toggleBlockUser(user)}
              className="text-red-600 hover:text-red-800"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const renderMobileCard = (user: IAppUserData, index: number) => (
    <motion.div
      key={user.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar
              size={48}
              src={
                user.imageUrl ||
                `${process.env.PUBLIC_URL}/images/auth/profileSample.svg`
              }
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
            >
              {!user.imageUrl && getInitials(user)}
            </Avatar>
            <Badge
              status={user.blocked ? "error" : "success"}
              className="absolute -bottom-1 -right-1"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">
              {user?.fullName || `${user?.firstName} ${user?.lastName}`}
            </h4>
            <div className="space-y-1 mt-2">
              <div className="flex items-center text-sm text-gray-600">
                <MailOutlined className="mr-2" />
                <span className="truncate">{user.email}</span>
              </div>
              {user.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneOutlined className="mr-2" />
                  <span>{user.email}</span>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <CalendarOutlined className="mr-2" />
                <span>Joined {convertToShortDate(user.dateCreated)}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <CalendarOutlined className="mr-2" />
                <span> Last Login {convertToShortDate(user.dateModified)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <Tag color={user.blocked ? "error" : "success"}>
                {user.blocked ? "Blocked" : "Active"}
              </Tag>
              <Space>
                <Tooltip title="Check In">
                  <Button
                    type="text"
                    icon={<LoginOutlined />}
                    onClick={() => updateMemberAttendance(user, "check-in")}
                    loading={memberAction[user.id] === "check-in"}
                    disabled={!!user.dateCheckIn || !!memberAction[user.id]}
                    className="text-emerald-600"
                  />
                </Tooltip>
                <Tooltip title="Check Out">
                  <Button
                    type="text"
                    icon={<LogoutOutlined />}
                    onClick={() => updateMemberAttendance(user, "check-out")}
                    loading={memberAction[user.id] === "check-out"}
                    disabled={!user.dateCheckIn || !!user.dateCheckOut || !!memberAction[user.id]}
                    className="text-amber-600"
                  />
                </Tooltip>
                <Button
                  type="text"
                  icon={<EyeOutlined />}
                  onClick={() => viewUser(user)}
                  className="text-blue-600"
                />
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => toggleBlockUser(user)}
                  className="text-red-600"
                />
              </Space>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {contextHolder}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <UserOutlined className="text-blue-600" />
              User Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and monitor user accounts
            </p>
          </div>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => setLoadUsersData(true)}
            loading={usersLoadState === "loading"}
          >
            Refresh
          </Button>
        </div>
      </div>

      <Card className="mb-6 shadow-sm">
        <Row gutter={[12, 12]}>
          <Col xs={24} md={12}>
            <Input
              allowClear
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder="Search members"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Col>
          <Col xs={24} md={12}>
            <Select
              className="w-full"
              value={districtFilter}
              onChange={handleDistrictFilterChange}
              suffixIcon={<FilterOutlined />}
              options={[
                { value: "all", label: "All districts" },
                ...districts.map((district) => ({
                  value: String(district.id),
                  label: district.name,
                })),
              ]}
            />
          </Col>
        </Row>
      </Card>

      {/* Content */}
      <AnimatePresence mode="wait">
        {usersLoadState === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-20"
          >
            <div className="text-center">
              <Spin size="large" />
              <p className="mt-4 text-gray-600">Loading users...</p>
            </div>
          </motion.div>
        )}

        {usersLoadState === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Result
              status="500"
              title="Error Loading Users"
              subTitle="Sorry, something went wrong while loading user data."
              extra={
                <Button onClick={() => setLoadUsersData(true)} type="primary">
                  Reload
                </Button>
              }
            />
          </motion.div>
        )}

        {usersLoadState === "completed" && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredData.length === 0 ? (
              <Card className="text-center py-12">
                <Empty
                  description={
                    searchTerm || statusFilter !== "all" || districtFilter !== "all"
                      ? "No users match your search criteria"
                      : "No users found"
                  }
                />
              </Card>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <Card className="shadow-sm">
                    <Table
                      columns={columns}
                      dataSource={filteredData}
                      rowKey="id"
                      pagination={false}
                      className="custom-table"
                    />
                  </Card>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden">
                  {filteredData.map((user, index) =>
                    renderMobileCard(user, index)
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {!hidePagination &&
        usersLoadState === "completed" &&
        filteredData.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              current={currentPage || 1}
              onChange={onPageChange}
              pageSize={perPage}
              total={totalItems}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} users`
              }
            />
          </div>
        )}

      {/* View User Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <UserOutlined className="text-blue-600" />
            <span>User Details</span>
          </div>
        }
        open={isViewModalVisible}
        onCancel={closeViewModal}
        zIndex={appZIndex.modal}
        width={700}
        footer={[
          <Button key="reset" onClick={resetPassword}>
            Reset Password
          </Button>,
          <Button
            key="toggleBlock"
            onClick={() => viewedUser && toggleBlockUser(viewedUser)}
            type={viewedUser?.blocked ? "default" : "primary"}
            danger={!viewedUser?.blocked}
          >
            {viewedUser?.blocked ? "Unblock User" : "Block User"}
          </Button>,
          <Button
            key="details"
            onClick={() => viewedUser && openDetails(viewedUser.id)}
          >
            Full Details
          </Button>,
          <Button key="close" onClick={closeViewModal}>
            Close
          </Button>,
        ]}
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        {viewedUser && (
          <AdminUserDetailsCard userData={viewedUser} userId={viewedUser?.id} />
        )}
      </Modal>
    </div>
  );
};

export default AdminUserList;
