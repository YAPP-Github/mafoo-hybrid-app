import { Modal, View, TouchableOpacity } from "react-native"
import SquareButton from "./SquareButton"
import MFText from "./MFText"

interface AlertProps {
  title: string
  description?: string
  onClose: () => void
}

const Alert = ({ title, description, onClose }: AlertProps) => {
  return (
    <Modal>
      <View className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
        <View className="relative flex h-[220px] w-[350px] flex-col justify-between rounded-3xl bg-sumone-white px-5 py-6">
          <View>
            <MFText className="tp-title1-semibold text-gray-800">
              {title}
            </MFText>
            {description && (
              <MFText className="tp-body1-regular mt-3 px-[6px] text-gray-600">
                {description}
              </MFText>
            )}
          </View>
          <SquareButton>
            <TouchableOpacity onPress={onClose}>
              <MFText>확인</MFText>
            </TouchableOpacity>
          </SquareButton>
        </View>
      </View>
    </Modal>
  )
}

export default Alert
