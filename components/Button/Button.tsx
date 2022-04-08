import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { styles } from "./ButtonStyles";

type ButtonProps = {
  title: string;
  buttonStyle: StyleProp<ViewStyle>;
  titleStyle: StyleProp<TextStyle>;
  onPress: (event: GestureResponderEvent) => void;
  icon?: ReactNode;
  isShadow?: boolean;
};

export const Button = ({
  title,
  buttonStyle,
  titleStyle,
  onPress,
  icon,
  isShadow = false,
}: ButtonProps) => (
  <Shadow distance={isShadow ? 3 : 0}>
    <TouchableOpacity
      activeOpacity={0.4}
      style={[styles.button, buttonStyle]}
      onPress={onPress}
    >
      {icon}
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  </Shadow>
);
