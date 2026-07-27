import "./../admin.css";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { useAppDispatch } from "../../../Redux/reduxCustomHook";
import { removeItem } from "../../../utils/localStorage";
import { USER_AUTH_DATA_KEY, USER_TOKEN_KEY } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AdminLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    doLogout();
  }, []);

  const doLogout = () => {
    removeItem(USER_TOKEN_KEY);
    removeItem(USER_AUTH_DATA_KEY);
    dispatch({ type: "AUTH_REMOVE_DATA" });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <Result
      status="404"
      icon={<SmileOutlined rev={undefined} />}
      title="Logout"
      subTitle="You are Logout"
    />
  );
};

export default AdminLogout;
