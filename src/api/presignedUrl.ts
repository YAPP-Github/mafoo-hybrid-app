import { createFetcher } from "./myfetch"

export const authorizedFetcher = createFetcher("sumone/albums")

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

export const getPresignedUrls = async (photos: File[], albumId: string) => {
  if (!albumId.length) return

  const formatedFileNames = photos.map((photo) => {
    return photo.name.split(".")[0] + ".jpeg"
  })

  const { urls } = await authorizedFetcher
    .post(
      `/${albumId}/presigned-urls`,
      JSON.stringify({
        fileNames: formatedFileNames,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.error(err)
      return
    })

  return [albumId, urls]
}
