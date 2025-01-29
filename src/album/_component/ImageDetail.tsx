import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native"
import { PhotoInfo } from "../types"

interface ImageDetailProps {
  photos: PhotoInfo[]
  startIdx: number
  visible: boolean
  onClose: () => void
  onDelete: (photoIdx: number) => Promise<void>
}

const ImageDetail = ({
  photos,
  startIdx,
  visible,
  onClose,
  onDelete,
}: ImageDetailProps) => {
  const [idx, setIdx] = useState(startIdx)
  const [deleteModalShown, setDeleteModalShown] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const handleDelete = async () => {
    await onDelete(idx)
    setDeleteModalShown(false)
    onClose()
  }

  const handleZoomOut = () => {
    setIsZoomed(false)
  }

  const handleImageClick = () => {
    setIsZoomed(true)
  }

  return (
    <>
      {visible && (
        <Modal style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.headerButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {/* {idx + 1} / {photos.length} */}
            </Text>
            <TouchableOpacity onPress={() => setDeleteModalShown(true)}>
              <Text style={[styles.headerButton, { color: "red" }]}>삭제</Text>
            </TouchableOpacity>
          </View>

          {/* Image Viewer */}
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handleImageClick}>
              <Image
                source={{ uri: photos[idx].photoUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadText}>다운로드 받기</Text>
            </TouchableOpacity>
          </View>

          {/* Zoom Modal */}
          {isZoomed && (
            <Modal visible={isZoomed} transparent={true}>
              <View style={styles.zoomContainer}>
                <TouchableOpacity
                  style={styles.zoomOverlay}
                  onPress={handleZoomOut}
                />
                <Image
                  source={{ uri: photos[idx].photoUrl }}
                  style={styles.zoomImage}
                  resizeMode="contain"
                />
              </View>
            </Modal>
          )}

          {/* Delete Confirmation Modal */}
          {deleteModalShown && (
            <Modal visible={deleteModalShown} transparent={true}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>해당 사진을 삭제할까요?</Text>
                  <Text style={styles.modalDesc}>
                    한 번 삭제하면 복구할 수 없어요.
                  </Text>
                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setDeleteModalShown(false)}>
                      <Text>닫기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: "red" }]}
                      onPress={handleDelete}>
                      <Text style={{ color: "white" }}>사진 삭제</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    zIndex: 1000, // TODO: z-index 상수로 관리
    marginTop: 50,
  },
  headerButton: {
    color: "black", //"white",
    fontSize: 18,
  },
  headerText: {
    color: "white",
    fontSize: 16,
  },
  imageContainer: {
    flex: 1,

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
    borderRadius: 8,
    padding: 16,
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
    justifyContent: "space-around",
  },
  modalButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
})
