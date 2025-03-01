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
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
}

export const unlikeExport = async (exportId: string) => {
  try {
    const response = await authorizedFetcher.post(`/exports/${exportId}/unlike`)
    return response
  } catch (err) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
}

export const likeExport = async (exportId: string) => {
  try {
    const response = await authorizedFetcher.post(`/exports/${exportId}/like`)
    return response
  } catch (err) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
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

export const getExportNote = async (
  exportId: string
): Promise<ExportNoteType[]> => {
  try {
    const response = await authorizedFetcher.get(`/exports/${exportId}/notes`)
    return response
  } catch (err) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
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
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
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
  viewCount: number
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
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
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
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
}
