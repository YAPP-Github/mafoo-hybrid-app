import React, { forwardRef } from "react"
import { Pressable, Text, View, ViewStyle, TextStyle } from "react-native"
import { VariantProps } from "class-variance-authority"
import { styled } from "nativewind"

import { buttonVariants } from "@/styles/variants"
import MFText from "./MFText"

export interface SquareButtonProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean
  disabled?: boolean
  onPress?: () => void
  style?: ViewStyle | TextStyle | Array<ViewStyle | TextStyle>
  text?: string
  children?: React.ReactElement
  className?: string
}

const SquareButton = forwardRef<any, SquareButtonProps>(
  (
    {
      style,
      variant,
      size,
      theme,
      disabled,
      asChild = false,
      onPress,
      text,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const buttonStyles = buttonVariants({ variant, size, theme })
    const StyledPressable = styled(Pressable)

    // buttonStyles: inline-flex items-center ...
    return asChild ? (
      <View
        className={buttonStyles}
        style={[disabled && { backgroundColor: "#e5e5e5" }]}>
        {children}
      </View>
    ) : (
      <StyledPressable
        className={buttonStyles}
        style={[
          style,
          disabled && { backgroundColor: "#e5e5e5", color: "#a1a1a1" },
        ]}
        onPress={disabled ? undefined : onPress}
        ref={ref}
        {...props}>
        <MFText>{children}</MFText>
      </StyledPressable>
    )
  }
)

SquareButton.displayName = "SquareButton"

export default SquareButton
