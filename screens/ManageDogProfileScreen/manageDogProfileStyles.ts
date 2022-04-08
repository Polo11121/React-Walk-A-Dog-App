import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "white",
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
  addPicture: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  addPictureButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 2,
    height: 120,
    width: 120,
  },
  addPictureText: {
    fontSize: 25,
    fontFamily: "Roboto_500Medium",
    marginLeft: 30,
  },
  form: {
    marginTop: 15,
    alignItems: "center",
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
    fontFamily: "Roboto_500Medium",
  },
  buttons: {
    paddingHorizontal: 20,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
