// import { useRouter } from "next/navigation"

// import Icon from "@/common/Icon"
import React from "react"
import { cn } from "../../../utils"
import { View, Text, Pressable, TouchableOpacity } from "react-native"
import ArrowLeftIcon from "../../../assets/altArrowLeftOutline.svg"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  type?: "back"
  className?: string
}

export function Header({ type = "back", className, ...props }: HeaderProps) {
  const navigation = useNavigation()

  if (type === "back") {
    return (
      <View
        className={cn("h-14 w-full px-4 py-[14px] px-[16px]", className)}
        {...props}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon width={28} height={28} />
        </TouchableOpacity>
      </View>
    )
  }
}

// function Container({
//   className,
//   children,
// }: React.HTMLAttributes<HTMLHeadElement>) {
//   return (
//     <header className={cn("h-14 w-full px-4 py-[14px]", className)}>
//       {children}
//     </header>
//   )
// }

// function Back() {
//   const router = useRouter()

//   return (
//     <button onClick={() => router.back()}>
//       <Icon name="altArrowLeftOutline" size={28} />
//     </button>
//   )
// }
