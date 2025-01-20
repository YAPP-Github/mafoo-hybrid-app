import React, { useCallback, useRef, useState } from "react"
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { toast } from "react-toastify"
import { generatePreSignedUrls, uploadPhotosWithUrls } from "@/api/photo"
import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"
import { buildCancelableTask } from "@/utils"
import MFText from "@/common/MFText"

interface AddImageDialogProps {
  currentAlbumId: string
  isVisible: boolean
  onTapQrScan: () => void
  onTapBackdrop: () => void
  onImageUploaded: () => void
}

export const AddImageDialog: React.FC<AddImageDialogProps> = ({
  currentAlbumId,
  isVisible,
  onTapQrScan,
  onTapBackdrop,
  onImageUploaded,
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

  const testProgressBar = () => {
    onTapBackdrop()
    setUploading(true)
  }

  const handleImageSelection = useCallback(async () => {
    // const result = await launchImageLibrary({
    //   mediaType: "photo",
    //   selectionLimit: 30,
    // })
    // if (result.didCancel) return
    // if (result.assets && result.assets.length > 30) {
    //   setOverLimit(true)
    //   return
    // }
    // const files = result.assets || []
    // setProgress(0)
    // setCurrentUploaded(0)
    // setTotalFiles(files.length)
    // setUploading(true)
    // setTasks([])
    // try {
    //   const preSignedResponse = await generatePreSignedUrls(
    //     files.map((file) => file.fileName!)
    //   )
    //   const preSignedUrls = preSignedResponse.urls
    //   setProgress(10)
    //   const totalItems = files.length
    //   let currentItems = 0
    //   await Promise.all(
    //     files.map((file, index) => {
    //       const task = buildCancelableTask(() =>
    //         fetch(preSignedUrls[index], {
    //           method: "PUT",
    //           body: file.uri,
    //           headers: {
    //             "Content-Type": file.type!,
    //           },
    //         }).then(() => {
    //           currentItems += 1
    //           setProgress(Math.floor((currentItems / totalItems) * 80 + 10))
    //           setCurrentUploaded(currentItems)
    //         })
    //       )
    //       // setTasks((prev) => [...prev, task])
    //       // return task.run()
    //     })
    //   )
    //   const actualFileUrls = preSignedUrls.map((url) => url.split("?")[0])
    //   await uploadPhotosWithUrls(actualFileUrls, currentAlbumId)
    //   setProgress(100)
    //   onImageUploaded()
    // } catch (error) {
    //   if (error instanceof Error && error?.message === "CanceledError") return
    //   setError(true)
    //   console.error("Upload failed:", error)
    // } finally {
    //   setUploading(false)
    // }
  }, [currentAlbumId, onImageUploaded])

  return (
    <>
      {/* isVisible: QR 코드 스캔 / 갤러리 선택 상태 */}
      {isVisible && (
        <Modal transparent visible={isVisible}>
          <TouchableOpacity
            onPress={onTapBackdrop}
            activeOpacity={0.45}
            style={{ opacity: 0.45, paddingHorizontal: 21 }}
            className="flex-1 bg-gray-700"
          />
          <View
            style={{ transform: [{ translateX: 20 }] }}
            className="absolute z-30 w-[calc(100%-40px)] bottom-[24px] bg-white rounded-[16px]">
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
              <TouchableOpacity onPress={testProgressBar}>
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
        </Modal>
      )}
      {isUploading && (
        <Modal transparent visible={isUploading}>
          <TouchableOpacity
            onPress={onTapBackdrop}
            activeOpacity={0.45}
            style={{ opacity: 0.45, paddingHorizontal: 21 }}
            className="fixed flex-1 left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-gray-800/50 px-5 transition-all duration-500"
          />
          <View>
            {/* <TouchableOpacity
            onPress={onTapBackdrop}
            className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-gray-800/50 px-5 transition-all duration-500"> */}
            <View className="w-full rounded-2xl bg-white p-6 px-8">
              <View className="flex flex-col items-center gap-1">
                <View className="flex flex-col items-center gap-1">
                  <MFText className="tp-header2-semibold text-gray-900">
                    {progress}%
                  </MFText>
                  <MFText className="tp-body1-regular text-gray-500">
                    마푸가 열심히 올리는 중...
                  </MFText>
                </View>
                <Icon name="uploadMafoo" size={120} color="gray-500" />
                <View className="flex w-full flex-col items-end">
                  <View
                    className="relative h-2 w-full bg-gray-200"
                    style={{ borderRadius: "64px" }}>
                    <View
                      className="absolute h-2 bg-green-600"
                      style={{
                        borderRadius: "64px",
                        width: progress + "%",
                      }}></View>
                  </View>
                  <MFText className="tp-caption1-regular text-gray-400">
                    {currentUploaded} / {totalFiles}장
                  </MFText>
                </View>
                <View className="h-3" />
                <View className="flex w-full">
                  {/* <SquareButton
                    className="flex-1"
                    variant="weak"
                    size="medium"
                    theme="red"
                    onClick={onTapCancel}>
                    업로드 그만두기
                  </SquareButton> */}
                </View>
              </View>
            </View>
            {/* </TouchableOpacity> */}
          </View>
        </Modal>
      )}
      {isError && (
        <View className="absolute inset-0">
          <View className="items-center justify-center">
            <Icon name="sadMafoo" size={120} color="gray" />
            <Text className="text-lg font-bold text-gray-900">업로드 실패</Text>
            <SquareButton
              className="mt-4"
              onPress={() => setError(false)}
              variant="weak"
              size="medium">
              <Text>닫기</Text>
            </SquareButton>
          </View>
        </View>
      )}
    </>
  )
}
