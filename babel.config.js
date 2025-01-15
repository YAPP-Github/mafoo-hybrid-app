module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "nativewind/babel",
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        cwd: "babelrc",
        extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
        alias: {
          "@": "./src",
        },
      },
    ],
    "jest-hoist",
  ],
}
