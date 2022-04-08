import React from "react";
import UserAvatar from "react-native-user-avatar";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Button } from "../../components/Button/Button";
import { Shadow } from "react-native-shadow-2";
import { styles } from "./dogProfileStyles";

export const DogProfile = () => (
  <View style={styles.screen}>
    <Shadow
      distance={5}
      containerViewStyle={{ alignSelf: "center" }}
      viewStyle={styles.avatar}
      getChildRadius
    >
      <UserAvatar
        size={200}
        bgColor="inherit"
        src="https://bi.im-g.pl/im/d0/a9/e1/z14789072Q,Prawdopodobnie-najslawniejsze-zdjecie-Piesela.jpg"
      />
    </Shadow>

    <Text style={styles.name}>Rambo</Text>
    <View style={styles.info}>
      <View style={styles.line} />
      <Text style={styles.infoTitle}>Informacje</Text>
      <View style={styles.line} />
    </View>
    <View style={styles.sectionContainer}>
      <View style={styles.infoSection}>
        <Text style={styles.infoSectionTitle}>Wiek:</Text>
        <Text>2 lata</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoSectionTitle}>Rasa:</Text>
        <Text>Pomeranian</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoSectionTitle}>Waga:</Text>
        <Text>5 kg</Text>
      </View>
    </View>
    <View style={styles.info}>
      <View style={styles.line} />
      <Text style={styles.infoTitle}>Spacery</Text>
      <View style={styles.line} />
    </View>
    <View style={styles.sectionContainer}>
      <View style={styles.infoSection}>
        <Text style={styles.infoSectionTitle}>Liczba spacerów:</Text>
        <Text>12</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoSectionTitle}>Pokonana długość:</Text>
        <Text>57km</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoSectionTitle}>Łączny czas:</Text>
        <Text>12 h</Text>
      </View>
    </View>
    <View style={styles.buttons}>
      <Button
        isShadow
        onPress={() => null}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Zalecenia"
      />
      <Button
        isShadow
        onPress={() => null}
        icon={<Entypo name="pencil" size={24} color="black" />}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Edytuj psa"
      />
    </View>
  </View>
);
