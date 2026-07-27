import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { sampleApiCall } from "../../../apiservice/sampleUsage/sample";
import { adminAddDistrict, adminUpdateDistrict } from "../../../apiservice/admin-pages-service";
import { IAdminAuthType } from "../../../apiservice/admin-AuthService.type";
import { useAppSelector } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";

type ICreateDistrictForm = {
  onFormSuccess?: () => void;
  onFormFailure?: (err?: string) => void;
  isEditMode?: boolean;
  adminDistrictData?: any;
};

export const CreateDistrictForm: React.FC<ICreateDistrictForm> = ({
  onFormFailure,
  onFormSuccess,
  isEditMode = false,
  adminDistrictData,
}) => {

  const authAdminData: IAdminAuthType = useAppSelector(
    (state: RootState) => state?.AdminAuthData
  );

  const [loadApi, setLoadApi] = useState(false);
  const [payLoad, setpayLoad] = useState<any>(
    adminDistrictData || {} // Populate initial data if edit mode
  );
  const [payLoadForm, setPayLoadForm] = useState<FormData | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  useEffect(() => {
    setpayLoad({ ...adminDistrictData });
  }, [adminDistrictData]);

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setpayLoad((values) => ({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append("title", payLoad?.title || "");
    // setPayLoadForm(formData);
    setLoadApi(true);
    setFormLoading(true);
  };

  const result = useFormatApiRequest(
    () =>
      !isEditMode
        ? adminAddDistrict({ ...payLoad, adminId: authAdminData?.data?.id })
        : adminUpdateDistrict(adminDistrictData?.id || 0, { ...payLoad, adminId: authAdminData?.data?.id }),
    loadApi,
    () => {
      setLoadApi(false);
    },
    () => {
      processFormApi();
    }
  );

  const processFormApi = async () => {
    if (result.httpState === "SUCCESS") {
      setFormLoading(false);
      if (onFormSuccess) {
        onFormSuccess();
      }
      if (!isEditMode) {
        alert("Category Added");
      } else {
        alert("Category Updated");
      }
    } else if (result.httpState === "ERROR") {
      setFormLoading(false);
      if (onFormFailure) {
        onFormFailure(result.data?.response?.data?.message || result.errorMsg);
        alert(result.data?.response?.data?.message || result.errorMsg);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="grid mt-4">
          <div>
            <span>
              Title <span className="w3-text-red">*</span>
            </span>
          </div>
          <input
            required
            name="name"
            value={payLoad?.name || ""}
            onChange={handleInputChange}
            type="text"
            className="h-12 w-full border rounded-xl p-2"
            placeholder="Name of District"
            style={{ width: "100%", height: "50px" }}
          />
        </div>

        {/* Numbers of Allowed Members*/}
        <div className="grid mt-4">
          <div>
            <span>
              Numbers of Allowed Members* <span className="w3-text-red">*</span>
            </span>
          </div>
          <input
            required
            name="noOfAllowedRegisterMembers"
            value={payLoad?.noOfAllowedRegisterMembers || ""}
            onChange={handleInputChange}
            type="text"
            className="h-12 w-full border rounded-xl p-2"
            placeholder=" Numbers of Allowed Members"
            style={{ width: "100%", height: "50px" }}
          />
        </div>

        {/* Numbers of Allowed Cordinators*/}
        <div className="grid mt-4">
          <div>
            <span>
              Numbers of Allowed Co-ordinators* <span className="w3-text-red">*</span>
            </span>
          </div>
          <input
            required
            name="noOfAllowedRegisterCordinators"
            value={payLoad?.noOfAllowedRegisterCordinators || ""}
            onChange={handleInputChange}
            type="text"
            className="h-12 w-full border rounded-xl p-2"
            placeholder=" Numbers of Allowed Members"
            style={{ width: "100%", height: "50px" }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end mt-4">
          <button
            className="h-12 rounded bg-blue-800 text-white p-2 px-5"
            disabled={formLoading}
          >
            {!formLoading ? (
              isEditMode ? (
                "Update Category"
              ) : (
                "Save Category"
              )
            ) : (
              <LoadingOutlined rev={undefined} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDistrictForm;
