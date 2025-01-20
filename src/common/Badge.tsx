import { View, ViewProps } from "react-native"
import { styled } from "nativewind"

type VariantProps<T> = T extends (props: infer P) => any ? P : never

const badgeVariants = ({ variant }: { variant?: string }) => {
  switch (variant) {
    case "primary":
      return "bg-blue-500 text-white px-3 py-1 rounded-lg"
    case "secondary":
      return "bg-gray-300 text-black px-3 py-1 rounded-lg"
    default:
      return "bg-gray-100 text-gray-800 px-3 py-1 rounded-lg"
  }
}

export interface BadgeProps extends ViewProps {
  variant?: "primary" | "secondary" | "default"
  className?: string
}

const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  ...props
}) => {
  const classes = `${badgeVariants({ variant })} ${className || ""}`
  const StyledView = styled(View)

  return <StyledView className={classes} {...props} />
}

export default Badge
