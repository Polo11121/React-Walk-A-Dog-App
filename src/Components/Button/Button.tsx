import { CSSProperties, FormEvent, MouseEventHandler, ReactNode } from "react";
import "./Button.scss";

type ButtonProps = {
  title: string;
  Icon?: ReactNode;
  type: "primary" | "secondary" | "default" | "green" | "red";
  size: "XL" | "M" | "S" | "L";
  styles?: CSSProperties;
  onClick?: (
    e?: FormEvent<HTMLFormElement>
  ) => void | MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button = ({
  title,
  disabled = false,
  type,
  size,
  styles,
  onClick,
  Icon,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick as unknown as MouseEventHandler<HTMLButtonElement>}
      style={styles}
      className={`button button__${type} button--${size}${
        disabled ? " button--disabled" : ""
      }`}
    >
      <>
        {Icon}
        {title}
      </>
    </button>
  );
};
