import { type VariantProps } from "class-variance-authority"
import { badgeVariants } from "@/styles/variants"
import { cn } from "@/utils"
import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MFText from "@/common/MFText"

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string
  children?: React.ReactNode
}

const Badge = ({ className, variant, children, ...props }: BadgeProps) => {
  return (
    <View className={`${cn(badgeVariants({ variant }), className)}`} {...props}>
      <LinearGradient
        className="rounded-full px-[10px] py-[4px]"
        colors={["#E875F2", "#75ACFF"]}
        start={{ x: 0.0287, y: 1.0411 }}
        end={{ x: 0, y: 1.0083 }}
        useAngle={true}>
        <MFText weight="SemiBold" className="text-caption1 text-white">
          {children}
        </MFText>
      </LinearGradient>
    </View>
  )
}

export default Badge
