import React, { useState } from "react";
import { Formik } from "formik";
import { View } from "react-native";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import { EmailFormModal } from "./EmailFormModal";
import { emailFormSchema } from "./emailFormSchema";
import { styles } from "./emailFormStyles";

export const EmailForm = ({ onCorrectCode }: { onCorrectCode: () => void }) => {
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModalHandler = () => setIsModalVisible(false);
  const submitModalHandler = () => {
    closeModalHandler();
    onCorrectCode();
  };

  return (
    <View style={styles.screen}>
      <EmailFormModal
        onSubmitModal={submitModalHandler}
        onCloseModal={closeModalHandler}
        email={email}
        isModalVisible={isModalVisible}
      />

      <Formik
        validateOnMount
        onSubmit={({ email }) => {
          setIsModalVisible(true);
          setEmail(email);
        }}
        validationSchema={emailFormSchema}
        initialValues={{ email: "" }}
      >
        {(props) => (
          <View style={styles.form}>
            <Input
              errorStyle={{ width: "80%" }}
              formikProps={props}
              inputName="email"
              inputPlaceholder="Adres email"
              isError={isError}
            />
            <Button
              title="Przypomnij hasło"
              buttonStyle={styles.forgotPasswordButton}
              titleStyle={styles.forgotPasswordButtonText}
              onPress={() => {
                setIsError(Boolean(props.errors.email));
                props.handleSubmit();
              }}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
