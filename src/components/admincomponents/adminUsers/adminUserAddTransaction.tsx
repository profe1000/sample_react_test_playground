import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { adminAddTransactions } from "../../../apiservice/admin-pages-service";
import "./adminUsers.css";
import { IAppUserData } from "../../../apiservice/admin-pages-service.type";

type ICreateUsersTransactionForm = {
  onFormSuccess?: () => void;
  onFormFailure?: (err?: string) => void;
  userData?: IAppUserData | null;
};


export const CreateUsersTransactionForm: React.FC<
  ICreateUsersTransactionForm
> = ({ onFormFailure, onFormSuccess, userData }) => {
  const [loadApi, setLoadApi] = useState(false);
  const [payLoad, setPayLoad] = useState<any>({
    userId: userData?.id || 0, // Automatically set userId from props
  });
  const [formLoading, setFormLoading] = useState<boolean>(false);

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
    () => adminAddTransactions(payLoad),
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
      alert("Transaction Created");
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
        {/* Amount */}
        <div className="grid mt-4">
          <div>
            <span>
              Amount <span className="w3-text-red">*</span>
            </span>
          </div>
          <input
            required
            name="amount"
            value={payLoad?.amount || ""}
            onChange={handleInputChange}
            type="number"
            className="h-12 w-full border rounded-xl p-2"
            placeholder="Amount"
          />
        </div>

        {/* Description */}
        <div className="grid mt-4">
          <div>
            <span>
              Description <span className="w3-text-red">*</span>
            </span>
          </div>
          <input
            name="description"
            value={payLoad?.description || ""}
            onChange={handleInputChange}
            type="text"
            className="h-12 w-full border rounded-xl p-2"
            placeholder="Description"
          />
        </div>

        {/* Entry Type (Outgoing/Incoming) */}
        <div className="grid mt-4">
          <div>
            <span>
              Entry Type <span className="w3-text-red">*</span>
            </span>
          </div>
          <select
            required
            name="entryId"
            value={payLoad?.entryId || ""}
            onChange={handleInputChange}
            className="h-12 w-full border rounded-xl p-2"
          >
            <option value="">Select Entry Type</option>
            <option value="outgoing">Debit Transaction</option>
            <option value="incoming">Credit Transaction</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end mt-4">
          <button
            className="h-12 rounded bg-blue-800 text-white p-2 px-5"
            disabled={formLoading}
          >
            {!formLoading ? (
              "Post Transaction"
            ) : (
              <LoadingOutlined rev={undefined} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUsersTransactionForm;
