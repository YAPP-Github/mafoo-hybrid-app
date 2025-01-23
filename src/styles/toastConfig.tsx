import { View, ViewProps } from "react-native"
import Icon, { IconProps } from "@/common/Icon"
import MFText from "@/common/MFText"
import { ToastConfigParams } from "react-native-toast-message"

export interface MyToastProps {
  props: ViewProps
  type: "success" | "error"
  children: React.ReactNode
}

const typeMap: { [key in MyToastProps["type"]]: IconProps } = {
  error: {
    name: "closeCircleBold",
    size: 24,
    color: "#F56965",
  },
  success: {
    name: "checkCircleBold",
    size: 24,
    color: "#2D3541",
  },
}

const MyToast = ({ props, type, children }: MyToastProps) => {
  return (
    <View
      {...props}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 100,
          backgroundColor: "white",
          gap: 4,
          // box shadow for iOS
          shadowColor: "rgba(101, 125, 159, 1)",
          shadowOffset: { width: 0, height: 16 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          // box shadow for Android
          elevation: 8,
        },
        props.style,
      ]}>
      <Icon {...typeMap[type]} />
      <MFText weight="SemiBold" className="text-body1">
        {children}
      </MFText>
    </View>
  )
}

export const toastConfig = {
  // custom success type
  // ex. 갤러리에서 사진 추가
  successToast: ({ text1, props }: ToastConfigParams<ViewProps>) => (
    <MyToast type="success" props={props}>
      {text1}
    </MyToast>
  ),
  // ex. 업로드 중단
  errorToast: ({ text1, props }: ToastConfigParams<ViewProps>) => (
    <MyToast type="error" props={props}>
      {text1}
    </MyToast>
  ),
}
