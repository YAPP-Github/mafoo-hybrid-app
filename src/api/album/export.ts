import { AlbumType, PhotoInfo } from "@/album/types"
import { createFetcher } from "../myfetch"
import { MemberSearchResult } from "../user"

const authorizedFetcher = createFetcher("photo/v1")

interface createExportResponse {
  exportId: string
  albumId: string
}

export const createExport = async (
  albumId: string
): Promise<createExportResponse> => {
  try {
    const response = await authorizedFetcher.post("/exports", {
      albumId,
    })
    return response
  } catch (err) {
    throw err.response.data
  }
}

export const unlikeExport = async (exportId: string) => {
  try {
    const response = await authorizedFetcher.post(`/exports/${exportId}/unlike`)
    return response
  } catch (err) {
    throw err
  }
}

export const likeExport = async (exportId: string) => {
  try {
    const response = await authorizedFetcher.post(`/exports/${exportId}/like`)
    return response
  } catch (err) {
    throw err
  }
}

export interface ExportNoteType {
  type: AlbumType
  nickname: string
  content: string
}

interface createExportNoteResponse extends ExportNoteType {
  noteId: string
  exportId: string
}

export const createExportNote = async (
  exportId: string,
  note: ExportNoteType
): Promise<createExportNoteResponse> => {
  try {
    const response = await authorizedFetcher.post(
      `/exports/${exportId}/notes`,
      note
    )
    return response
  } catch (err) {
    throw err
  }
}

export interface ExportAlbumType {
  exportId: string
  name: string
  type: AlbumType
  photoCount: number
  ownerMemberId: string
  ownerName: string
  ownerProfileImageUrl: string
  ownerSerialNumber: string
  likeCount: number
  noteCount: number
  isMeLiked: boolean
  sharedMembers: MemberSearchResult[]
}

export const getExportAlbumData = async (
  exportId: string
): Promise<ExportAlbumType> => {
  try {
    const response = await authorizedFetcher.get(`/exports/${exportId}/album`)
    return response
  } catch (err) {
    throw err
  }
}

export const getExportAlbumPhotos = async (
  exportId: string
): Promise<PhotoInfo[]> => {
  try {
    const response = await authorizedFetcher.get(
      `/exports/${exportId}/album/photos`
    )
    return response
  } catch (err) {
    throw err
  }
}
