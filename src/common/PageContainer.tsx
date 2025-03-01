import { calculateContentStyle } from "@/utils/calculateContentStyle"

import { PropsWithChildren } from "react"
import { SafeAreaView, StatusBar } from "react-native"

interface PageBasicProps extends PropsWithChildren {
  statusBarColor?: string
  homeIndicatorColor?: string
}

type PageContainerProps = PageBasicProps

/**
 *
 * @param statusBarColor : 상태표시줄 색상. 기본값은 흰색
 * @param homeIndicatorColor : 홈 인디케이터 색상. 기본값은 흰색
 * @returns
 */
const PageContainer = ({
  statusBarColor,
  children,
  homeIndicatorColor,
}: PageContainerProps) => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: statusBarColor || "#fff" }}>
        <StatusBar
          barStyle={calculateContentStyle(statusBarColor || "#fff")}
          backgroundColor={statusBarColor || "#fff"}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{
          backgroundColor: homeIndicatorColor || "white",
        }}
        className="flex flex-1">
        {children}
      </SafeAreaView>
    </>
  )
}

export default PageContainer
