import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";
import { ErrorText } from "Components";
import { CSSProperties } from "@mui/styled-engine";
import { FormikProps } from "formik";
import "./Input.scss";

type InputProps = {
  placeholder: string;
  styles?: CSSProperties;
  inputName: string;
  isError?: boolean;
  type?: HTMLInputTypeAttribute;
  formikProps: FormikProps<any>;
  label?: string;
};

export const Input = ({
  placeholder,
  styles,
  inputName,
  label = "elo",
  isError,
  type,
  formikProps,
}: InputProps) => {
  return (
    <>
      <ErrorText
        isError={isError && Boolean(formikProps.errors[inputName])}
        text={formikProps.errors[inputName] as string}
      />
      <label className="input__label">{label}</label>
      <input
        style={
          styles as DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
          >
        }
        value={formikProps.values[inputName]}
        type={type}
        onChange={formikProps.handleChange(inputName)}
        className="input"
        placeholder={placeholder}
      />
    </>
  );
};
