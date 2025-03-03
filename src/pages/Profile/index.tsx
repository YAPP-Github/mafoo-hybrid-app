import React from "react"
import { View, Button, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Header from "./_components/Header"
import ListItem from "./_components/ListItem"
import PageContainer from "@/common/PageContainer"
import BottomBar from "@/common/BottomBar"

const ProfilePage = ({ navigation }: any) => {
  return (
    <PageContainer statusBarColor="#FFF7E2">
      <View className="flex-1 bg-butter-100">
        <Header />
        <ListItem />
      </View>
      <BottomBar variant="profile" />
    </PageContainer>
  )
}

export default ProfilePage
