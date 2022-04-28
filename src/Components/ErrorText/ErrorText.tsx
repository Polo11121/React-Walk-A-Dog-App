import { CSSProperties } from "react";

type ErrorTextProps = {
  text?: string;
  isError?: boolean;
  styles?: CSSProperties;
};

export const ErrorText = ({
  text,
  isError = false,
  styles,
}: ErrorTextProps) => {
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
