import React from "react";
import { useParams } from "react-router-dom";
import AdminUserDetailsCard from "../../../components/admincomponents/adminUsers/adminUserDetailsCard";
import "./../admin.css";

export const AdminUserDetailsPage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="p-2">
        <AdminUserDetailsCard userId={id} />
      </div>
    </>
  );
};

export default AdminUserDetailsPage;
