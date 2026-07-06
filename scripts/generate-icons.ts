import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import {
  asReactElement,
  backgroundGlow,
  colors,
  iconBadge,
} from "./brand";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const iconsDir = join(root, "public", "icons");

const BASE_SIZE = 128;
const OUTPUT_SIZES = [16, 32, 48, 128] as const;

function createMarkup() {
  const badgeSize = 128;
  const catSize = 96;
  const badgeRadius = 33;

  return {
    type: "div",
    props: {
      style: {
        width: BASE_SIZE,
        height: BASE_SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "transparent",
        overflow: "hidden",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              inset: 0,
              display: "flex",
              ...backgroundGlow,
            },
          },
        },
        iconBadge({
          badgeSize,
          catSize,
          badgeRadius,
          accentWidth: 34,
          accentHeight: 7,
          accentTop: 12,
        }),
      ],
    },
  };
}

async function renderPng(svg: string, size: number) {
  return new Resvg(svg, {
    fitTo: { mode: "width", value: size },
  })
    .render()
    .asPng();
}

async function main() {
  const svg = await satori(asReactElement(createMarkup()), {
    width: BASE_SIZE,
    height: BASE_SIZE,
    fonts: [],
  });

  await mkdir(iconsDir, { recursive: true });

  for (const size of OUTPUT_SIZES) {
    const png = await renderPng(svg, size);
    const outputPath = join(iconsDir, `${size}.png`);
    await writeFile(outputPath, png);
    console.log(`Generated ${outputPath} (${size}x${size})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
