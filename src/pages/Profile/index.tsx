import React from "react"
import { View, Button, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Header from "./_components/Header"
import ListItem from "./_components/ListItem"
import PageContainer from "@/common/PageContainer"
import BottomBar from "@/common/BottomBar"

const ProfilePage = ({ navigation }: any) => {
  return (
    <PageContainer isCustomHeader={false} statusBarColor="#FFF7E2">
      <Header />
      <ListItem />
      <BottomBar variant="profile" />
    </PageContainer>
  )
}

export default ProfilePage
