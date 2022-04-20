import { CSSProperties } from "react";

type ErrorTextType = {
  text?: string;
  isError?: boolean;
  styles?: CSSProperties;
};

const ErrorText = ({ text, isError = false, styles }: ErrorTextType) => {
  return isError ? (
    <span
      style={{
        color: "red",
        textAlign: "left",
        width: "100%",
        fontSize: "14px",
        ...styles,
      }}
    >
      {text}
    </span>
  ) : null;
};

export default ErrorText;
