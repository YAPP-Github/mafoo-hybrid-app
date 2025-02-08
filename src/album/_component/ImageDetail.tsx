import { useState } from "react"
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
import SquareButton from "@/common/SquareButton"
import MFText from "@/common/MFText"

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
        <Modal style={styles.container} animationType="fade">
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
                  <MFText weight="SemiBold" className="text-title1">
                    해당 사진을 삭제할까요?
                  </MFText>
                  <MFText className="text-gray-600 text-body1 mt-[12px]">
                    한 번 삭제하면 복구할 수 없어요.
                  </MFText>
                  <View style={styles.modalActions}>
                    <SquareButton
                      className="flex-1"
                      variant="solid"
                      size="large"
                      theme="gray">
                      <TouchableOpacity
                        className="flex-1 items-center justify-center"
                        onPress={() => setDeleteModalShown(false)}>
                        <MFText
                          weight="SemiBold"
                          className="text-body1 text-gray-600">
                          닫기
                        </MFText>
                      </TouchableOpacity>
                    </SquareButton>
                    <SquareButton
                      className="flex-1"
                      variant="solid"
                      size="large"
                      theme="red">
                      <TouchableOpacity
                        className="flex-1 items-center justify-center"
                        onPress={handleDelete}>
                        <MFText
                          weight="SemiBold"
                          className="text-body1 text-white">
                          사진 삭제
                        </MFText>
                      </TouchableOpacity>
                    </SquareButton>
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
