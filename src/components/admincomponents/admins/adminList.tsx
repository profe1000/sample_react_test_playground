import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import {
  Button,
  Empty,
  Modal,
  notification,
  Pagination,
  Result,
  Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { useAppDispatch } from "../../../Redux/reduxCustomHook";
import { getAdmins } from "../../../apiservice/admin-AuthService";
import { ILoadState } from "../../../utils/loading.utils.";
import { IAdminUserData } from "../../../apiservice/admin-pages-service.type";
import { appZIndex } from "../../../utils/appconst";
import { convertToShortDate } from "../../../utils/date.utils";
type NotificationType = "success" | "info" | "warning" | "error";

type IAdminListProps = {
  externalFilter?: any;
  initialDefaultFilter?: any;
  hidePagination?: boolean;
};

// The component is wrapped in forwardRef to allow passing references
export const AdminList = forwardRef(
  (
    {
      externalFilter,
      initialDefaultFilter,
      hidePagination = false,
    }: IAdminListProps,
    ref
  ) => {
    const [adminsLoadState, setAdminsLoadState] =
      useState<ILoadState>("loading");
    const [loadadminsData, setLoadAdminsData] = useState(true);
    const [adminsDefaultFilter, setAdminsDefaultFilter] = useState(
      initialDefaultFilter || { pageSize: 10, page: 1 }
    );
    const [tableData, setTableData] = useState<IAdminUserData[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [viewedUser, setViewedUser] = useState<IAdminUserData | null>(null);

    // Pagination Constant/Variables
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const perPage = 10;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Expose a reload function using useImperativeHandle to make it accessible via ref
    useImperativeHandle(ref, () => ({
      reload: () => {
        setLoadAdminsData(true);
        setAdminsLoadState("loading");
      },
    }));

    // Reload when external filters change
    useEffect(() => {
      if (externalFilter) {
        setAdminsDefaultFilter({
          ...adminsDefaultFilter,
          ...externalFilter,
        });
        setLoadAdminsData(true);
        setAdminsLoadState("loading");
      }
    }, [externalFilter]);

    // Custom hook to load admins data
    const adminsDataResult = useFormatApiRequest(
      () => getAdmins(adminsDefaultFilter),
      loadadminsData,
      () => setLoadAdminsData(false),
      () => processAdminsResult()
    );

    // Process the fetched admins data
    const processAdminsResult = async () => {
      if (adminsDataResult.httpState === "SUCCESS") {
        setTableData(adminsDataResult.data?.data || []);
        setAdminsLoadState("completed");
        setTotalItems(adminsDataResult.data?.meta?.total || 1);
      } else if (adminsDataResult.httpState === "ERROR") {
        setAdminsLoadState("error");
      } else if (adminsDataResult.httpState === "LOADING") {
        setAdminsLoadState("loading");
      }
    };

    // Notification handler
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

    // Handle pagination changes
    const onPageChange = (page: number, pageSize: number) => {
      setCurrentPage(page);
      setAdminsDefaultFilter({
        ...adminsDefaultFilter,
        page: page,
        perPage: pageSize,
      });
      setLoadAdminsData(true);
    };

    const toggleBlockUser = async (index: number) => {
      const user = tableData[index];
      const action = user.blocked ? "unblock" : "block";
      const confirmationText = user.blocked ? "unblocked" : "blocked";

      Modal.confirm({
        zIndex: appZIndex.modal,
        title: `Are you sure you want to ${action} ${user?.fullName}?`,
        okText: `Yes, ${action.charAt(0).toUpperCase() + action.slice(1)}`,
        okType: "danger",
        cancelText: "Cancel",
        onOk: () => {
          // You can call your toggle block user API here
          openNotificationWithIcon(
            "success",
            `User ${confirmationText}`,
            `${user?.fullName} has been ${confirmationText} successfully.`
          );
          user.blocked = !user.blocked; // Simulate toggle for now
          setTableData([...tableData]);
        },
      });
    };

    const viewAdmin = (index: number) => {
      const user = tableData[index];
      setViewedUser(user);
      setIsViewModalVisible(true);
    };

    const closeViewModal = () => {
      setIsViewModalVisible(false);
      setViewedUser(null);
    };

    const resetPassword = async () => {
      Modal.confirm({
        zIndex: appZIndex.modal,
        title: `Are you sure you want to reset password for ${viewedUser?.fullName}?`,
        okText: `Yes`,
        okType: "danger",
        cancelText: "Cancel",
        onOk: () => {
          // You can call your toggle block user API here
          openNotificationWithIcon(
            "success",
            `User Password Reset`,
            `${viewedUser?.fullName}'s password has been reset successfully.`
          );
        },
      });
    };

    return (
      <>
        {contextHolder}
        <div className="grid pt-4">
          {adminsLoadState === "loading" && (
            <div className="mt-2 mb-2 flex justify-center items-center pt-20 pb-20">
              <Spin size="large" />
            </div>
          )}
          {adminsLoadState === "error" && (
            <div className="mt-2 mb-2">
              <Result
                status="500"
                title={<span className="">Error</span>}
                subTitle={
                  <span className="">
                    Sorry, something went wrong, it could be a network related
                    error.
                  </span>
                }
                extra={
                  <Button
                    onClick={() => setLoadAdminsData(true)}
                    type="primary"
                  >
                    Reload
                  </Button>
                }
              />
            </div>
          )}
          {adminsLoadState === "noData" && <Empty />}
          {adminsLoadState === "completed" && (
            <div className="mt-2">
              <div className="w3-col">
                <div className="grid grid-cols-1 gap-4">
                  <div> Total Records :{totalItems}</div>
                  {tableData.map((admin, index) => (
                    <div
                      key={index}
                      className="flex flex-row p-2 w-full bg-white border border-gray-200 rounded-xl"
                    >
                      <p className="w-12 flex items-center justify-start">
                        <img
                          className="w3-circle"
                          style={{ width: "48px" }}
                          src={`${
                            process.env.PUBLIC_URL +
                            "/images/auth/profileSample.svg"
                          }`}
                          alt="Admin"
                        />
                      </p>
                      <div className="grow p-2 flex flex-col justify-start">
                        <p className="font-semibold font-sans text-md">
                          {admin?.firstName} {admin?.lastName}
                        </p>
                        <p>Email: {admin?.email}</p>
                        <p>Role: {admin?.adminRole?.title}</p>
                      </div>
                      <div className="basis-1/4 p-2 flex items-center justify-end">
                        <button
                          onClick={() => viewAdmin(index)}
                          className="font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 text-blue-800 bg-white border border-blue-800 hover:bg-blue-800-100"
                        >
                          <EyeOutlined />
                        </button>
                        <button
                          onClick={() => toggleBlockUser(index)}
                          className="font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 text-red-500 bg-white border border-red-500 hover:bg-red-300"
                        >
                          <DeleteOutlined />{" "}
                          {admin.blocked ? "Unblock" : "Block"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {!hidePagination && (
                <div className="w3-col mt-2">
                  <Pagination
                    current={currentPage || 1}
                    onChange={onPageChange}
                    pageSize={perPage}
                    total={totalItems}
                  />
                </div>
              )}
            </div>
          )}

          {/* View User Modal */}
          <Modal
            zIndex={appZIndex.modal}
            title="Admin Details"
            visible={isViewModalVisible}
            onCancel={closeViewModal}
            footer={[
              <Button key="reset" onClick={resetPassword}>
                Reset Password
              </Button>,
              <Button
                key="toggleBlock"
                onClick={() =>
                  toggleBlockUser(
                    tableData.findIndex((user) => user.id === viewedUser?.id)
                  )
                }
              >
                {viewedUser?.blocked ? "Unblock User" : "Block User"}
              </Button>,
              <Button key="close" onClick={closeViewModal}>
                Close
              </Button>,
            ]}
            width={"700px"}
            style={{ top: "50px" }}
          >
            <div
              style={{ top: "50px", maxHeight: "400px", overflowY: "scroll" }}
            >
              {viewedUser && (
                <>
                  <div className="text-center">
                    <img
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                      src={`${
                        process.env.PUBLIC_URL +
                        "/images/auth/profileSample.svg"
                      }`}
                      alt="Profile"
                    />
                  </div>
                  <p className="mt-4">
                    <strong>Full Name:</strong> {viewedUser.fullName}
                  </p>
                  <p className="mt-4">
                    <strong>Email:</strong> {viewedUser.email}
                  </p>
                  <p className="mt-4">
                    <strong>Status:</strong>{" "}
                    {viewedUser.blocked ? "Blocked" : "Active"}
                  </p>
                  <p className="mt-4">
                    <strong>Joined Date:</strong>{" "}
                    {convertToShortDate(viewedUser.dateCreated)}
                  </p>
                </>
              )}
            </div>
          </Modal>
        </div>
      </>
    );
  }
);
