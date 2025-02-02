import { Platform, TouchableOpacity, View } from "react-native"
import { AlbumType } from "@/album/types"
import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import { recapColorLinearGradient } from "@/styles/variants"
import LinearGradient from "react-native-linear-gradient"

interface CreateRecapButtonType {
  type: AlbumType
  onPress: () => void
  children: React.ReactNode
}

const CreateRecapButton = ({
  type,
  onPress,
  children,
}: CreateRecapButtonType) => {
  return (
    <>
      <LinearGradient
        className="rounded-[100px]"
        {...recapColorLinearGradient[type ?? "HEART"]}>
        <TouchableOpacity
          className={"rounded-[100px] px-[16px] py-[8px]"}
          onPress={onPress}>
          <View className="flex-row gap-1 items-center">
            <Icon name="clapperBoardPlay" size={20} color="white" />
            <MFText weight="SemiBold" className="text-body2 text-sumone-white">
              {children}
            </MFText>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </>
  )
}

export { CreateRecapButton }
