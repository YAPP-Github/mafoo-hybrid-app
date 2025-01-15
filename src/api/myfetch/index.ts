import { getToken } from "../../store/auth/util"
import axios from "axios"

export const mafooInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
})
