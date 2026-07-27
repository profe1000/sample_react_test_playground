import { LoadingOutlined } from "@ant-design/icons";
import { message, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin-settings-Comp.css";
import { sampleApiCall } from "../../../apiservice/sampleUsage/sample";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import useAuth from "../../../hooks/useAuth";
import { useAppSelector, useAppDispatch } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";
import { NotificationType } from "../../../utils/mscType.type";
import { IAdminAuthType, ISettingsConfigData } from "../../../apiservice/admin-AuthService.type";
import { adminGetSettings, adminSaveSettings } from "../../../apiservice/admin-AuthService";

const AdminConfigUpdateComp = () => {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [loadApi, setLoadApi] = useState(false);
  const [payLoad, setPayLoad] = useState<any>({});
  const [api, contextHolder] = notification.useNotification();
  const [loadAuth, setLoadAuth] = useState(true);
  const [settingsConfig, setSettingsConfig] = useState<ISettingsConfigData | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);

  const authAdminData: IAdminAuthType = useAppSelector(
    (state: RootState) => state?.AdminAuthData
  );

  const authState = useAuth(loadAuth, () => {
    setLoadAuth(false);
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoadingSettings(true);
    try {
      const response = await adminGetSettings();
      setSettingsConfig(response?.data);
    } catch (error) {
      message.error("Error loading settings");
    } finally {
      setLoadingSettings(false);
    }
  };

  const handleInputChange = (event: any) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setPayLoad((values: any) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoadApi(true);
    setFormLoading(true);
  };

  const result = useFormatApiRequest(
    () => adminSaveSettings(payLoad),
    loadApi,
    () => {
      setLoadApi(false);
    },
    () => {
      processApi();
    }
  );

  const processApi = async () => {
    if (result.httpState === "SUCCESS") {
      setFormLoading(false);
      openNotificationWithIcon("info", "", "Settings Updated Successfully", "#D9FFB5");
      setLoadAuth(true);
    } else if (result.httpState === "ERROR") {
      setFormLoading(false);
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
      {contextHolder}
      <div className="grid p-4">
        <form onSubmit={handleSubmit}>
          {/* Maximum Daily Transfer Amount */}
          <div className="relative w-full mb-6">
            <span>Maximum Daily Transfer Out (3rd Party) Amount</span>
            <input
              required
              name="maximumDailyTransferOut3pAmount"
              value={payLoad?.maximumDailyTransferOut3pAmount || settingsConfig?.maximumDailyTransferOut3pAmount || ""}
              onChange={handleInputChange}
              type="number"
              className="pl-4 pr-4 py-2 border rounded-lg w-full h-16 bg-stone-100"
              placeholder="Enter amount"
            />
          </div>

          {/* Maximum Daily Transfer Frequency */}
          <div className="relative w-full mb-6">
            <span>Maximum Daily Transfer Out (3rd Party) Frequency</span>
            <input
              required
              name="maximumDailyTransferOut3pFrequency"
              value={payLoad?.maximumDailyTransferOut3pFrequency || settingsConfig?.maximumDailyTransferOut3pFrequency || ""}
              onChange={handleInputChange}
              type="number"
              className="pl-4 pr-4 py-2 border rounded-lg w-full h-16 bg-stone-100"
              placeholder="Enter frequency"
            />
          </div>

          {/* Auto Initiation Checkbox */}
          <div className="relative w-full mb-6 flex items-center">
            <input
              type="checkbox"
              name="tranferOut3pAutoInitiationEnabled"
              checked={payLoad?.tranferOut3pAutoInitiationEnabled ?? settingsConfig?.tranferOut3pAutoInitiationEnabled ?? false}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Enable Transfer Out (3rd Party) Auto Initiation</span>
          </div>

          {/* Submit Button */}
          <div className="mb-2">
            <button className="w-full h-16 font-sans bg-blue-800 text-white rounded-xl text-lg">
              {!formLoading ? (
                "Update Settings"
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

export default AdminConfigUpdateComp;
