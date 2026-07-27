import { ReactNode } from "react";
import "./Input-Field.css";

type ICustomInput = {
  icon?: ReactNode;
  type?: string;
  name?: string;
  testId?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  required?: boolean;
};

const CustomInput: React.FC<ICustomInput> = (props: ICustomInput) => {
  return (
    <>
      <div className="relative w-full">
        <input
          required={props.required}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          type={props.type || "text"}
          className={
            "pr-4 py-2 border rounded-lg w-full  h-14 bg-white border-blue-800 " +
            (props.icon ? " pl-10" : " pl-4")
          }
          placeholder={props.placeholder}
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
      </div>
    </>
  );
};

export default CustomInput;
