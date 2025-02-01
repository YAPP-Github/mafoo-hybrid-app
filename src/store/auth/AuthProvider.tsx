import React, {
  createContext,
  createRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
} from "react"

import { getAccessToken, removeAccessToken, setAccessToken } from "./util"

export interface AuthState {
  accessToken: string | undefined | null
  status: "idle" | "signOut" | "signIn"
}

type SignInAction = {
  type: "SIGN_IN"
  token: string
}

type SignOutAction = {
  type: "SIGN_OUT"
}

export type AuthAction = SignInAction | SignOutAction

type AuthPayload = string

interface AuthContextActions {
  signIn: (data: AuthPayload) => void
  signOut: () => void
}

export interface AuthContextType extends AuthState, AuthContextActions {}

const AuthContext = createContext<AuthContextType>({
  status: "idle",
  accessToken: null,
  signIn: () => {},
  signOut: () => {},
})

export const AuthRef = createRef<AuthContextActions>()

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    status: "idle",
    accessToken: null,
  })

  useEffect(() => {
    const initialState = async () => {
      try {
        const token = await getAccessToken()
        if (token !== null) {
          dispatch({ type: "SIGN_IN", token })
        } else {
          dispatch({ type: "SIGN_OUT" })
        }
      } catch (error) {
        // console.error(error)
        dispatch({ type: "SIGN_OUT" }) // error handling때 이부분 주석처리
      }
    }
    initialState()
  }, [])

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (token: string) => {
        dispatch({ type: "SIGN_IN", token })
        await setAccessToken(token)
      },
      signOut: async () => {
        await removeAccessToken()
        dispatch({ type: "SIGN_OUT" })
      },
    }),
    []
  )

  // 아래 줄으로 인해 AuthRef.current.signIn() 형태로 사용 가능
  useImperativeHandle(AuthRef, () => authActions)

  return (
    <AuthContext.Provider value={{ ...state, ...authActions }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...prevState,
        status: "signIn",
        accessToken: action.token,
      }
    case "SIGN_OUT":
      return {
        ...prevState,
        status: "signOut",
        accessToken: null,
      }
  }
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be inside an AuthProvider with a value")
  }
  return context
}

export default AuthProvider
