import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { Button } from "../../components/Button/Button";
import { manageDogSchema } from "./manageDogProfileSchema";
import { Input } from "../../components/Input/Input";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./manageDogProfileStyles";

export const ManageDogProfileScreen = () => {
  const [dogImage, setDogImage] = useState<null | string>(null);
  const [error, setError] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setDogImage(result.uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.title}>Stwórz profil psa</Text>
        <View style={styles.addPicture}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.addPictureButton}>
              {dogImage ? (
                <Image
                  source={{ uri: dogImage }}
                  style={styles.addPictureButton}
                />
              ) : (
                <Ionicons name="add-outline" size={50} color="black" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.addPictureText}>Dodaj zdjęcie</Text>
        </View>
        <Formik
          onSubmit={() => {}}
          validateOnMount
          validationSchema={manageDogSchema}
          initialValues={{
            dogName: "",
            dogRace: "",
            dogDate: "",
            dogWeight: "",
          }}
        >
          {(props) => (
            <>
              <KeyboardAvoidingView style={styles.form}>
                <Input
                  errorStyle={{ width: "80%" }}
                  formikProps={props}
                  inputName="dogName"
                  inputPlaceholder="Nazwa psa"
                  isError={error}
                />
                <Input
                  errorStyle={{ width: "80%" }}
                  formikProps={props}
                  inputName="dogRace"
                  inputPlaceholder="Rasa psa"
                  isError={error}
                />
                <Input
                  errorStyle={{ width: "80%" }}
                  formikProps={props}
                  inputName="dogDate"
                  inputPlaceholder="Data urodzenia psa"
                  isError={error}
                />
                <Input
                  errorStyle={{ width: "80%" }}
                  formikProps={props}
                  inputName="dogWeight"
                  inputPlaceholder="Waga psa"
                  isError={error}
                />
              </KeyboardAvoidingView>
              <View style={styles.buttons}>
                <Button
                  isShadow
                  onPress={() => {
                    setError(
                      Boolean(
                        props.errors.dogName ||
                          props.errors.dogRace ||
                          props.errors.dogDate ||
                          props.errors.dogWeight
                      )
                    );
                    props.handleSubmit();
                  }}
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonText}
                  title="Zapisz"
                />
                <Button
                  isShadow
                  onPress={() => null}
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonText}
                  title="Dodaj Zalecenia"
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
