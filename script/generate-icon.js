const fs = require("fs")
const path = require("path")

const assetsDir = path.join(__dirname, "../src/assets")
const outputPath = path.join(__dirname, "../src/common/iconMap.ts")

const iconFiles = fs
  .readdirSync(assetsDir)
  .filter((file) => file.endsWith(".svg"))

const iconMap = iconFiles.map((file) => {
  const name = path.basename(file, ".svg")
  return `  ${name}: require("../assets/${file}"),`
})

const output = `import { IconTypes } from "./Icon"

const iconMap: Record<IconTypes, any> = {
${iconMap.join("\n")}
}

export default iconMap
`

fs.writeFileSync(outputPath, output)
console.log("iconMap.ts generated!")
