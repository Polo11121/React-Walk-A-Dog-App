import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { AuthenticationStackParamList } from "../shared/types";
import { Button } from "../../../components/Button/Button";
import { Formik } from "formik";
import { registerSchema } from "./registerSchema";
import { Input } from "../../../components/Input/Input";
import { styles } from "./registerScreenStyles";

type RegisterScreenProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "Register"
>;

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [error, setError] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.screen}>
        <Formik
          onSubmit={(values) => {
            alert("elo");
          }}
          validationSchema={registerSchema}
          validateOnMount
          initialValues={{
            userName: "",
            password: "",
            repeatPassword: "",
            email: "",
          }}
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
                inputPlaceholder="Hasła"
                isError={error}
                isPassword
              />
              <Input
                errorStyle={{ width: "80%" }}
                formikProps={props}
                inputName="repeatPassword"
                inputPlaceholder="Powtórz Hasło"
                isError={error}
                isPassword
              />
              <Input
                errorStyle={{ width: "80%" }}
                formikProps={props}
                inputName="email"
                inputPlaceholder="Email"
                isError={error}
              />
              <Button
                title="ZAREJESTRUJ"
                buttonStyle={styles.registerButton}
                titleStyle={styles.registerButtonText}
                onPress={() => {
                  setError(
                    Boolean(
                      props.errors.email ||
                        props.errors.password ||
                        props.errors.repeatPassword ||
                        props.errors.userName
                    )
                  );
                  props.handleSubmit();
                }}
              />
            </>
          )}
        </Formik>
        <Button
          isShadow
          title="Mam juz konto"
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginButtonText}
          onPress={() => navigation.replace("Login")}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
