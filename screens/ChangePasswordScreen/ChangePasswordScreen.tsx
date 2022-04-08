import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Formik } from "formik";
import { changePasswordSchema } from "./changePasswordSchema";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { styles } from "./changePasswordStyles";

export const ChangePasswordScreen = () => {
  const [error, setError] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.title}>Zmiana hasła</Text>
        <Formik
          onSubmit={() => {}}
          validateOnMount
          validationSchema={changePasswordSchema}
          initialValues={{
            password: "",
            repeatPassword: "",
            oldPassword: "",
          }}
        >
          {(props) => (
            <>
              <KeyboardAvoidingView style={styles.form}>
                <Input
                  errorStyle={{ width: "80%" }}
                  formikProps={props}
                  inputName="password"
                  inputPlaceholder="Nowe hasło"
                  isError={error}
                  isPassword
                />
                <Input
                  errorStyle={{ width: "80%" }}
                  formikProps={props}
                  inputName="repeatPassword"
                  inputPlaceholder="Powtórz nowe hasło"
                  isError={error}
                  isPassword
                />
                <Input
                  errorStyle={{ width: "80%" }}
                  formikProps={props}
                  inputName="oldPassword"
                  inputPlaceholder="Podaj stare hasło"
                  isError={error}
                  isPassword
                />
              </KeyboardAvoidingView>
              <View style={styles.buttons}>
                <Button
                  isShadow
                  onPress={() => {
                    setError(
                      Boolean(
                        props.errors.password ||
                          props.errors.repeatPassword ||
                          props.errors.oldPassword
                      )
                    );
                    props.handleSubmit();
                  }}
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonText}
                  title="Zmień hasło"
                />
                <Button
                  isShadow
                  onPress={() => null}
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonText}
                  title="Anuluj"
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
