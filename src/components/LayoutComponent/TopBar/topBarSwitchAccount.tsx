import { LoadingOutlined } from "@ant-design/icons";
import { Input, Radio } from "antd";
import { useEffect, useState } from "react";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { useAppSelector } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";
import { appZIndex } from "../../../utils/appconst";
import "./topbar.css";
import { sampleApiCall } from "../../../apiservice/sampleUsage/sample";

type ITopBarSwitchAccount = {
  onFormSuccess?: () => void;
  onFormFailure?: (err?: string) => void;
  accountType?: "Advertiser" | "Publisher";
};

export const TopBarSwitchAccount: React.FC<ITopBarSwitchAccount> = ({
  onFormFailure,
  onFormSuccess,
  accountType = "Publisher",
}) => {
  const [loadApi, setLoadApi] = useState(false);
  const [payLoad, setpayLoad] = useState<any>({});
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const authData: any = useAppSelector(
    (state: RootState) => state?.AdminAuthData
  );

  // This is use to Update Redux Dispatch Values
  useEffect(() => {
    if (accountType === "Advertiser") {
      setpayLoad({
        isAgency:
          authData.data?.credentials.advertiserDetails?.isAgency || false,
        agencyName:
          authData.data?.credentials.advertiserDetails?.agencyName || "",
      });
    }

    if (accountType === "Publisher") {
      setpayLoad({
        agencyName:
          authData.data?.credentials.publisherDetails?.companyName || "",
      });
    }
  }, []);

  // Use to collect Input change Change
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setpayLoad((values) => ({ ...values, [name]: value }));
  };

  // Use to Submit Form
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoadApi(true);
    setFormLoading(true);
  };

  // A custom hook to Process Form
  const result = useFormatApiRequest(
    () =>
      sampleApiCall(payLoad),
    loadApi,
    () => {
      setLoadApi(false);
    },
    () => {
      processFormApi();
    }
  );

  // Process Api
  const processFormApi = async () => {
    if (result.httpState === "SUCCESS") {
      setFormLoading(false);
      if (onFormSuccess) {
        onFormSuccess();
      }
      // Handle Success Here
    } else if (result.httpState === "ERROR") {
      setFormLoading(false);
      if (onFormFailure) {
        onFormFailure(result.data?.response?.data?.message || result.errorMsg);
      }
      //Handle Error Here
    }
  };

  return (
    <>
      <div>
        {/* Account Form */}
        <form onSubmit={handleSubmit}>
          {/* Forms Here */}
          <div>
            <div className="w3-margin-bottom w3-col">
              Switch Account to Account {accountType}
            </div>

            {accountType === "Advertiser" && (
              <>
                <div className="w3-col w3-margin-bottom w3-margin-top">
                  <span className="inputTopName w3-left">
                    {" "}
                    Are you an Agency?{" "}
                  </span>
                  <span className="w3-left w3-padding-left">
                    <Radio.Group
                      name="isAgency"
                      value={payLoad?.isAgency || false}
                      onChange={handleInputChange}
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </span>
                </div>

                {/* Agency */}
                {payLoad?.isAgency && (
                  <div className="w3-col w3-margin-bottom w3-margin-top">
                    <span className="inputTopName">Agency Name (Optional)</span>
                    <Input
                      name="agencyName"
                      value={payLoad?.agencyName || ""}
                      onChange={handleInputChange}
                      className="w3-col inputField"
                      placeholder="Agency Name"
                    />
                  </div>
                )}
              </>
            )}

            {accountType === "Publisher" && (
              <>
                {/* Company Name */}
                <div className="w3-col w3-margin-bottom w3-margin-top">
                  <span className="inputTopName">Company Name (Optional)</span>
                  <Input
                    name="companyName"
                    value={payLoad?.companyName || ""}
                    onChange={handleInputChange}
                    className="w3-col inputField"
                    placeholder="Company Name"
                  />
                </div>
              </>
            )}
          </div>

          {/* Button Here */}
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <div className="w3-col w3-border-blue w3-padding  w3-round-xlarge">
              <button
                className="nextButton w3-btn w3-col"
                disabled={formLoading}
              >
                {!formLoading ? (
                  `Switch to ${accountType}`
                ) : (
                  <LoadingOutlined rev={undefined} />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TopBarSwitchAccount;
