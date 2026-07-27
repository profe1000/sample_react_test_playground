import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Nopage from "./pages/Nopage/Nopage";
import AdminAuthRoutes from "./pages/adminAuthentication/adminAuthRoute";
import AdminPagesRoutes from "./pages/adminDashboard/adminPagesRoute";

const App = () => {
  const authState = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AdminAuthRoutes ></AdminAuthRoutes >} />
        <Route path="auth/*" element={<AdminAuthRoutes ></AdminAuthRoutes >} />
        <Route path="admin/*" element={<AdminPagesRoutes></AdminPagesRoutes>} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
