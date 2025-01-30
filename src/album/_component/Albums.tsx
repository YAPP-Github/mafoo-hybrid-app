import { StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { albumList } from "@/dummy"
import DraggableAlbum from "./DraggableAlbum"
// import { useGetAlbums } from "@/hooks/usePhoto"

const Albums = () => {
  //const { albums } = useGetAlbums()

  return (
    <View style={styles.container}>
      {/* FlatList: 화면에 보이는 데이터만 렌더링 */}
      <FlatList
        data={albumList}
        keyExtractor={(item, index) => item.albumId + index}
        renderItem={({ item, index }) => (
          <DraggableAlbum
            key={item.albumId + index}
            index={index}
            album={item}
            // moveAlbum={moveAlbum}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
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
