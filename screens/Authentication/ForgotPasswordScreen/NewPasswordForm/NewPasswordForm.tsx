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
import { newPasswordSchema } from "./newPasswordFormSchema";
import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";
import { styles } from "./newPasswordFormStyles";

export const NewPasswordForm = ({ onCancel }: { onCancel: () => void }) => {
  const [error, setError] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.title}>Zmiana hasła</Text>
        <Formik
          onSubmit={() => {}}
          validateOnMount
          validationSchema={newPasswordSchema}
          initialValues={{
            password: "",
            repeatPassword: "",
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
              </KeyboardAvoidingView>
              <View style={styles.buttons}>
                <Button
                  isShadow
                  onPress={() => {
                    setError(
                      Boolean(
                        props.errors.password || props.errors.repeatPassword
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
                  onPress={onCancel}
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
