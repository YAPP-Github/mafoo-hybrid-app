import { Asset } from "react-native-image-picker"
import { createFetcher } from "./myfetch"
import { PhotoInfo } from "@/album/types"

export const authorizedFetcher = createFetcher("photo/v1/object-storage")

export const postOriginalPhoto = async (
  photos: File[],
  albumIdFromCookie: string
) => {
  try {
    /** ************************** 1.Get Presigned Urls ************************** */
    console.log("postOriginlaPhoto", photos, albumIdFromCookie)
    const presignedResult = await getPresignedUrls(photos, albumIdFromCookie)
    //❗[Exception 500] Get Presigned Urls Failed
    if (!presignedResult) {
      return new Response(
        JSON.stringify({ message: "Failed to get presigned URLs" }),
        { status: 500 }
      )
    }

    /** **************************** 2.Upload Files **************************** */

    const [albumId, urls] = presignedResult as [string, string[]]

    const uploadPromises = photos.map((photo, index) => {
      const presignedUrl = urls[index]

      return authorizedFetcher
        .put(presignedUrl, photo)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to upload ${photo.name}`)
          }
          return res
        })
        .catch((err: Error) => {
          throw new Error(`Failed to upload ${photo.name}: ${err.message}`)
        })
    })

    await Promise.all(uploadPromises)

    /** ************** 3.Extract Urls without query strings ************** */

    const newUrls = urls.map((url) => url.split("?")[0])

    /** *************************** 4.Post to Album *************************** */

    const res = await authorizedFetcher
      .post(
        `/albums/${albumId}/photos`,
        JSON.stringify({
          fileUrls: newUrls,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.json())
      .catch((err: Error) => {
        throw new Error(`Error while calling albums API: ${err.message}`)
      })

    const data = res as { photoUrl: string }[]
    const photoUrls = data.map((d) => d.photoUrl)

    /** *************************** 5.Final Respond *************************** */

    return new Response(JSON.stringify({ photoUrls }), { status: 200 })
  } catch (err) {
    //❗[Exception 500] Unknown Error
    return new Response(
      JSON.stringify({ message: `Internal Server Error: ${err}` }),
      { status: 500 }
    )
  }
}

// Recap Frame 사용
export const getPresignedUrls = async (
  photos: PhotoInfo[],
  albumId: string
) => {
  if (!albumId.length) return

  const formatedFileNames = photos.map((photo) => {
    return photo.photoUrl
  })

  console.log("formatedFileNames", albumId, formatedFileNames)

  const { urls } = await authorizedFetcher
    .post(
      `/recap`,
      {
        fileCount: photos.length,
        albumId: albumId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log("getPresinedUrl res", res)
      return res
    })
    .catch((err) => {
      console.error(err)
      return
    })

  return [albumId, urls]
}
