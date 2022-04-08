import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Image } from "react-native";
import { AuthenticationStackParamList } from "../shared/types";
import { Button } from "../../../components/Button/Button";
import { styles } from "./mainScreenStyles";

type MainScreenProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "Main"
>;

export const MainScreen = ({ navigation }: MainScreenProps) => (
  <View style={styles.screen}>
    <View style={styles.logo}>
      <Image source={require("../../../assets/logo.png")}></Image>
      <Text style={styles.title}>Walk A Dog</Text>
    </View>
    <View>
      <Button
        title="ZALOGUJ"
        buttonStyle={[{ backgroundColor: "#8FE388" }, styles.loginButton]}
        titleStyle={styles.loginButtonText}
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="ZAREJESTRUJ"
        buttonStyle={[{ backgroundColor: "#ECECEC" }, styles.loginButton]}
        titleStyle={styles.loginButtonText}
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  </View>
);
