import { create } from "zustand"

const initialDeepLinkUrl: DeepLinkUrl | {} = {}

export interface DeepLinkUrl {
  route?: string
  key?: null | string
  buttonType?: null | string
  notificationId?: string
}

export interface DeepLinkState {
  deepLinkUrl: DeepLinkUrl
}

export interface DeepLinkAction {
  setDeepLink: (deepLinkUrl: DeepLinkUrl) => void
  removeDeepLink: () => void
}

export const useDeepLinkStore = create<DeepLinkState & DeepLinkAction>(
  (set) => ({
    deepLinkUrl: initialDeepLinkUrl,
    setDeepLink: (deepLinkUrl: DeepLinkUrl) =>
      set({ deepLinkUrl: deepLinkUrl }),
    removeDeepLink: () => set({ deepLinkUrl: {} }),
  })
)
