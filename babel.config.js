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
        envName: "APP_ENV",
        moduleName: "@env",
        path: `.env.${process.env.NODE_ENV}`,
        blocklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: false,
      },
    ],
  ],
}
