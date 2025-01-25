const fs = require("fs")
const path = require("path")

const assetsDir = path.join(__dirname, "../src/assets")
const outputPath = path.join(__dirname, "../src/common/iconMap.ts")

const iconFiles = fs
  .readdirSync(assetsDir)
  .filter((file) => file.endsWith(".svg"))

iconFiles.forEach((file) => {
  const filePath = path.join(assetsDir, file)
  let svgContent = fs.readFileSync(filePath, "utf-8")

  // Replace fill="none" with fill="currentColor"
  svgContent = svgContent.replace(/fill="none"/g, 'fill="currentColor"')

  // Replace stroke="none" with stroke="currentColor"
  svgContent = svgContent.replace(/stroke="none"/g, 'stroke="currentColor"')

  // Write the updated SVG content back to the file
  fs.writeFileSync(filePath, svgContent, "utf-8")
})

const iconMap = iconFiles.map((file) => {
  const name = path.basename(file, ".svg")
  return `  ${name}: require("../assets/${file}"),`
})

const output = `import { IconTypes } from "./Icon";

const iconMap: Record<IconTypes, any> = {
${iconMap.join("\n")}
};

export default iconMap;
`

fs.writeFileSync(outputPath, output)
console.log("iconMap.ts generated and SVG files updated!")
