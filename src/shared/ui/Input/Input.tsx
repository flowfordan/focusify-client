import { InputProps } from "./Input.props";
import "./input.scss";
import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

const Input = forwardRef(function Input(
  { className, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="">
      <input type="text" className="input" ref={ref} {...props} />
    </div>
  );
});

export { Input };
