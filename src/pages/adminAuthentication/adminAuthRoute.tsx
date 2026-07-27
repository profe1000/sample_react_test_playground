import "../../App.css";
import { Routes, Route } from "react-router-dom";
import Nopage from "../Nopage/Nopage";
import AdminSignin from "./adminSignIn/adminSignin";

const AdminAuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<AdminSignin />} />
      <Route path="/signin" element={<AdminSignin />} />
      <Route path="*" element={<Nopage />} />
    </Routes>
  );
};

export default AdminAuthRoutes;
