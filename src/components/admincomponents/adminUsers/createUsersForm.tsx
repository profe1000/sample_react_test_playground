import { LoadingOutlined } from "@ant-design/icons";
import { ReactNode, useEffect, useState } from "react";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import "./adminUsers.css";
import { adminAddUsers, adminEditUsers, adminValidateBankAccount, getAdmins } from "../../../apiservice/admin-AuthService";
import { sampleApiCall } from "../../../apiservice/sampleUsage/sample";
import { appZIndex, nigeriaBank } from "../../../utils/appconst";
import { message, Modal, Spin } from "antd";
import { IAdminUserData } from "../../../apiservice/admin-pages-service.type";

export interface Bank {
  name: string;
  code: string;
  ussdTemplate: string | null;
  baseUssdCode: string | null;
  transferUssdTemplate: string | null;
  bankId?: any;
  nipBankCode?: string;
}

type ICreateUserForm = {
  onFormSuccess?: () => void;
  onFormFailure?: (err?: string) => void;
  editMode?: boolean;
};

export const CreateUserForm: React.FC<ICreateUserForm> = ({
  onFormFailure,
  onFormSuccess,
  editMode = false,
}) => {
  const [loadApi, setLoadApi] = useState(false);
  const [payLoad, setPayLoad] = useState<any>({});
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [admins, setAdmins] = useState<IAdminUserData[]>([]);
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [userFormData, setUserFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await sampleApiCall({});
        if (response) {
          setBanks(nigeriaBank);
        }
      } catch (error) {
        console.error("Error fetching banks", error);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await getAdmins({});
        if (response) {
          setAdmins(response?.data || []);
        }
      } catch (error) {
        console.error("Error fetching Admins", error);
      }
    };

    fetchBanks();
    fetchAdmins();
  }, []);

  const showAlert = (title: string, content: ReactNode) => {
    Modal.info({
      title,
      content,
      onOk() { },
      zIndex: appZIndex.modal,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPayLoad((values) => ({ ...values, [name]: value }));
  };

  const handleBankSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    setSelectedBank(index);
    if (banks[index]) {
      setPayLoad((prev) => ({
        ...prev,
        bankName: banks[index].name,
        bankCode: banks[index].code,
      }));
    }
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleVerifyAccount = async () => {
    if (selectedBank === null || accountNumber.length !== 10) {
      return;
    }

    setIsVerifying(true);
    try {
      const response = await adminValidateBankAccount({
        accountNumber,
        bankCode: banks[selectedBank].code,
      });
      if (response) {
        setAccountName(response.data?.accountName);
        setPayLoad((prev) => ({ ...prev, accountName: response.data?.accountName }));
        setIsVerified(true);
        showAlert("Success", "Account verified successfully");
      }
    } catch (error) {
      console.error("Error verifying account", error);
      showAlert("Error", "Error verifying account");
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank !== null) {
      handleVerifyAccount();
    }
  }, [accountNumber, selectedBank]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoadApi(true);
    setFormLoading(true);
    const formData = new FormData();

    Object.keys(payLoad).forEach((key) => {
      formData.append(key, payLoad[key]);
    });

    if (payLoad.file) {
      formData.append("file", payLoad.file);
    }

    setUserFormData(formData);
  };


  const result = useFormatApiRequest(
    () => (!editMode ? adminAddUsers(userFormData) : adminEditUsers(0, userFormData)),
    loadApi,
    () => setLoadApi(false),
    () => processFormApi()
  );

  const processFormApi = async () => {
    if (result.httpState === "SUCCESS") {
      setFormLoading(false);
      if (onFormSuccess) onFormSuccess();
    } else if (result.httpState === "ERROR") {
      setFormLoading(false);
      if (onFormFailure) onFormFailure(result.data?.response?.data?.message || result.errorMsg);
    }
  };

  return (
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

      {/* Email */}
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
          placeholder="Email"
        />
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

      {/* Date of Birth */}
      <div className="grid mt-4">
        <div>
          <span>
            Date of Birth <span className="w3-text-red">*</span>
          </span>
        </div>
        <input
          required
          name="dob"
          value={payLoad?.dob || ""}
          onChange={handleInputChange}
          type="date"
          className="h-12 w-full border rounded-xl p-2"
        />
      </div>

      {/* Bank Name */}
      <div className="grid mt-4">
        <div>
          <span>
            Bank Name <span className="w3-text-red">*</span>
          </span>
        </div>
        <select
          name="bankName"
          onChange={handleBankSelect}
          className="h-12 w-full border rounded-xl p-2"
          required
        >
          <option value="">Select a bank</option>
          {banks.map((bank, index) => (
            <option key={index} value={index}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      {/* Account Number */}
      <div className="grid mt-4">
        <div>
          <span>
            Account Number <span className="w3-text-red">*</span>
          </span>
        </div>
        <input
          required
          name="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          type="text"
          className="h-12 w-full border rounded-xl p-2"
          placeholder="Account Number"
        />
      </div>

      <div className="mb-4 flex items-center">
        {isVerifying && <Spin />}
      </div>
      {isVerified && (
        <div className="mb-4">
          <p className="text-gray-700">
            Account Name: <strong>{accountName}</strong>
          </p>
        </div>
      )}

      {/* File Upload */}
      <div className="grid mt-4">
        <div>
          <span>File Upload</span>
        </div>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="h-12 w-full border rounded-xl p-2"
        />
      </div>


      {/* Account Officer */}
      <div className="grid mt-4">
        <div>
          <span>
            Account Officer <span className="w3-text-red">*</span>
          </span>
        </div>
        <select
          name="adminId"
          onChange={handleBankSelect}
          className="h-12 w-full border rounded-xl p-2"
        >
          <option value="">Select an Admin </option>
          {admins.map((admin, index) => (
            <option key={index} value={index}>
              {admin?.fullName}
            </option>
          ))}
        </select>
      </div>


      <button
        type="submit"
        disabled={formLoading}
        className="mt-6 h-12 w-full bg-blue-600 text-white rounded-xl"
      >
        {formLoading ? <LoadingOutlined /> : "Save User"}
      </button>

    </form>
  );
};

export default CreateUserForm;
