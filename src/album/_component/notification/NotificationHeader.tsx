import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, View } from "react-native"

interface NotificationHeaderProps {
  onTapMenu: () => void
}
const NotificationHeader = ({ onTapMenu }: NotificationHeaderProps) => {
  const navigation = useNavigation()

  return (
    <View className="flex-row items-center justify-between px-[16px] py-[14px] h-[56px] bg-white">
      <TouchableOpacity onPress={() => navigation.goBack()} className="p-[8px]">
        <Icon name="altArrowLeftOutline" size={28} />
      </TouchableOpacity>
      <View>
        <MFText weight="SemiBold" className="text-title2">
          알림함
        </MFText>
      </View>
      <TouchableOpacity onPress={onTapMenu} className="p-[8px]">
        <Icon name="hamburger" size={28} />
      </TouchableOpacity>
    </View>
  )
}

export default NotificationHeader
