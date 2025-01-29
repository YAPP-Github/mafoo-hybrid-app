import React, { useEffect, useState } from "react"
import { View, Text, TextInput, ScrollView, SafeAreaView } from "react-native"
import { useDebouncedCallback } from "use-debounce"
import FriendElement from "../album/_component/add/FriendElement"
import {
  createSharedMember,
  getAlbum,
  GetSharedAlbumResponse,
  PermissionLevel,
} from "../api/photo"
import { MemberSearchResult, searchMembers } from "../api/user"
// import { SharePermissionDialog } from "./components/SharePermissionDialog"
import { Header } from "../album/_component/add/Header"
import MFText from "@/common/MFText"

const AddFriendPage = ({ route }: { route: { params: { id: string } } }) => {
  const { id } = route.params
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
    // searchMembers(query, id).then((res) => {
    //   setSearchResults(res)
    // })
  }

  const debounced = useDebouncedCallback((value: string) => {
    if (value.length < 2) {
      setSearchResults([])
      return
    }
    //  updateSearchResults(value)
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

  const onSavePermissionLevel = (level: PermissionLevel) => {
    setAddDialogVisible(false)
    if (!editingMember) return
    // createSharedMember(id, editingMember.memberId, level).then(() => {
    //   updateSearchResults(searchParam)
    // })
  }

  const initAlbum = async () => {
    const data = await getAlbum(id)
    if (data) {
      setAlbumInfo(data)
    }
  }

  useEffect(() => {
    //  initAlbum()
  }, [id])

  useEffect(() => {
    debounced(searchParam)
  }, [searchParam])

  const albumName = albumInfo?.name ?? ""

  const typeToBackgroundColor: Record<string, string> = {
    HEART: "bg-red-200",
    FIRE: "bg-yellow-200",
    BASKETBALL: "bg-green-200",
    BUILDING: "bg-blue-200",
    STARFALL: "bg-purple-200",
    SMILE_FACE: "bg-pink-200",
  }

  const typeToTextColor: Record<string, string> = {
    HEART: "text-red-700",
    FIRE: "text-yellow-700",
    BASKETBALL: "text-green-700",
    BUILDING: "text-blue-700",
    STARFALL: "text-purple-700",
    SMILE_FACE: "text-pink-700",
  }

  const backgroundColorClass = albumInfo?.type
    ? typeToBackgroundColor[albumInfo.type]
    : "bg-gray-200"
  const textColorClass = albumInfo?.type
    ? typeToTextColor[albumInfo.type]
    : "text-gray-700"

  return (
    <View className={`relative h-full w-full ${backgroundColorClass}`}>
      <SafeAreaView className={`${backgroundColorClass} pb-0`}>
        <Header />
      </SafeAreaView>
      {/*
      <SharePermissionDialog
        isOwnerMigrateVisible={false}
        defaultPermissionLevel={PermissionLevel.FULL_ACCESS}
        name={editingMember?.name ?? ""}
        imageUrl={editingMember?.profileImageUrl ?? ""}
        isVisible={addDialogVisible}
        onExit={() => setAddDialogVisible(false)}
        onTapSave={onSavePermissionLevel}
      /> */}
      <View className="flex-1 px-6 py-4">
        <MFText weight="SemiBold" className={`text-header2 text-xl `}>
          <MFText weight="SemiBold" className={textColorClass}>
            {albumName || "24 Recap"}
          </MFText>{" "}
          앨범을
        </MFText>
        <MFText weight="SemiBold" className="text-header2 text-gray-800">
          공유할 친구를 찾아봐요
        </MFText>
        <TextInput
          className="mt-4 w-full rounded-lg bg-gray-100 p-3 text-gray-800"
          value={searchParam}
          onChangeText={handleSearchParam}
          placeholder="이름으로 검색해주세요"
        />
        <ScrollView className="mt-4 flex-1">
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
    </View>
  )
}

const EmptyMafoo = () => {
  return (
    <View className="flex items-center justify-center py-6">
      <Text className="text-gray-500 text-center">
        친구가 이미 마푸에 가입한 상태여야 찾을 수 있어요!
      </Text>
    </View>
  )
}

export default AddFriendPage
