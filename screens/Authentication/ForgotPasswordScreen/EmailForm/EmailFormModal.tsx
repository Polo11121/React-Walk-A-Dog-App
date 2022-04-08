import React from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "../../../../components/Button/Button";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./emailFormStyles";

type EmailFormModalProps = {
  isModalVisible: boolean;
  email: string;
  onCloseModal: () => void;
  onSubmitModal: () => void;
};

export const EmailFormModal = ({
  isModalVisible,
  email,
  onCloseModal,
  onSubmitModal,
}: EmailFormModalProps) => (
  <Modal animationType="slide" transparent={true} visible={isModalVisible}>
    <TouchableWithoutFeedback onPress={onCloseModal}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Pressable style={styles.closeIcon} onPress={onCloseModal}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
            <Text style={styles.modalText}>Podaj kod wysłany na emial</Text>
            <Text style={styles.modalText}>{email}</Text>
            <TextInput placeholder="#####" style={styles.modalInput} />
            <Button
              onPress={onSubmitModal}
              title="Dalej"
              titleStyle={styles.forgotPasswordModalButtonText}
              buttonStyle={styles.forgotPasswordModalButton}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);
