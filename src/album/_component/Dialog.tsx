import { View, Text, Modal, StyleSheet } from "react-native"
import SquareButton from "@/common/SquareButton"
import MFText from "@/common/MFText"

interface DeleteDialogProps {
  title: string
  desc?: string
  confirmBtnContext: string
  visible: boolean
  onClose: () => void
  onConfirm: () => void
}

export const Dialog = ({
  title,
  desc,
  confirmBtnContext,
  visible,
  onClose,
  onConfirm,
}: DeleteDialogProps) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          {desc && <Text style={styles.description}>{desc}</Text>}
          <View style={styles.buttonContainer}>
            <SquareButton
              className="flex-1"
              variant="solid"
              size="large"
              theme="gray"
              onPress={onClose}>
              <MFText>닫기</MFText>
            </SquareButton>
            <SquareButton
              className="flex-1"
              variant="weak"
              size="large"
              theme="red"
              onPress={onConfirm}>
              <MFText>{confirmBtnContext}</MFText>
            </SquareButton>
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
})
