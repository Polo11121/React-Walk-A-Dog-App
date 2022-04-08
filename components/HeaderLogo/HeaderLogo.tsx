import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./HeaderLogoStyles";

export const HeaderLogo = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.title}>Walk a dog</Text>
    </View>
  );
};
