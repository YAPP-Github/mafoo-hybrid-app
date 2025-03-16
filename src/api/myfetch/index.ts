import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/store/auth/util"
import Config from "react-native-config"

const FETCHER_TIME_OUT = 7500

export const responseBody = (response: AxiosResponse) => {
  if (response instanceof AxiosError) {
    return Promise.reject(response)
  }

  return response.data
}

export const createUnauthorizedFetcher = (path: string) => {
  if (__DEV__) {
    console.log("[createUnauthorizedFetcher] API_URL", Config.API_URL)
    console.log("[NODE_ENV]", Config.NODE_ENV)
  }

  const instance = axios.create({
    baseURL: `${Config.API_URL}${path}`,
    timeout: FETCHER_TIME_OUT,
  })

  return {
    get: <T>(url: string, params?: object) =>
      instance.get<T>(url, { params }).then(responseBody),
    post: <T>(url: string, body?: T, header?: object) =>
      instance.post<T>(url, body, header).then(responseBody),
    delete: <T>(url: string, body?: { data: T }) =>
      instance.delete<T>(url, body).then(responseBody),
    patch: <T>(url: string, body: T) =>
      instance.patch<T>(url, body).then(responseBody),
  }
}

export const createFetcher = (path: string) => {
  if (__DEV__) {
    console.log("[createFetcher] API_URL", Config.API_URL)
  }

  const instance = axios.create({
    baseURL: `${Config.API_URL}${path}`,
    timeout: FETCHER_TIME_OUT,
  })

  instance.interceptors.request.use(
    async function (config: InternalAxiosRequestConfig) {
      const accessToken = await getAccessToken()

      if (accessToken) {
        config.headers!.Authorization = "Bearer " + accessToken
      }

      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (res) {
      return res
    },
    async function (err: AxiosError | Error) {
      const _err = err as unknown as AxiosError
      const { response: res } = _err

      const accessToken = await getAccessToken()
      const refreshToken = await getRefreshToken()

      /** 토큰 에러가 아닐 경우 에러 전파 */
      if (!res || res.status !== 401 || !accessToken || !refreshToken) {
        return Promise.reject(_err)
      }
      try {
        const reissueResponse = await axios.post(`${Config.API_URL}/reissue`, {
          accessToken,
          refreshToken,
        })

        setAccessToken(reissueResponse.data.accessToken)
        setRefreshToken(reissueResponse.data.refreshToken)

        /** 만료 때문에 반려된 api 재요청 */
        return instance.request(_err.config!)
      } catch (reissueErr) {
        /** reissue에서 에러 발생할 경우, 토큰 제거 */
        if (reissueErr instanceof AxiosError && reissueErr.response) {
          const { status } = reissueErr.response

          if (status === StatusCodes.UNAUTHORIZED) {
            removeAccessToken()
            removeRefreshToken()

            return
          }
        }

        return Promise.reject(reissueErr)
      }
    }
  )

  return {
    get: <T>(url: string, params?: object) =>
      instance.get<T>(url, { params }).then(responseBody),
    post: <T>(url: string, body?: T, header?: object) =>
      instance
        .post<T>(url, body, header)
        .then(responseBody)
        .catch((err) => {
          return Promise.reject(err)
        }),
    delete: <T>(url: string, body?: { data: T }) =>
      instance.delete<T>(url, body).then(responseBody),
    patch: <T>(url: string, body?: T) =>
      instance.patch<T>(url, body).then(responseBody),
    put: <T>(url: string, body?: T) =>
      instance.put<T>(url, body).then(responseBody),
  }
}
