import { LoadingOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin-settings-Comp.css";
import { sampleApiCall } from "../../../apiservice/sampleUsage/sample";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { useAppDispatch } from "../../../Redux/reduxCustomHook";
import { NotificationType } from "../../../utils/mscType.type";

const AdminProfileChangePasswordComp = () => {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [loadApi, setLoadApi] = useState(false);
  const [user, setUser] = useState<any>({});
  const [api, contextHolder] = notification.useNotification();

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
        "Password Changed Successfully",
        "#D9FFB5"
      );
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
        <div className="mb-6">
          <p className="font-sans text-lg">Change Your Password</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Old Password */}
          <div className="relative w-full mb-6">
            <span>Old Password</span>
            <input
              required
              name="oldPassword"
              value={user?.oldPassword}
              onChange={handleInputChange}
              type="password"
              className="pl-4 pr-4 py-2 border rounded-lg w-full h-16 bg-stone-100"
              placeholder="Old Password"
            />
          </div>

          {/* New Password */}
          <div className="relative w-full mb-6">
            <span>New Password</span>
            <input
              required
              name="newPassword"
              value={user?.newPassword}
              onChange={handleInputChange}
              type="password"
              className="pl-4 pr-4 py-2 border rounded-lg w-full h-16 bg-stone-100"
              placeholder="New Password"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative w-full mb-6">
            <span>Confirm Password</span>
            <input
              required
              name="confirmPassword"
              value={user?.confirmPassword}
              onChange={handleInputChange}
              type="password"
              className="pl-4 pr-4 py-2 border rounded-lg w-full h-16 bg-stone-100"
              placeholder="Confirm Password"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-2">
            <button className="w-full h-16 font-sans bg-blue-800 text-white rounded-xl text-lg">
              {!formLoading ? (
                "Changed Password"
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

export default AdminProfileChangePasswordComp;
