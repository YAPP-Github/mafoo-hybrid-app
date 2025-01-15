import React from "react"
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native"
import SquareButton from "@/common/SquareButton"

interface DeleteDialogProps {
  title: string
  desc: string
  confirmBtnContext: string
  onClose: () => void
  onConfirm: () => void
}

export const Dialog = ({
  title,
  desc,
  confirmBtnContext,
  onClose,
  onConfirm,
}: DeleteDialogProps) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{desc}</Text>
          <View style={styles.buttonContainer}>
            {/* <SquareButton
              style={styles.button}
              variant="solid"
              size="large"
              theme="gray"
              onPress={onClose}>
              닫기
            </SquareButton>
            <SquareButton
              style={styles.button}
              variant="solid"
              size="large"
              theme="red"
              onPress={onConfirm}>
              {confirmBtnContext}
            </SquareButton> */}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: 350,
    borderRadius: 24,
    backgroundColor: "white",
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  button: {
    flex: 1,
  },
})
