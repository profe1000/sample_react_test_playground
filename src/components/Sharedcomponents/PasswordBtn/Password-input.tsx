import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { ReactNode, useState } from "react";
import "./Password-input.css";

type IPasswordInput = {
  icon?: ReactNode;
  name?: string;
  testId?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  required?: boolean;
};

const PasswordInput: React.FC<IPasswordInput> = (props: IPasswordInput) => {
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <input
          required={props?.required}
          name={props?.name}
          value={props.value}
          onChange={props?.onChange}
          type={togglePassword ? " text" : "password"}
          className={
            "pr-10 py-2 border rounded-lg w-full  h-14 bg-white border-blue-800 " +
            (props.icon ? " pl-10" : " pl-4")
          }
          placeholder={props?.placeholder}
        />
        {props.icon && (
          <div
            className={
              "absolute inset-y-0 left-0 pl-3  flex items-center  pointer-events-none"
            }
          >
            {props.icon}
          </div>
        )}

        <div className={"absolute inset-y-0 right-0 pr-3  flex items-center"}>
          {togglePassword ? (
            <EyeOutlined
              onClick={() => {
                setTogglePassword(!togglePassword);
              }}
              className="passwordIcon"
              rev={undefined}
            />
          ) : (
            <EyeInvisibleOutlined
              onClick={() => {
                setTogglePassword(!togglePassword);
              }}
              className="passwordIcon"
              rev={undefined}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
