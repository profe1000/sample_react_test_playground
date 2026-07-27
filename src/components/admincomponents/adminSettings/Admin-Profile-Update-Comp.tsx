import { LoadingOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin-settings-Comp.css";
import { sampleApiCall } from "../../../apiservice/sampleUsage/sample";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import useAuth from "../../../hooks/useAuth";
import { useAppSelector, useAppDispatch } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";
import { NotificationType } from "../../../utils/mscType.type";
import { IAdminAuthType } from "../../../apiservice/admin-AuthService.type";

const AdminProfileUpdateComp = () => {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [loadApi, setLoadApi] = useState(false);
  const [user, setUser] = useState<any>({});
  const [api, contextHolder] = notification.useNotification();
  const [loadAuth, setLoadAuth] = useState(true);

  const authAdminData: IAdminAuthType = useAppSelector(
    (state: RootState) => state?.AdminAuthData
  );

  // Use to refresh the Auth State
  const authState = useAuth(loadAuth, () => {
    setLoadAuth(false);
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Use to collect input changes
  const handleInputChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values: any) => ({ ...values, [name]: value }));
  };

  // Use to submit form
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoadApi(true);
    setFormLoading(true);
  };

  // A custom hook to format the API request
  const result = useFormatApiRequest(
    () => sampleApiCall(user),
    loadApi,
    () => {
      setLoadApi(false);
    },
    () => {
      processApi();
    }
  );

  // Process API response
  const processApi = async () => {
    if (result.httpState === "SUCCESS") {
      setFormLoading(false);
      openNotificationWithIcon(
        "info",
        "",
        "Profile Updated Successfully",
        "#D9FFB5"
      );
      setLoadAuth(true);
      // Handle success here
    } else if (result.httpState === "ERROR") {
      setFormLoading(false);
      // Handle error here
      openNotificationWithIcon(
        "info",
        "",
        result.data?.response?.data?.errors?.[0] ||
        result.data?.response?.data?.message ||
        result.errorMsg ||
        "Error",
        "#FFC2B7"
      );
    }
  };

  // Show notification
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
      {/* The context is used to hold the notification from ant design */}
      {contextHolder}

      {/* Main Design */}
      <div className="grid p-4">
        {/* <div className="mb-6">
          <p className="font-sans text-lg">Update Your Profile</p>
        </div> */}

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="relative w-full mb-6">
            <span>First Name</span>
            <input
              required
              name="firstName"
              value={
                user?.firstName || authAdminData?.data?.credentials?.firstName
              }
              onChange={handleInputChange}
              type="text"
              className="pl-4 pr-4 py-2 border rounded-lg w-full h-16 bg-stone-100"
              placeholder="First Name"
            />
          </div>

          {/* Last Name */}
          <div className="relative w-full mb-6">
            <span>Last Name</span>
            <input
              required
              name="lastName"
              value={
                user?.lastName || authAdminData?.data?.credentials?.lastName
              }
              onChange={handleInputChange}
              type="text"
              className="pl-4 pr-4 py-2 border rounded-lg w-full h-16 bg-stone-100"
              placeholder="Last Name"
            />
          </div>

          {/* Phone Number */}
          <div className="relative w-full mb-6">
            <span>Phone Number</span>
            <input
              required
              name="phoneNumber"
              value={
                user?.phoneNumber ||
                authAdminData?.data?.credentials?.phoneNumber
              }
              onChange={handleInputChange}
              type="tel"
              className="pl-4 pr-4 py-2 border rounded-lg w-full h-16 bg-stone-100"
              placeholder="Phone Number"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-2">
            <button className="w-full h-16 font-sans bg-blue-800 text-white rounded-xl text-lg">
              {!formLoading ? (
                "Update Profile"
              ) : (
                <LoadingOutlined rev={undefined} />
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminProfileUpdateComp;
