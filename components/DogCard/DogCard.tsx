import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./DogCardStyles";
import { Shadow } from "react-native-shadow-2";
import UserAvatar from "react-native-user-avatar";

type DogCardProps = {
  name: string;
  race: string;
  image?: string;
};

export const DogCard = ({ name, race, image }: DogCardProps) => (
  <TouchableOpacity activeOpacity={0.2} style={styles.container}>
    <Shadow distance={3} getChildRadius viewStyle={styles.content}>
      <>
        <Shadow distance={3} viewStyle={styles.avatar} getChildRadius>
          <UserAvatar size={74} src={image} name={name} bgColor="#8FE388" />
        </Shadow>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.race}>{race}</Text>
        </View>
      </>
    </Shadow>
  </TouchableOpacity>
);
