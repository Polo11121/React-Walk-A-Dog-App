import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { AuthenticationStackParamList } from "../shared/types";
import { EmailForm } from "./EmailForm/EmailForm";
import { NewPasswordForm } from "./NewPasswordForm/NewPasswordForm";

type RegisterScreenProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "ForgotPassword"
>;

export const ForgotPasswordScreen = ({ navigation }: RegisterScreenProps) => {
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

  const correctCodeHandler = () => setIsCodeCorrect(true);

  const goBackHandler = () => navigation.goBack();

  return isCodeCorrect ? (
    <NewPasswordForm onCancel={goBackHandler} />
  ) : (
    <EmailForm onCorrectCode={correctCodeHandler} />
  );
};
