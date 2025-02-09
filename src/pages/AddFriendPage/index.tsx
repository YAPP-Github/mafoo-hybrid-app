import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native"
import { useDebouncedCallback } from "use-debounce"
import FriendElement from "../../album/_component/add/FriendElement"
import {
  createSharedMember,
  getAlbum,
  GetSharedAlbumResponse,
  PermissionLevel,
} from "../../api/photo"
import { MemberSearchResult, searchMembers } from "../../api/user"
// import { SharePermissionDialog } from "./components/SharePermissionDialog"
import { Header } from "../../album/_component/add/Header"
import MFText from "@/common/MFText"
import { colors } from "@/constants/colors"
import PageContainer from "@/common/PageContainer"
import Icon from "@/common/Icon"
import SharePermissionDialog from "@/common/SharePermissionDialog"

const AddFriendPage = ({
  route,
}: {
  route: { params: { albumId: string } }
}) => {
  const { albumId: id } = route.params
  const [albumInfo, setAlbumInfo] = useState<GetSharedAlbumResponse | null>(
    null
  )
  const [searchParam, setSearchParam] = useState("")
  const [addDialogVisible, setAddDialogVisible] = useState(false)
  const [editingMember, setEditingMember] = useState<MemberSearchResult | null>(
    null
  )
  const [searchResults, setSearchResults] = useState<MemberSearchResult[]>([])

  const updateSearchResults = (query: string) => {
    searchMembers(query, id).then((res) => {
      setSearchResults(res)
    })
  }

  const debounced = useDebouncedCallback((value: string) => {
    if (value.length < 2) {
      setSearchResults([])
      return
    }
    updateSearchResults(value)
  }, 300)

  const handleSearchParam = (value: string) => {
    setSearchParam(value)
  }

  const onTapShareButton = (friend: MemberSearchResult) => {
    if (!friend.shareStatus) {
      setEditingMember(friend)
      setAddDialogVisible(true)
    }
  }

  const onSavePermissionLevel = async (level: PermissionLevel) => {
    setAddDialogVisible(false)
    if (!editingMember) {
      return
    }
    await createSharedMember(id, editingMember.memberId, level).then(() => {
      updateSearchResults(searchParam)
    })
  }

  const initAlbum = async () => {
    const data = await getAlbum(id)
    if (data) {
      setAlbumInfo(data)
    }
  }

  useEffect(() => {
    initAlbum()
  }, [id])

  useEffect(() => {
    debounced(searchParam)
  }, [searchParam])

  if (!albumInfo) {
    return
  }

  const albumName = albumInfo?.name ?? ""

  const typeToTextColor: Record<string, string> = {
    HEART: "text-red-700",
    FIRE: "text-yellow-700",
    BASKETBALL: "text-green-700",
    BUILDING: "text-blue-700",
    STARFALL: "text-purple-700",
    SMILE_FACE: "text-pink-700",
  }

  const typeToBackgroundColor: Record<string, string> = {
    HEART: colors.red[200],
    FIRE: colors.butter[200],
    BASKETBALL: colors.green[200],
    BUILDING: colors["sky-blue"][200],
    STARFALL: colors.purple[200],
    SMILE_FACE: colors.pink[200],
  }

  const typeToBorderColor: Record<string, string> = {
    HEART: colors.red[600],
    FIRE: colors.butter[600],
    BASKETBALL: colors.green[600],
    BUILDING: colors["sky-blue"][600],
    STARFALL: colors.purple[600],
    SMILE_FACE: colors.pink[600],
  }

  const backgroundColorClass = albumInfo?.type
    ? typeToBackgroundColor[albumInfo.type]
    : colors.gray[200]

  const textColorClass = albumInfo?.type
    ? typeToTextColor[albumInfo.type]
    : "text-gray-700"

  const borderColorClass = albumInfo?.type
    ? typeToBorderColor[albumInfo.type]
    : colors.gray[600]

  return (
    <PageContainer isCustomHeader={false} statusBarColor={backgroundColorClass}>
      <Header />

      <SharePermissionDialog
        isOwnerMigrateVisible={false}
        defaultPermissionLevel={PermissionLevel.FULL_ACCESS}
        name={editingMember?.name ?? ""}
        imageUrl={editingMember?.profileImageUrl ?? ""}
        isVisible={addDialogVisible}
        onExit={() => setAddDialogVisible(false)}
        onTapSave={onSavePermissionLevel}
        radioColor={borderColorClass}
      />
      <View className="flex-1 px-6 py-4">
        <MFText weight="SemiBold" className="text-xl text-header2">
          <MFText weight="SemiBold" className={textColorClass}>
            {albumName || "24 Recap"}
          </MFText>{" "}
          앨범을
        </MFText>
        <MFText weight="SemiBold" className="text-gray-800 text-header2">
          공유할 친구를 찾아봐요
        </MFText>
        <TextInput
          className="w-full px-4 py-3 mt-4 font-semibold text-gray-800 bg-gray-100 rounded-lg text-title2"
          value={searchParam}
          onChangeText={handleSearchParam}
          placeholder="이름으로 검색해주세요"
        />
        <ScrollView className="flex-1 mt-4">
          {searchResults.length === 0 ? (
            <EmptyMafoo />
          ) : (
            searchResults.map((friend) => (
              <FriendElement
                key={friend.memberId}
                imageUrl={friend.profileImageUrl}
                name={friend.name}
                tag={`#${friend.serialNumber}`}
                isShared={friend.shareStatus != null}
                onTapShare={() => onTapShareButton(friend)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </PageContainer>
  )
}

const EmptyMafoo = () => {
  return (
    <View className="flex items-center justify-center gap-4 py-6">
      <Icon name="mafooCharacter1" size={100} />
      <MFText weight="Regular" className="text-center text-gray-500 text-body2">
        {"친구가 이미 마푸에 가입한\n상태여야 찾을 수 있어요!"}
      </MFText>
      <Pressable className="px-3 py-2 bg-white rounded-lg">
        <MFText weight="SemiBold" className="text-purple-700 text-body2">
          마푸 초대하기
        </MFText>
      </Pressable>
    </View>
  )
}

export default AddFriendPage
