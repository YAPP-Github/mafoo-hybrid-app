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
    //   tasks.forEach((task) => task.cancel())
    setUploading(false)
    toast.error("업로드 진행이 취소됐어요")
  }

  const handleImageSelection = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 30, // 최대 30개
    })

    if (result.didCancel) {
      return
    }
    if (result.assets && result.assets.length > 30) {
      setOverLimit(true)
      return
    }
    const files = result.assets || []
    setProgress(0)
    setCurrentUploaded(0)
    setTotalFiles(files.length)

    /* 업로드 먼저 띄우고 (true로 유지) 기존 모달 닫기 */
    setUploading(true)
    onCloseAddDialogOnly()

    setTasks([])

    try {
      function delay10Seconds() {
        return new Promise((resolve, reject) => {
          // 3초 후에 에러 발생
          // const errorTimeout = setTimeout(() => {
          //   reject(new Error("업로드 중 에러 발생"))
          // }, 3000)

          // 5초 후에 resolve
          const resolveTimeout = setTimeout(() => {
            //clearTimeout(errorTimeout)
            resolve("5초 후 Resolve ")
          }, 5000)
        })
      }

      delay10Seconds()
        .then((message) => {
          console.log(message)
          onImageUploaded()
          setUploading(false)
        })
        .catch((error) => {
          console.log(error.message)
          /* 에러 모달 띄운 후 업로드 모달 닫기, 모달이 닫히는 상태 방지 */
          setError(true)
          setUploading(false)
        })
    } catch (e) {
      console.error("에러 발생")
      setError(true)
    } finally {
      // setUploading(false)
    }

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
      <Modal
        transparent
        visible={backDropShow && (isAddDialogShow || isUploading || isError)}>
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
            className="absolute z-30 w-[350px] bg-white rounded-[16px] px-[20px]">
            <View className="w-full rounded-2xl bg-white p-6 px-8">
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
                        width: progress + "%",
                      }}
                    />
                  </View>
                  <MFText className="tp-caption1-regular text-gray-400">
                    {currentUploaded} / {totalFiles}장
                  </MFText>
                </View>

                <View className="flex w-full">
                  {/* onTapCancel */}
                  <SquareButton
                    className="flex-1 mt-[20px]"
                    variant="weak"
                    size="medium"
                    theme="red">
                    <TouchableOpacity onPress={onTapCancel}>
                      <MFText
                        weight="SemiBold"
                        className="text-body2 text-red-600">
                        업로드 그만두기
                      </MFText>
                    </TouchableOpacity>
                  </SquareButton>
                </View>
              </View>
            </View>
            {/* </TouchableOpacity> */}
          </View>
        )}
        {isError && (
          <View className="absolute inset-0">
            <View className="items-center justify-center">
              <Icon name="sadMafoo" size={120} color="gray" />
              <Text className="text-lg font-bold text-gray-900">
                업로드 실패
              </Text>
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
      </Modal>
    </>
  )
}
