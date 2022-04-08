import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    backgroundColor: "white",
  },
  forgotPasswordButton: {
    backgroundColor: "#8FE388",
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
  forgotPasswordButtonText: {
    fontSize: 30,
    lineHeight: 42,
    fontFamily: "Roboto_500Medium",
  },
  forgotPasswordModalButton: {
    backgroundColor: "#8FE388",
    width: 150,
    height: 50,
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
  forgotPasswordModalButtonText: {
    fontSize: 20,
    lineHeight: 42,
    fontFamily: "Roboto_500Medium",
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  modalText: {
    textAlign: "center",
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
  },
  modalInput: {
    borderColor: "#8FE388",
    borderBottomWidth: 3,
    width: "20%",
  },
});
