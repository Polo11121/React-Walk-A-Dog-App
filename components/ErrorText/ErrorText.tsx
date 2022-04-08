import { FormikErrors } from "formik";
import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

export const ErrorText = ({
  textContent,
  isError,
  errorStyle,
}: {
  textContent?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  isError: boolean;
  errorStyle?: StyleProp<TextStyle>;
}) =>
  isError ? (
    <Text style={[{ color: "red" }, errorStyle]}>{textContent}</Text>
  ) : null;
