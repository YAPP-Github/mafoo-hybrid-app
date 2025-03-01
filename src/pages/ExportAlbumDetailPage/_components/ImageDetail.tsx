import { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native"
import { PhotoInfo } from "@/album/types"

interface ImageDetailProps {
  photos: PhotoInfo[]
  startIdx: number
  visible: boolean
  onClose: () => void
}

const ImageDetail = ({
  photos,
  startIdx,
  visible,
  onClose,
}: ImageDetailProps) => {
  const [idx, setIdx] = useState(startIdx)

  return (
    <>
      {visible && (
        <Modal className="flex-1 bg-black" animationType="fade">
          <StatusBar backgroundColor={"#000"} barStyle="light-content" />
          {/* Header */}
          <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.headerButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {idx + 1} / {photos.length}
            </Text>
          </SafeAreaView>

          {/* Image Viewer */}
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => setIdx((i) => (i + 1) % photos.length)}>
              <Image
                source={{ uri: photos[idx].photoUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  )
}

export default ImageDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000, // TODO: z-index 상수로 관리
  },
  headerButton: {
    color: "white",
    fontSize: 24,
    marginLeft: 32,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    marginRight: 32,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
  footer: {
    padding: 16,
    backgroundColor: "#111",
  },
  downloadButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  downloadText: {
    color: "white",
    fontSize: 16,
  },
  zoomContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000, // TODO: z-index 상수로 관리
  },
  zoomImage: {
    width: "90%",
    height: "90%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    // iOS shadow
    shadowColor: "rgba(101, 125, 159, 1)",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    // android shadow
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 14,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
})
