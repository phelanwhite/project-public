import { FC, InputHTMLAttributes, memo } from "react";
interface Prop {
  lable?: string;
}
const InputField: FC<InputHTMLAttributes<HTMLInputElement> & Prop> = ({
  lable,
  name,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="">
        {lable}
      </label>
      <input
        className="w-full px-4 py-2 rounded-md border outline-none hover:border-blue-500 focus:ring-blue-500 focus:ring-1"
        type="text"
        name={name}
        id={name}
        {...props}
      />
    </div>
  );
};

export default memo(InputField);
