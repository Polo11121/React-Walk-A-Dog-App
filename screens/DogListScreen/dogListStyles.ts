import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Roboto_700Bold",
    fontSize: 30,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  dogList: { alignItems: "center" },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    alignItems: "flex-end",
  },
  addDogButton: {
    flexDirection: "row",
    backgroundColor: "#C4C4C4",
    width: 104,
    height: 33,
    borderRadius: 15,
  },
  addDogButtonText: {
    fontSize: 13,
  },
});
