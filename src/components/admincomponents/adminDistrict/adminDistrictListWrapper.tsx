import { useRef, useState } from "react";
import { Modal } from "antd";
import { appZIndex } from "../../../utils/appconst";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreateDistrictForm from "./createDistrictForm";
import { AdminDistrict } from "./adminDistrictList";
import "./adminDistrict.css";

export const AdminDistrictWrapper = () => {
  const [payLoadFilter, setpayLoadFilter] = useState<any>({});
  const [externalFilter, setExternalFilter] = useState<any>({});

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancelModal = () => {
    setShowModal(false);
    handleReload();
  };

  const categoryListRef = useRef<any>(null); // Create a ref to hold the reference to AdminList

  const handleReload = () => {
    if (categoryListRef.current) {
      categoryListRef.current.reload(); // Call the reload method exposed by AdminList
    }
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
            <h2 className="font-sans text-2xl font-semibold">
              {" "}
              District{" "}
            </h2>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={handleShowModal}
              className="bg-blue-800 text-white w3-btn w3-round-large"
            >
              Add New District <PlusCircleOutlined />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-row mt-6 gap-2">
          <div className="basis-10/12">
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

          <div className="basis-2/12">
            <div>
              <button className="h-12 w-full border rounded-xl p-2 border-green text-green">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Table/List/Grid */}
        <div className="grid mt-4">
          <AdminDistrict ref={categoryListRef}></AdminDistrict>
        </div>
      </div>

      {/* Modal */}
      <Modal
        zIndex={appZIndex.modal}
        open={showModal}
        title={"Add District"}
        onCancel={handleCancelModal}
        width={700}
        footer={[<p style={{ minHeight: "00px" }}></p>]}
      >
        <div style={{ maxHeight: "350px", overflow: "scroll" }}>
          <CreateDistrictForm></CreateDistrictForm>
        </div>
      </Modal>
    </>
  );
};

export default AdminDistrictWrapper;
