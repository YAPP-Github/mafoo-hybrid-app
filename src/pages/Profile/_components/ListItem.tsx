import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import Icon from "@/common/Icon"
import { LIST_ITEM_INFO } from "@/constants"
import { isExternalLink, isInternalLink } from "@/libs"
import { useAlertStore } from "@/store/alert"
import { useNavigation } from "@react-navigation/native"
import { Linking } from "react-native"

interface ItemButtonType {
  label: string
  action?: () => Promise<void> | void
  link?: string
}

export interface ListItemProps {
  items: ItemButtonType[]
}

const ListItem = () => {
  const navigation = useNavigation()
  const { showAlert } = useAlertStore()

  const handleClick = async (item: ItemButtonType) => {
    if (item.action) {
      await item.action()
    }
    if (item.link) {
      const { link } = item

      if (isExternalLink(link)) {
        Linking.openURL(link).catch(() =>
          showAlert("알림", "링크를 열 수 없습니다.")
        )
      } else if (isInternalLink(link)) {
        navigation.navigate(link as never)
      } else {
        showAlert("알림", "해당 링크는 지원하지 않습니다.")
      }
    }
  }

  return (
    <View className="flex-grow rounded-t-[32px] bg-white pt-[24px]">
      {LIST_ITEM_INFO.map(({ items }, index) => (
        <View key={`${index}`} style={{ gap: 8 }}>
          {items.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleClick(item)}
              className="w-full">
              <View className="flex h-[54px] w-full flex-row items-center justify-between pl-[32px] pr-[24px]">
                <Text className="text-gray-600 tp-body1-regular">
                  {item.label}
                </Text>
                <Icon name="arrowRight" size={24} color="gray-500" />
              </View>
            </TouchableOpacity>
          ))}

          {LIST_ITEM_INFO.length - 1 !== index && (
            <View className="h-[10px] bg-gray-50"></View>
          )}
        </View>
      ))}
    </View>
  )
}

export default ListItem
