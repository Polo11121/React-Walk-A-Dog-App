import { FormikProps } from "formik";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputIOSProps,
  TextStyle,
} from "react-native";
import { ErrorText } from "../ErrorText/ErrorText";

type InputProps = {
  isError: boolean;
  errorStyle: StyleProp<TextStyle>;
  inputPlaceholder: string;
  inputName: string;
  formikProps: FormikProps<any>;
  isPassword?: boolean;
};
export const Input = ({
  isError,
  errorStyle,
  inputPlaceholder,
  inputName,
  formikProps,
  isPassword,
}: InputProps) => (
  <>
    <ErrorText
      isError={isError && Boolean(formikProps.errors[inputName])}
      textContent={formikProps.errors[inputName]}
      errorStyle={errorStyle}
    />
    <TextInput
      secureTextEntry={isPassword}
      value={formikProps.values[inputName]}
      style={styles.input}
      onChangeText={formikProps.handleChange(inputName)}
      placeholder={inputPlaceholder}
    />
  </>
);

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    paddingHorizontal: 20,
    width: "80%",
    paddingVertical: 10,
    color: "#A3A3A3",
    backgroundColor: "#F1F1F1",
    borderRadius: 5,
  },
});
