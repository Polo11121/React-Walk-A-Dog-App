import { CSSProperties } from "@mui/styled-engine";
import { FormikProps } from "formik";
import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";
import ErrorText from "../ErrorText/ErrorText";
import "./Input.scss";

type InputProps = {
  placeholder: string;
  styles?: CSSProperties;
  inputName: string;
  isError?: boolean;
  type?: HTMLInputTypeAttribute;
  formikProps: FormikProps<any>;
};

export const Input = ({
  placeholder,
  styles,
  inputName,
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
