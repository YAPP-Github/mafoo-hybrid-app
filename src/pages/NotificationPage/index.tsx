import Notification, {
  NotificationProps,
} from "@/album/_component/notification"
import NotificationHeader from "@/album/_component/notification/NotificationHeader"
import PageContainer from "@/common/PageContainer"
import { View } from "react-native"
import { FlatList } from "react-native-gesture-handler"

type NotificationResponse = NotificationProps & {
  createdAt: string
}

const notifications: NotificationResponse[] = [
  {
    title: "‘단짝이랑’ 앨범에 새로운 사진이 추가됐어요!",
    body: "지금 바로 새로운 추억을 확인해보세요. 지금 바로 새로운 추억을 확인해보세요. 지금 바로 새로운 추억을 확인해보세요",
    createdAt: "방금", // TODO: 읽은 시간 계산하는 로직 추가
    notificationType: "PHOTO_ADDED",
    params: {},
    albumType: "FIRE",
    read: false,
    highlight: false,
  },
  {
    title: "‘단짝이랑’ 앨범에 새로운 사진이 추가됐어요!",
    body: "지금 바로 새로운 추억을 확인해보세요.",
    createdAt: "방금",
    notificationType: "PHOTO_ADDED",
    params: {},
    albumType: "HEART", // TODO: 아이콘 세팅
    read: true,
    highlight: false,
  },
  {
    title: "‘친구들이랑’ 앨범을 공유받았어요",
    body: "앨범 공유를 수락하시겠어요?",
    createdAt: "방금",
    notificationType: "ALBUM_ACCEPT",
    params: {},
    albumType: "FIRE",
    read: true,
    highlight: false,
  },
  {
    title: "‘농구팟’ 앨범의 리캡이 완성됐어요!",
    body: "소중한 추억을 영상으로 확인해보세요.",
    createdAt: "방금",
    notificationType: "PHOTO_ADDED",
    params: {},
    albumType: "BASKETBALL",
    read: true,
    highlight: false,
  },
]

const NotificationPage = () => {
  const onTapMenu = () => {}

  return (
    <PageContainer headerProps={{ title: "Notification" }}>
      <View className="flex-1">
        <NotificationHeader onTapMenu={onTapMenu} />
        <View className="flex-1 flex-col px-[16px] py-[12px]">
          <FlatList
            data={notifications}
            keyExtractor={(item, index) => item.createdAt + index}
            renderItem={({ item }) => <Notification {...item} />}
          />
        </View>
      </View>
    </PageContainer>
  )
}

export default NotificationPage
