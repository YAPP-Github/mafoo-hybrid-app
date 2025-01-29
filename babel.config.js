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
          "^@/(.+)": "./src/\\1",
        },
      },
    ],
    "jest-hoist",
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env.local",
        blocklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
}
