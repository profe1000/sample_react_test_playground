import "../../App.css";
import { Routes, Route } from "react-router-dom";
import Nopage from "../Nopage/Nopage";
import AdminLayout from "./AdminLayout/AdminLayout";
import AdminHome from "./AdminHome/AdminHome";
import AdminLogout from "./AdminLogout/AdminLogout";
import AdminUsers from "./AdminUsers/AdminUsers";
import AdminsPage from "./AdminsPage/AdminsPage";
import AdminSettingsPage from "./AdminSettingsPage/AdminSettingsPage";
import { AdminUserDetailsPage } from "./AdminUsers/AdminUserDetails";
import AdminAudioBookCategoryPage, { AdminDistrictPage } from "./AdminDistrict/AdminDistrict";
import ScrollToTop from "../../utils/scrollToTop";
import HotelOperations from "./HotelOperations/HotelOperations";

const AdminPagesRoutes = () => {
  const scrollToTop = ScrollToTop();
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/users/:id" element={<AdminUserDetailsPage />} />
        <Route
          path="/district-manager"
          element={<AdminDistrictPage />}
        />
        <Route path="/admins" element={<AdminsPage />} />
        <Route path="/admins-settings" element={<AdminSettingsPage />} />
        <Route path="/room-types" element={<HotelOperations />} />
        <Route path="/rooms" element={<HotelOperations />} />
        <Route path="/room-reservations" element={<HotelOperations />} />
        <Route path="/room-maintenance" element={<HotelOperations />} />
        <Route path="/customers" element={<HotelOperations />} />
        <Route path="/customer-payment-transactions" element={<HotelOperations />} />
        <Route path="/inflow-transactions" element={<HotelOperations />} />
        <Route path="/transactions" element={<HotelOperations />} />
        <Route path="/logout" element={<AdminLogout />} />
        <Route path="*" element={<Nopage />} />
      </Route>
    </Routes>
  );
};

export default AdminPagesRoutes;
