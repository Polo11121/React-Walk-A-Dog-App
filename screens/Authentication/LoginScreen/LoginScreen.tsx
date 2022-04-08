import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { AuthenticationStackParamList } from "../shared/types";
import { Button } from "../../../components/Button/Button";
import { Formik } from "formik";
import { Input } from "../../../components/Input/Input";
import { ErrorText } from "../../../components/ErrorText/ErrorText";
import { styles } from "./loginScreenStyles";

type LoginScreenProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "Login"
>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [error, setError] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Formik
          onSubmit={({ password, userName }) => {
            setError(!password || !userName);
          }}
          initialValues={{ userName: "", password: "" }}
        >
          {(props) => (
            <>
              <Input
                errorStyle={{ width: "80%" }}
                formikProps={props}
                inputName="userName"
                inputPlaceholder="Nazwa użytkownika"
                isError={error}
              />
              <Input
                errorStyle={{ width: "80%" }}
                formikProps={props}
                inputName="password"
                inputPlaceholder="Hasło"
                isError={error}
                isPassword
              />
              <ErrorText
                isError={error}
                textContent=" Nieprawidłowa nazwa użytkownika lub hasło"
              />
              <Button
                title="ZALOGUJ"
                buttonStyle={styles.loginButton}
                titleStyle={styles.loginButtonText}
                onPress={() => props.handleSubmit()}
              />
            </>
          )}
        </Formik>
        <Button
          isShadow
          title="Nie mam konta"
          buttonStyle={styles.registerButton}
          titleStyle={styles.registerButtonText}
          onPress={() => navigation.replace("Register")}
        />
        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Zapomniałem hasła</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};
