import { useState } from "react";
import { Modal } from "antd";
import { useAppSelector } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";
import { appZIndex } from "../../../utils/appconst";
import { AdminUserList } from "./adminUsersList";
import "./adminUsers.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreateUserForm from "./createUsersForm";

export const AdminUserListWrapper = () => {
  const [payLoadFilter, setpayLoadFilter] = useState<any>({
    skip: 0,
    limit: 10,
    search: "",
  });
  const [externalFilter, setExternalFilter] = useState<any>({
    skip: 0,
    limit: 10,
    search: "",
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  // Use to collect Change
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setpayLoadFilter((values) => {
      const nextFilter = { ...values, [name]: value };
      if (name === "search") {
        nextFilter.skip = 0;
      }
      return nextFilter;
    });
    if (name === "status") {
      setExternalFilter({ ...externalFilter, status: value, skip: 0 });
    }
  };

  const handleButtonClick = () => {
    setExternalFilter({ ...payLoadFilter, skip: 0 });
  };

  // Use to Update Filter
  const updateFilter = () => {
    setExternalFilter({ ...payLoadFilter, skip: 0 });
  };

  return (
    <>
      <div className="grid p-4">
        {/* Title */}
        <div className="grid grid-cols-2">
          <div className="flex" style={{ padding: "5px", paddingTop: "15px" }}>
            <h2 className="font-sans text-2xl font-semibold"> Users </h2>
          </div>

          <div className="flex items-center justify-end">
            {/* <button
              onClick={handleShowModal}
              className="h-14 py-2 px-5 font-sans bg-blue-800 text-white rounded-xl"
            >
              Create New <PlusCircleOutlined />
            </button> */}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-row mt-6 gap-2">
          <div className="basis-full">
            <div>
              <input
                name="search"
                value={payLoadFilter?.search || ""}
                onChange={handleInputChange}
                onBlur={updateFilter}
                className="h-12 w-full border rounded-xl p-2"
                placeholder="Search"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-2 gap-2">
          <div className="basis-3/12">
            <div>
              <input
                name="startDate"
                value={payLoadFilter?.startDate || ""}
                onChange={handleInputChange}
                onBlur={updateFilter}
                type={"date"}
                className="h-12 w-full border rounded-xl p-2"
                placeholder="Start Date"
              />
            </div>
          </div>

          <div className="basis-3/12">
            <div>
              <input
                name="endDate"
                value={payLoadFilter?.endDate || ""}
                onChange={handleInputChange}
                onBlur={updateFilter}
                type={"date"}
                className="h-12 w-full border rounded-xl p-2"
                placeholder="End Date"
              />
            </div>
          </div>

          <div className="basis-3/12">
            <div>
              <select
                name="status"
                value={payLoadFilter?.status || ""}
                onChange={handleInputChange}
                onBlur={updateFilter}
                className="h-12 w-full border rounded-xl p-2"
              >
                <option value=""> All Users </option>
                <option value="2"> Active Users </option>
                <option value="3"> Block Users </option>
                <option value="4"> Pending Set Up </option>
                <option value="5"> Completed Set Up </option>
                <option value="6"> Fraud Alert</option>
              </select>
            </div>
          </div>

          <div className="basis-3/12">
            <div>
              <button
                onClick={handleButtonClick}
                className="h-12 w-full border rounded-xl p-2 border-blue-800 text-blue-800"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Table/List/Grid */}
        <div className="grid mt-4">
          <AdminUserList externalFilter={externalFilter}></AdminUserList>
        </div>
      </div>

      {/* Modal */}
      <Modal
        zIndex={appZIndex.modal}
        open={showModal}
        title={"Add Admin"}
        onCancel={handleCancelModal}
        width={"700px"}
        footer={[<p style={{ minHeight: "00px" }}></p>]}
        style={{ top: "50px" }}
      >
        <div style={{ top: "50px", height: "400px", overflowY: "scroll" }}>
          <CreateUserForm></CreateUserForm>
        </div>
      </Modal>
    </>
  );
};

export default AdminUserListWrapper;
