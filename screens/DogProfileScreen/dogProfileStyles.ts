import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white", paddingVertical: 15 },
  name: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 36,
    fontFamily: "Roboto_700Bold",
  },
  info: { flexDirection: "row", alignItems: "center", padding: 10 },
  line: { flex: 1, height: 1, backgroundColor: "black" },
  infoTitle: {
    width: 125,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Roboto_500Medium",
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
  },
  infoSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoSectionTitle: {
    fontFamily: "Roboto_700Bold",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#C4C4C4",
    width: 104,
    height: 33,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 13,
  },
  buttons: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  avatar: {
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "#8FE388",
    alignSelf: "center",
  },
});
