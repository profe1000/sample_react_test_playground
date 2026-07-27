import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Modal,
  notification,
  Pagination,
  Result,
  Spin,
} from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { useAppDispatch } from "../../../Redux/reduxCustomHook";
import { ILoadState } from "../../../utils/loading.utils.";
import { appZIndex } from "../../../utils/appconst";
import CreateDistrictForm from "./createDistrictForm";
import { sampleApiCall } from "../../../apiservice/sampleUsage/sample";
import { adminGetDistrict } from "../../../apiservice/admin-pages-service";

type NotificationType = "success" | "info" | "warning" | "error";

type IAdminDistrict = {
  externalFilter?: any;
  initialDefaultFilter?: any;
  hidePagination?: boolean;
};

export const AdminDistrict = forwardRef(
  (
    {
      externalFilter,
      initialDefaultFilter,
      hidePagination = false,
    }: IAdminDistrict,
    ref
  ) => {
    const [categoriesLoadState, setCategoriesLoadState] =
      useState<ILoadState>("loading");
    const [loadcategoriesData, setLoadCategoriesData] = useState(true);
    const [categoriesDefaultFilter, setCategoriesDefaultFilter] = useState(
      initialDefaultFilter || { page: 1, pageSize: 10 }
    );
    const [tableData, setTableData] = useState<any[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const [modalVisible, setModalVisible] = useState(false);
    const [editCategoryData, setEditCategoryData] = useState<any | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const pageSize = 10;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Expose a reload function using useImperativeHandle to make it accessible via ref
    useImperativeHandle(ref, () => ({
      reload: () => {
        setLoadCategoriesData(true);
        setCategoriesLoadState("loading");
      },
    }));

    useEffect(() => {
      if (externalFilter) {
        setCategoriesDefaultFilter({
          ...categoriesDefaultFilter,
          ...externalFilter,
        });
        setLoadCategoriesData(true);
        setCategoriesLoadState("loading");
      }
    }, [externalFilter]);

    const categoriesDataResult = useFormatApiRequest(
      () => adminGetDistrict(categoriesDefaultFilter),
      loadcategoriesData,
      () => {
        setLoadCategoriesData(false);
      },
      () => {
        processcategoriesResult();
      }
    );

    const processcategoriesResult = async () => {
      if (categoriesDataResult.httpState === "SUCCESS") {
        setTableData(categoriesDataResult.data?.data || []);
        setCategoriesLoadState("completed");
        setTotalItems(categoriesDataResult.data?.meta?.total || 1);
      } else if (categoriesDataResult.httpState === "ERROR") {
        setCategoriesLoadState("error");
      } else if (categoriesDataResult.httpState === "LOADING") {
        setCategoriesLoadState("loading");
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

    const onPageChange = (page: number, pageSize: number) => {
      setCurrentPage(page);
      setCategoriesDefaultFilter({
        ...categoriesDefaultFilter,
        page: page,
        pageSize: pageSize,
      });
      setLoadCategoriesData(true);
    };

    const editCategory = async (index: number) => {
      const category = tableData[index];
      setEditCategoryData(category);
      setModalVisible(true); // Open modal for editing
    };

    const deleteCategory = async (index: number) => {
      const category = tableData[index];
      Modal.confirm({
        title: `Are you sure you want to delete "${category.title}"?`,
        content: "This action cannot be undone.",
        okText: "Yes, Delete",
        okType: "danger",
        cancelText: "No, Cancel",
        zIndex: appZIndex.modal,
        onOk: async () => {
          try {
            await sampleApiCall(category.id); // Implement API deletion call
            openNotificationWithIcon(
              "success",
              "Deleted",
              `Category "${category.title}" has been deleted successfully.`
            );
            setLoadCategoriesData(true); // Reload the data
          } catch (error) {
            openNotificationWithIcon(
              "error",
              "Error",
              "Unable to delete the category."
            );
          }
        },
      });
    };

    const handleModalCancel = () => {
      setLoadCategoriesData(true);
      setModalVisible(false);
      setEditCategoryData(null);
    };

    return (
      <>
        {contextHolder}
        <div className="grid pt-4">
          {categoriesLoadState === "loading" && (
            <div className="mt-2 mb-2 flex justify-center items-center pt-20 pb-20">
              <Spin size="large" />
            </div>
          )}

          {categoriesLoadState === "error" && (
            <div className="mt-2 mb-2">
              <Result
                status="500"
                title={<span className="">Error</span>}
                subTitle={
                  <span className="">
                    Sorry, something went wrong, it could be a network-related
                    error.
                  </span>
                }
                extra={
                  <Button
                    onClick={() => setLoadCategoriesData(true)}
                    type="primary"
                  >
                    Reload
                  </Button>
                }
              />
            </div>
          )}

          {categoriesLoadState === "noData" && (
            <div className="mt-2">
              <Empty />
            </div>
          )}

          {categoriesLoadState === "completed" && (
            <div className="mt-2">
              <div>
                <div className="w3-col">
                  <div className="grid grid-cols-1 gap-4">
                    {tableData.map((item, index) => (
                      <div key={index}>
                        <div className="flex flex-row p-2 w-full bg-white border border-gray-200 rounded-xl">
                          <div className="grow p-2 flex flex-col items-start justify-center">
                            <h2 className="font-semibold font-sans text-md mb-2">
                              {item?.name} District
                            </h2>
                          </div>

                          <div className="basis-1/4 p-2 flex items-center justify-end">
                            <button
                              onClick={() => {
                                editCategory(index);
                              }}
                              className="font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 text-green bg-white border border-green hover:bg-green-100"
                            >
                              <EditOutlined />
                            </button>
                            <button
                              onClick={() => {
                                deleteCategory(index);
                              }}
                              className="font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 text-red-500  bg-white border border-red-500 hover:bg-red-300"
                            >
                              <DeleteOutlined />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {!hidePagination && (
                <div className="w3-col mt-2">
                  <Pagination
                    current={currentPage || 1}
                    onChange={onPageChange}
                    pageSize={pageSize}
                    total={totalItems}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal for Editing */}
        <Modal
          zIndex={appZIndex.modal}
          title="Edit District"
          visible={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <div style={{ top: "50px", maxHeight: "350px", overflowY: "scroll" }}>
            {editCategoryData && (
              <CreateDistrictForm
                isEditMode={true}
                adminDistrictData={editCategoryData}
                onFormSuccess={() => {
                  setModalVisible(false);
                  setLoadCategoriesData(true); // Reload the data after editing
                }}
              />
            )}
          </div>
        </Modal>
      </>
    );
  }
);
