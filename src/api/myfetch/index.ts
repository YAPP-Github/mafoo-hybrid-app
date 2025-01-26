import { API_URL } from "@env"
import axios from "axios"
import { AxiosError } from "axios"
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

const FETCHER_TIME_OUT = 7500

export const responseBody = (response: AxiosResponse) => {
  if (response instanceof AxiosError) {
    return Promise.reject(response)
  }

  return response.data
}

export const createUnauthorizedFetcher = (path: string) => {
  const instance = axios.create({
    baseURL: `${API_URL}${path}`,
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
  const instance = axios.create({
    baseURL: `${API_URL}${path}`,
    timeout: FETCHER_TIME_OUT,
  })

  instance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      const accessToken = getAccessToken()

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

      const accessToken = getAccessToken()
      const refreshToken = getRefreshToken()

      if (!res || res.status !== 401 || !accessToken || !refreshToken) {
        return Promise.reject(_err)
      }
      try {
        const reissueResponse = await axios.post(`${API_URL}/reissue`, {
          accessToken,
          refreshToken,
        })

        setAccessToken(reissueResponse.data.accessToken)
        setRefreshToken(reissueResponse.data.refreshToken)

        return instance.request(_err.config!)
      } catch (reissueErr) {
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
