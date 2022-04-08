import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginBottom: 15,
  },
  content: {
    overflow: "visible",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    width: "100%",
    borderRadius: 15,
  },
  info: { marginLeft: 20, flexDirection: "column" },
  name: { fontSize: 30, fontFamily: "Roboto_700Bold" },
  race: { fontSize: 17, marginTop: -10, fontFamily: "Roboto_500Medium" },
  avatar: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#8FE388",
  },
});
