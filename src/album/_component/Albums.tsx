import { StyleSheet, View } from "react-native"
import { albumList } from "../../dummy"
import DraggableAlbum from "./DraggableAlbum"

const Albums = () => {
  return (
    <View style={styles.container}>
      {albumList.map((album, index) => (
        <DraggableAlbum
          key={album.albumId + index}
          index={index}
          album={album}
          //moveAlbum={moveAlbum}
        />
      ))}
    </View>
  )
}

export default Albums

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 24,
    gap: 20,
  },
})
