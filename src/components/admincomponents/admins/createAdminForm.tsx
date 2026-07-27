import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import "./admin.css";
import {
  adminAddAdmin,
  adminEditAdmin,
  getAdminRoles,
} from "../../../apiservice/admin-AuthService";
import { IAdminRoleData } from "../../../apiservice/admin-pages-service.type";

type ICreateAdminForm = {
  onFormSuccess?: () => void;
  onFormFailure?: (err?: string) => void;
  editMode?: boolean;
};

export const CreateAdminForm: React.FC<ICreateAdminForm> = ({
  onFormFailure,
  onFormSuccess,
  editMode = false,
}) => {
  const [loadApi, setLoadApi] = useState(false);
  const [payLoad, setPayLoad] = useState<any>({ adminRoleId: 1 });
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const [roles, setRoles] = useState<IAdminRoleData[]>([]);
  const [rolesLoading, setRolesLoading] = useState<boolean>(true);
  const [rolesError, setRolesError] = useState<string | null>(null);

  // Fetch Admin Roles
  useEffect(() => {
    const fetchRoles = async () => {
      setRolesLoading(true);
      try {
        const response = await getAdminRoles({}); // Adjust the API URL as needed
        setRoles(response.data);
        setRolesError(null);
      } catch (error) {
        setRolesError("Failed to load roles. Please try again.");
      } finally {
        setRolesLoading(false);
      }
    };
    fetchRoles();
  }, []);

  // Collect input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPayLoad((values) => ({ ...values, [name]: value }));
  };

  // Submit form
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoadApi(true);
    setFormLoading(true);
  };

  // Process form with custom hook
  const result = useFormatApiRequest(
    () => (!editMode ? adminAddAdmin(payLoad) : adminEditAdmin(0, payLoad)),
    loadApi,
    () => {
      setLoadApi(false);
    },
    () => {
      processFormApi();
    }
  );

  // Process API response
  const processFormApi = async () => {
    if (result.httpState === "SUCCESS") {
      setFormLoading(false);
      if (onFormSuccess) {
        onFormSuccess();
      }
      alert("Admin Added");
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
        {/* First Name */}
        <div className="grid mt-4">
          <div>
            <span>
              First Name <span className="w3-text-red">*</span>
            </span>
          </div>
          <input
            required
            name="firstName"
            value={payLoad?.firstName || ""}
            onChange={handleInputChange}
            type="text"
            className="h-12 w-full border rounded-xl p-2"
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div className="grid mt-4">
          <div>
            <span>
              Last Name <span className="w3-text-red">*</span>
            </span>
          </div>
          <input
            required
            name="lastName"
            value={payLoad?.lastName || ""}
            onChange={handleInputChange}
            type="text"
            className="h-12 w-full border rounded-xl p-2"
            placeholder="Last Name"
          />
        </div>

        {/* Email Address */}
        <div className="grid mt-4">
          <div>
            <span>
              Email <span className="w3-text-red">*</span>
            </span>
          </div>
          <input
            required
            name="email"
            value={payLoad?.email || ""}
            onChange={handleInputChange}
            type="email"
            className="h-12 w-full border rounded-xl p-2"
            placeholder="Email Address"
          />
        </div>

        {/* Phone Number */}
        <div className="grid mt-4">
          <div>
            <span>
              Phone Number <span className="w3-text-red">*</span>
            </span>
          </div>
          <input
            required
            name="phoneNumber"
            value={payLoad?.phoneNumber || ""}
            onChange={handleInputChange}
            type="tel"
            className="h-12 w-full border rounded-xl p-2"
            placeholder="Phone Number"
          />
        </div>

        {/* Admin Role (as ID) */}
        <div className="grid mt-4">
          <div>
            <span>
              Admin Role <span className="w3-text-red">*</span>
            </span>
          </div>
          {rolesLoading ? (
            <div>Loading roles...</div>
          ) : rolesError ? (
            <div className="text-red-600">{rolesError}</div>
          ) : (
            <select
              required
              name="adminRoleId"
              value={payLoad?.adminRoleId || ""}
              onChange={handleInputChange}
              className="h-12 w-full border rounded-xl p-2"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role?.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Password */}
        <div className="grid mt-4">
          <div>
            <span>Password</span>
          </div>
          <input
            name="password"
            value={payLoad?.password || ""}
            onChange={handleInputChange}
            type="password"
            className="h-12 w-full border rounded-xl p-2"
            placeholder="Password (Optional)"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end mt-4">
          <button
            className="h-12 rounded bg-blue-800 text-white p-2 px-5"
            disabled={formLoading}
          >
            {!formLoading ? "Save Admin" : <LoadingOutlined rev={undefined} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdminForm;
