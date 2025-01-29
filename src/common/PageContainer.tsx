import { calculateContentStyle } from "@/utils/calculateContentStyle"
import React from "react"

import { PropsWithChildren } from "react"
import { SafeAreaView, StatusBar } from "react-native"

interface PageBasicProps extends PropsWithChildren {
  statusBarColor?: string
}

interface HeaderProps {
  title: string
  isPrevButton?: boolean
  isMenuButton?: boolean
}

type PageWithHeader = PageBasicProps & {
  isCustomHeader: true
  headerProps: HeaderProps
}

type PageWithoutHeader = PageBasicProps & {
  isCustomHeader: false
}

type PageContainerProps = PageWithHeader | PageWithoutHeader

/**
 *
 * @param statusBarColor : 상태표시줄 색상. 기본값은 흰색
 * @param isCustomHeader : Header 필요 여부. 기본값은 false
 * @param headerProps : isCustomHeader true일때 필요한 HeaderProps
 * @returns
 */
const PageContainer = ({
  statusBarColor,
  isCustomHeader,
  children,
}: PageContainerProps) => {
  return (
    // Set default StatusColor as white
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: statusBarColor || "#fff" }}>
      <StatusBar
        barStyle={calculateContentStyle(statusBarColor || "#fff")}
        backgroundColor={statusBarColor || "#fff"}
      />
      {/* TODO: CustomHeader 생성 후 전달 */}
      {isCustomHeader && <></>}
      {children}
    </SafeAreaView>
  )
}

export default PageContainer
