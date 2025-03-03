import React, { useCallback, useState } from "react"
import { View, TouchableOpacity, Modal } from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import Toast from "react-native-toast-message"
import { generatePreSignedUrls, uploadPhotosWithUrls } from "@/api/photo"
import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"
import { buildCancelableTask } from "@/utils"
import MFText from "@/common/MFText"
import { PhotoInfo } from "@/album/types"

interface AddImageDialogProps {
  currentAlbumId: string
  isAddDialogShow: boolean
  backDropShow: boolean
  onTapQrScan: () => void
  onTapBackdrop: () => void
  onImageUploaded: () => void
  onClossAddDialog: () => void
  onCloseAddDialogOnly: () => void
}

export const AddImageDialog: React.FC<AddImageDialogProps> = ({
  currentAlbumId,
  isAddDialogShow,
  backDropShow,
  onTapQrScan,
  onTapBackdrop,
  onImageUploaded,
  onClossAddDialog,
  onCloseAddDialogOnly,
}) => {
  const [isUploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentUploaded, setCurrentUploaded] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)
  const [isError, setError] = useState(false)
  const [isOverLimit, setOverLimit] = useState(false)

  const [tasks, setTasks] = useState<
    { run: () => Promise<unknown>; cancel: () => void }[]
  >([])

  const onTapCancel = () => {
    tasks.forEach((task) => task.cancel())
    setUploading(false)
    Toast.show({
      type: "errorToast",
      text1: "업로드 진행이 취소됐어요",
    })
  }

  // 파일 URI를 Blob으로 변환
  const uriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri)
    const blob = await response.blob()
    return blob
  }

  const handleImageSelection = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 30,
    })

    if (result.didCancel) {
      return
    }
    if (result.assets && result.assets.length > 30) {
      setOverLimit(true)
      return
    }

    console.log("assets", result.assets)
    const files = result.assets || []
    setProgress(0)
    setCurrentUploaded(0)
    setTotalFiles(files.length)

    /* 업로드 먼저 띄우고 (true로 유지) 기존 모달 닫기 */
    setUploading(true)
    onCloseAddDialogOnly()

    setTasks([])

    try {
      const preSignedResponse = await generatePreSignedUrls(
        files.map((file) => file.fileName!)
      )
      const preSignedUrls = preSignedResponse.urls
      setProgress(10)
      const totalItems = files.length
      let currentItems = 0

      console.log("preSignedUrls", preSignedUrls)

      await Promise.all(
        files.map(async (file, index) => {
          const blob = await uriToBlob(file.uri!)

          const task = buildCancelableTask(() =>
            fetch(preSignedUrls[index], {
              method: "PUT",
              body: blob,
              headers: {
                "Content-Type": file.type || "application/octet-stream",
              },
            }).then(() => {
              currentItems += 1
              setProgress(Math.floor((currentItems / totalItems) * 80 + 10))
              setCurrentUploaded(currentItems)
            })
          )
          setTasks((prev) => [...prev, task])
          return task.run()
        })
      )
      const actualFileUrls = preSignedUrls.map((url) => url.split("?")[0])
      const uploadPhotos = await uploadPhotosWithUrls(
        actualFileUrls,
        currentAlbumId
      )
      setProgress(100)
      onImageUploaded()
    } catch (error) {
      if (error instanceof Error && error?.message === "CanceledError") return
      setError(true)
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }, [currentAlbumId, onImageUploaded])

  const [offset, setOffset] = useState({ x: 0, y: 0 })

  return (
    <>
      {/* isVisible: QR 코드 스캔 / 갤러리 선택 상태 */}
      <Modal
        transparent
        visible={backDropShow && (isAddDialogShow || isUploading || isError)}
        animationType="fade">
        <TouchableOpacity
          onPress={() => {
            if (isAddDialogShow) {
              onClossAddDialog() // 백드랍 + 이미지 모달 둘 다 닫음
              setUploading(false)
              setError(false)
            }
          }}
          activeOpacity={0.45}
          style={{ opacity: 0.45, paddingHorizontal: 21 }}
          className="flex-1 bg-gray-700"
        />
        {isAddDialogShow && (
          <View
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout
              setOffset({ x: -width / 2, y: -height / 2 })
            }}
            style={{
              transform: [{ translateX: offset.x }],
            }}
            className="absolute z-30 left-[50%] bottom-[24px] w-[calc(100%-40px)] bg-sumone-white rounded-[16px]">
            <View className="p-[12px] flex-row justify-center gap-[6px]">
              <TouchableOpacity onPress={onTapQrScan}>
                <View className="px-[24px] py-[16px] items-center gap-[8px]">
                  <Icon name="qrIcon" size={28} color="gray" />
                  <MFText
                    weight="SemiBold"
                    className="text-center text-gray-600 text-body1">
                    QR 스캔으로 추가
                  </MFText>
                </View>
              </TouchableOpacity>
              <View className="w-[1px] h-full bg-gray-200" />
              <TouchableOpacity onPress={handleImageSelection}>
                <View className="px-[24px] py-[16px] items-center gap-[8px]">
                  <Icon name="galleryIcon" size={28} color="gray" />
                  <MFText
                    weight="SemiBold"
                    className="text-center text-gray-600 text-body1">
                    갤러리에서 추가
                  </MFText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isUploading && (
          <View
            style={{ transform: [{ translateX: 25 }, { translateY: 300 }] }}
            className="absolute z-30 w-[350px] bg-sumone-white rounded-[16px] px-[20px]">
            <View className="w-full rounded-2xl bg-sumone-white p-6 px-8">
              <View className="flex flex-col items-center gap-1">
                {/* 업로드 %, 텍스트 */}
                <View className="flex flex-col items-center gap-1">
                  <MFText
                    weight="SemiBold"
                    className="text-header2 text-gray-900">
                    {progress}%
                  </MFText>
                  <MFText className="text-body1 text-gray-500">
                    마푸가 열심히 올리는 중...
                  </MFText>
                </View>
                {/* 마푸 아이콘 */}
                <Icon name="uploadMafoo" size={120} color="gray-500" />
                {/* Progress bar */}
                <View className="flex w-full flex-col items-end gap-1">
                  <View className="relative h-2 w-full bg-gray-200 rounded-[64px]">
                    <View
                      className="absolute h-2 bg-green-600 rounded-[64px]"
                      style={{
                        width: progress,
                      }}
                    />
                  </View>
                  <MFText className="tp-caption1-regular text-gray-400">
                    {currentUploaded} / {totalFiles}장
                  </MFText>
                </View>
                <View className="flex w-full">
                  <SquareButton
                    onPress={onTapCancel}
                    className="flex-1 mt-[20px]"
                    variant="weak"
                    size="medium"
                    theme="red">
                    <MFText
                      weight="SemiBold"
                      className="text-body2 text-red-600">
                      업로드 그만두기
                    </MFText>
                  </SquareButton>
                </View>
              </View>
            </View>
          </View>
        )}
        {isError && (
          <View
            style={{ transform: [{ translateX: 25 }, { translateY: 300 }] }}
            className="absolute z-30 w-[350px] bg-sumone-white rounded-[16px]">
            <View className="w-full rounded-2xl bg-sumone-white p-6 px-8">
              <View className="flex flex-col items-center gap-1">
                <View className="flex flex-col items-center gap-1">
                  <MFText
                    weight="SemiBold"
                    className="text-header2 text-gray-900">
                    앗, 다시 시도해주세요
                  </MFText>
                  <MFText className="text-body1 text-gray-500">
                    네트워크가 잘 연결되었는지 확인해주세요
                  </MFText>
                </View>
                <Icon name="sadMafoo" size={120} color="gray" />
                <View className="flex w-full">
                  <SquareButton
                    className="mt-4"
                    onPress={() => setError(false)}
                    theme="gray"
                    variant="weak"
                    size="medium">
                    <MFText weight="SemiBold" className="text-body2">
                      닫기
                    </MFText>
                  </SquareButton>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </>
  )
}
