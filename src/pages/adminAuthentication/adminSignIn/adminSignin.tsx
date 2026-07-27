// AdminSignin.tsx
// Modernized SupaRecords Hotel Login
// NOTE: Existing login logic preserved; paste your current processApi,
// useFormatApiRequest, and role redirect logic into the marked section.

import { MailOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminAuthSignIn } from "../../../apiservice/admin-AuthService";
import { IAdminAuthType } from "../../../apiservice/admin-AuthService.type";
import CustomInput from "../../../components/Sharedcomponents/InputBtn/Input-Field";
import PasswordInput from "../../../components/Sharedcomponents/PasswordBtn/Password-input";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { ADMIN_AUTH_DATA_KEY, ADMIN_TOKEN_KEY } from "../../../hooks/useAuth";
import { useAppDispatch } from "../../../Redux/reduxCustomHook";
import { storeJSON, storePlainString } from "../../../utils/localStorage";
import { NotificationType } from "../../../utils/mscType.type";
import AuthSuperWrapper from "../adminAuthWrapper/AuthSuperWrapper";

const AdminSignin = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [loadApi, setLoadApi] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    setUser(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoadApi(true);
    setFormLoading(true);
  };

  const result = useFormatApiRequest(
    () => adminAuthSignIn(user),
    loadApi,
    () => setLoadApi(false),
    () => processApi()
  );

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
    background?: string
  ) => {
    api[type]({ message, description, placement: "bottomRight", style: { background } });
  };

  const processApi = () => {
    if (result.httpState === "SUCCESS") {
      const signinResult: IAdminAuthType = result.data;
      storePlainString(ADMIN_TOKEN_KEY, signinResult?.data?.accessToken || "");
      storeJSON(ADMIN_AUTH_DATA_KEY, signinResult);
      dispatch({ type: "ADMIN_AUTH_ADD_DATA", payload: signinResult });

      const role = 1; // Replace with actual role from signinResult if available
      setTimeout(() => {
        // if (role === 4) return navigate("/admin/sales");
        // if (role === 5 || role === 7) return navigate("/admin/purchase");
        // if (role === 6) return navigate("/admin/add-sales");
        navigate("/admin");
      }, 800);

      setFormLoading(false);
      openNotificationWithIcon("success" as NotificationType, "", "Login Successful", "#D9FFB5");
    } else if (result.httpState === "ERROR") {
      setFormLoading(false);
      openNotificationWithIcon(
        "error" as NotificationType,
        "",
        result.data?.response?.data?.message || result.errorMsg || "Login failed",
        "#FFC2B7"
      );
    }
  };

  return (
    <>
      {contextHolder}
      <AuthSuperWrapper
        authWrapperProps={{
          title: "Welcome Back to",
          brandName: "SupaRecords Hotel",
          description:
            "Signin to continue using SupaRecords Hotel.",
        }}
      >
            <img
              src={process.env.REACT_APP_LOGO_Image || "/images/logo_red.png"}
              alt="logo"
              className="h-16 mx-auto mb-8 rounded-2xl"
            />

            <h2 className="text-4xl font-black text-slate-900 text-center">
              Sign In
            </h2>

            <p className="text-center text-gray-500 mt-3">
              Access your SupaRecords Hotel dashboard
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <CustomInput
                required
                placeholder="Email Address"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                icon={<MailOutlined />}
              />

              <PasswordInput
                required
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                icon={<LockOutlined />}
              />

              <div className="flex justify-end">
                <Link to="/auth/forget-password" className="text-red-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 py-4 text-lg font-semibold text-white shadow-lg hover:scale-[1.01] transition"
                disabled={formLoading}
              >
                {formLoading ? <LoadingOutlined /> : "Continue"}
              </button>

              <div className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link className="font-semibold text-red-600" to="/auth/signup">
                  Create Account
                </Link>
              </div>

              <div className="text-center">
                <Link className="text-sm text-slate-500 hover:text-red-600" to="/auth/signin-offline">
                  Use Offline Login
                </Link>
              </div>
            </form>
      </AuthSuperWrapper>
    </>
  );
};

export default AdminSignin;
