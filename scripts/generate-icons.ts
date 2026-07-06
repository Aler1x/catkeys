import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import type { ReactElement } from "react";
import satori from "satori";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const iconsDir = join(root, "public", "icons");

const BASE_SIZE = 128;
const OUTPUT_SIZES = [16, 32, 48, 128] as const;

const colors = {
  paper: "#f2f0e3",
  card: "#f7f5eb",
  dark: "#2e2e2e",
  theme: "#da755b",
  coral: "#f76f53",
  border: "rgba(46, 46, 46, 0.12)",
};

const catPaths = [
  {
    d: "M19.0993 10.6602C20.2113 11.9744 19.98 13.5815 19.9801 15C19.9801 18.9062 14.7132 20 12 20C9.28677 20 4.01994 18.9062 4.01994 15C4.01995 13.5815 3.78875 11.9744 4.90066 10.6602M19.0993 10.6602C18.9048 10.4303 18.6692 10.2094 18.384 10M19.0993 10.6602C19.7993 11.0634 19.9781 9.55469 19.9801 9.0625V7.18761C19.9801 5.56261 18.8629 5.00011 17.9053 5.00011C16.9477 5.00011 15.0324 6.5625 14.394 6.5625C13.6279 6.5625 13.4804 6.40636 12 6.40636C10.5197 6.40636 10.3721 6.5625 9.60601 6.5625C8.9676 6.5625 7.05236 5 6.09476 5C5.13715 5 4.01995 5.5625 4.01995 7.1875V9.0625C4.02188 9.55469 4.20072 11.0634 4.90066 10.6602M4.90066 10.6602C5.09519 10.4303 5.33082 10.2094 5.61599 10",
    strokeLinecap: "round",
  },
  {
    d: "M12.8258 16C12.8258 16.1726 12.4647 16.3125 12.0193 16.3125C11.574 16.3125 11.2129 16.1726 11.2129 16C11.2129 15.8274 11.574 15.6875 12.0193 15.6875C12.4647 15.6875 12.8258 15.8274 12.8258 16Z",
    fill: true,
  },
  {
    d: "M15.5 13.5938C15.5 14.0252 15.2834 14.375 15.0161 14.375C14.7489 14.375 14.5323 14.0252 14.5323 13.5938C14.5323 13.1623 14.7489 12.8125 15.0161 12.8125C15.2834 12.8125 15.5 13.1623 15.5 13.5938Z",
    fill: true,
  },
  {
    d: "M9.5 13.5938C9.5 14.0252 9.28336 14.375 9.01613 14.375C8.74889 14.375 8.53226 14.0252 8.53226 13.5938C8.53226 13.1623 8.74889 12.8125 9.01613 12.8125C9.28336 12.8125 9.5 13.1623 9.5 13.5938Z",
    fill: true,
  },
  {
    d: "M22.0004 15.4688C21.5165 15.1562 19.4197 14.375 18.6133 14.375",
    strokeLinecap: "round",
  },
  {
    d: "M20.3871 17.9688C19.9033 17.6562 18.7742 16.875 17.9678 16.875",
    strokeLinecap: "round",
  },
  {
    d: "M2 15.4688C2.48387 15.1562 4.58065 14.375 5.3871 14.375",
    strokeLinecap: "round",
  },
  {
    d: "M3.61279 17.9688C4.09667 17.6562 5.2257 16.875 6.03215 16.875",
    strokeLinecap: "round",
  },
];

type SatoriElement = {
  type: string;
  props: Record<string, unknown>;
};

function catIcon(size: number): SatoriElement {
  return {
    type: "svg",
    props: {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: "none",
      children: catPaths.map((path) => ({
        type: "path",
        props: {
          d: path.d,
          fill: path.fill ? colors.dark : "none",
          stroke: colors.dark,
          strokeWidth: 1.75,
          strokeLinecap: path.strokeLinecap ?? "round",
          strokeLinejoin: "round",
        },
      })),
    },
  };
}

function createMarkup(): ReactElement {
  // Toolbar icons are scaled to a fixed slot; fill the canvas so the glyph
  // matches the visual weight of neighboring extension icons.
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
        background: 'transparent',
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
              background:
                "radial-gradient(circle at 82% 18%, rgba(247, 111, 83, 0.22), transparent 52%), radial-gradient(circle at 14% 86%, rgba(218, 117, 91, 0.14), transparent 46%)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeRadius,
              border: `2px solid ${colors.border}`,
              background: colors.card,
              boxShadow:
                "0 2px 4px rgba(46, 46, 46, 0.05), 0 8px 20px rgba(46, 46, 46, 0.08)",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    position: "absolute",
                    top: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 34,
                    height: 7,
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${colors.coral}, ${colors.theme})`,
                    opacity: 0.85,
                  },
                },
              },
              catIcon(catSize),
            ],
          },
        },
      ],
    },
  } as ReactElement;
}

async function renderPng(svg: string, size: number) {
  return new Resvg(svg, {
    fitTo: { mode: "width", value: size },
  })
    .render()
    .asPng();
}

async function main() {
  const svg = await satori(createMarkup(), {
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
