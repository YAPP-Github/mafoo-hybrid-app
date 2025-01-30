import { Button, View } from "react-native"
import MFText from "@/common/MFText"
import BottomBar from "@/common/BottomBar"
import PageContainer from "@/common/PageContainer"

const ProfilePage = ({ navigation }: any) => (
  <PageContainer headerProps={{ title: "Profile" }}>
    <View className="flex-1 justify-center items-center">
      <MFText weight="SemiBold">ProfilePage</MFText>
      <Button
        title="홈으로 이동"
        onPress={() => {
          navigation.navigate("Album")
        }}
      />
    </View>
    <BottomBar variant="album" />
  </PageContainer>
)

export default ProfilePage
