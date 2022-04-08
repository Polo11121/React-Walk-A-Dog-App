import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    alignItems: "center",
  },
  title: {
    letterSpacing: 2,
    marginTop: 20,
    fontSize: 45,
    fontFamily: "Roboto_700Bold",
  },
  loginButton: {
    width: 265,
    height: 64,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 10,
    elevation: 5,
  },
  loginButtonText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 36,
    lineHeight: 42,
  },
});
