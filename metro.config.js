const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")

const defaultConfig = getDefaultConfig(__dirname)

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname)

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: [...assetExts.filter((ext) => ext !== "svg"), "mp4"],
    sourceExts: [...sourceExts, "svg", "env"], // 환경 변수 파일도 번들에 추가
  },
}

module.exports = mergeConfig(defaultConfig, config)
