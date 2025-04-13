import { StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import DraggableAlbum from "./DraggableAlbum"
import { useGetAlbums } from "@/hooks/usePhoto"

const Albums = () => {
  const { albums, isError, error } = useGetAlbums()

  if (isError) {
    return <Text>앨범 불러오는 중 에러 발생 {JSON.stringify(error)}</Text>
  }

  return (
    <View style={styles.container}>
      {albums?.length ? (
        <FlatList
          data={albums ?? []}
          keyExtractor={(item, index) => item?.albumId + index}
          renderItem={({ item, index }) => (
            <DraggableAlbum
              key={item?.albumId + index}
              index={index}
              album={item}
              showNewRing={true}
              // moveAlbum={moveAlbum}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      ) : (
        <Text>앨범이 없습니다</Text>
      )}
    </View>
  )
}

export default Albums

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 24,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
})
