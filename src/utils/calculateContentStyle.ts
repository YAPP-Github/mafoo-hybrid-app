import { getContrastRatio } from "a11y-contrast-color"
type RGB = [number, number, number]

/**
 *
 * @param color as hex string
 * @returns 'dark-content' or 'light-content' based on the bigger contrast
 */
export const calculateContentStyle = (color: string) => {
  const BLACK = [0, 0, 0] as RGB
  const WHITE = [255, 255, 255] as RGB

  if (
    getContrastRatio(hexToRgb(color), BLACK) >
    getContrastRatio(hexToRgb(color), WHITE)
  ) {
    return "dark-content"
  } else {
    return "light-content"
  }
}

const hexToRgb = (hex: string) => {
  if (hex.length === 4) {
    const [r, g, b] = hex
      .substring(1)
      .split("")
      .map((s) => parseInt(s + s, 16))
    return [r, g, b] as RGB
  }
  const hexValue = hex.replace("#", "")
  const r = parseInt(hexValue.substring(0, 2), 16)
  const g = parseInt(hexValue.substring(2, 4), 16)
  const b = parseInt(hexValue.substring(4, 6), 16)
  return [r, g, b] as RGB
}
