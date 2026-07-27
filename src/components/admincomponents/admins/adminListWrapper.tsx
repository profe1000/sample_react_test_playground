import { useRef, useState } from "react";
import { Modal } from "antd";
import { useAppSelector } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";
import { appZIndex } from "../../../utils/appconst";
import "./admin.css";
import { AdminList } from "./adminList";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreateAdminForm from "./createAdminForm";

export const AdminListWrapper = () => {
  const [payLoadFilter, setpayLoadFilter] = useState<any>({});
  const [externalFilter, setExternalFilter] = useState<any>({});

  const [showModal, setShowModal] = useState<boolean>(false);

  const adminListRef = useRef<any>(null); // Create a ref to hold the reference to AdminList

  const handleReload = () => {
    if (adminListRef.current) {
      adminListRef.current.reload(); // Call the reload method exposed by AdminList
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancelModal = () => {
    setShowModal(false);
    handleReload();
  };

  // Use to collect Change
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log(value)
    setpayLoadFilter((values) => ({ ...values, [name]: value }));
    if (name === "status") {
      setExternalFilter({ ...externalFilter, status: value });
    }
  };

  const handleButtonClick = (value) => {
    setpayLoadFilter((values) => ({ ...values }));
  };

  // Use to Update Filter
  const updateFilter = () => {
    setExternalFilter({ ...payLoadFilter });
  };

  return (
    <>
      <div className="grid p-4">
        {/* Title */}
        <div className="grid grid-cols-2">
          <div className="flex" style={{ padding: "5px", paddingTop: "15px" }}>
            <h2 className="font-sans text-2xl font-semibold"> Admin </h2>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={handleShowModal}
              className="h-14 py-2 px-5 font-sans bg-blue-800 text-white rounded-xl"
            >
              Add Admin <PlusCircleOutlined />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-row mt-6 gap-2">
          <div className="basis-full">
            <div>
              <input
                name="searchstring"
                value={payLoadFilter?.searchstring || ""}
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
                <option value=""> All Admins </option>
                <option value="2"> Active Admins </option>
                <option value="3"> Block Admins </option>
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
          <AdminList
            ref={adminListRef}
            externalFilter={externalFilter}
          ></AdminList>
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
          <CreateAdminForm></CreateAdminForm>
        </div>
      </Modal>
    </>
  );
};

export default AdminListWrapper;
