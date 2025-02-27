import { View, Text, TouchableOpacity } from "react-native"
import { styled } from "nativewind"
import Icon from "../common/Icon"
import { bottomBarVariants } from "../styles/variants"
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { colors } from "@/constants/colors"
import { RootStackParamList } from "@/types/routeParams"

interface BottomBarProps {
  variant: "album" | "scanner" | "profile"
}

const BottomBar = ({ variant }: BottomBarProps) => {
  return (
    <View className={bottomBarVariants({ variant })}>
      {variant === "album" && <Album />}
      {/* {variant === "scanner" && <Scanner />}*/}
      {variant === "profile" && <Profile />}
    </View>
  )
}

const TAB_ITEM_CLASSNAME =
  "flex h-14 w-full flex-col items-center justify-center gap-0.5"

const Button = styled(TouchableOpacity)

const Album = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const route = useRoute()

  const moveToAlbum = () => {
    navigation.navigate("Album")
  }

  const moveToMyPage = () => {
    navigation.navigate("Profile")
  }

  const isActive = (name: string) => route.name == name

  return (
    <View className="bg-white absolute flex-row left-0 bottom-0 px-[54px] pt-[20px] z-10 w-full h-[106px]">
      <View className="flex-1 mr-[32px] items-end">
        <Button
          className="rounded-lg flex-col items-center gap-[2px]"
          onPress={moveToAlbum}>
          <View className={TAB_ITEM_CLASSNAME}>
            <Icon
              name="albumBold"
              size={28}
              color={`${isActive("Album") ? "gray-800" : "gray-400"}`} // TODO: 분기처리 제거, colors constants 변경
            />
            <Text
              className={`${
                isActive("Album") ? "text-gray-800" : "text-gray-400"
              }`}>
              내 앨범
            </Text>
          </View>
        </Button>
      </View>

      <View className="w-full flex-1 ml-[32px] items-start">
        <Button
          className="rounded-lg items-center flex-col gap-[2px]"
          onPress={moveToMyPage}>
          <View className={TAB_ITEM_CLASSNAME}>
            <Icon
              name="userCircleOutline"
              size={28}
              color={`${isActive("Profile") ? "gray-800" : "gray-400"}`}
            />
            <Text
              className={`${
                isActive("Profile") ? "text-gray-800" : "text-gray-400"
              }`}>
              마이
            </Text>
          </View>
        </Button>
      </View>
    </View>
  )
}

// const Scanner = () => {
//   return (
//     <>
//       <Button className="rounded-lg">
//         <View className={TAB_ITEM_CLASSNAME}>
//           <Icon name="albumBold" size={28} color="gray-600" />
//           <Text>내 앨범</Text>
//         </View>
//       </Button>

//       <Button className="rounded-lg">
//         <View className={TAB_ITEM_CLASSNAME}>
//           <Icon name="userCircleOutline" size={28} color="gray-600" />
//           <Text>마이</Text>
//         </View>
//       </Button>
//     </>
//   )
// }

const Profile = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  return (
    <>
      <Button
        onPress={() => navigation.navigate("Album")}
        className="rounded-lg">
        <View className={TAB_ITEM_CLASSNAME}>
          <Icon name="albumBold" size={28} color={colors.gray[400]} />
          <Text>내 앨범</Text>
        </View>
      </Button>

      <Button
        onPress={() => navigation.navigate("Profile")}
        className={TAB_ITEM_CLASSNAME}
        disabled>
        <Icon name="userCircleBold" size={28} color={colors.gray[800]} />
        <Text className="text-gray-800">마이</Text>
      </Button>
    </>
  )
}

export default BottomBar
