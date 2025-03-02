import { PhotoInfo } from "@/album/types"
import { Asset } from "react-native-image-picker"
import { create } from "zustand"

export interface PhotoStore<T extends Asset | PhotoInfo> {
  photos: T[]
  setPhotos: (phots: T[]) => void
  getSinglePhoto: () => T | null
}

export const usePhotoInfoStore = create<PhotoStore<PhotoInfo>>((set, get) => ({
  photos: [] as PhotoInfo[],
  setPhotos: (photos: PhotoInfo[]) => set({ photos }),
  getSinglePhoto: () => get().photos[0],
}))
