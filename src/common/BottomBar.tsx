import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { styled } from "nativewind"
import Icon from "../common/Icon"
import { bottomBarVariants } from "../styles/variants"
import { useNavigation } from "@react-navigation/native"
import { colors } from "@/constants/colors"

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
  "flex h-14 w-14 flex-col items-center justify-center gap-0.5"

const Button = styled(TouchableOpacity)

const Album = () => {
  const navigation = useNavigation()
  return (
    <>
      <Button
        onPress={() => navigation.navigate("album")}
        className={TAB_ITEM_CLASSNAME}
        disabled>
        <Icon name="albumBold" size={28} color={colors.gray[800]} />
        <Text className="text-gray-800">내 앨범</Text>
      </Button>

      <Button
        onPress={() => navigation.navigate("profile")}
        className="rounded-lg">
        <View className={TAB_ITEM_CLASSNAME}>
          <Icon name="userCircleOutline" size={28} color={colors.gray[400]} />
          <Text>마이</Text>
        </View>
      </Button>
    </>
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
  const navigation = useNavigation()
  return (
    <>
      <Button
        onPress={() => navigation.navigate("album")}
        className="rounded-lg">
        <View className={TAB_ITEM_CLASSNAME}>
          <Icon name="albumBold" size={28} color={colors.gray[400]} />
          <Text>내 앨범</Text>
        </View>
      </Button>

      <Button
        onPress={() => navigation.navigate("profile")}
        className={TAB_ITEM_CLASSNAME}
        disabled>
        <Icon name="userCircleBold" size={28} color={colors.gray[800]} />
        <Text className="text-gray-800">마이</Text>
      </Button>
    </>
  )
}

export default BottomBar
