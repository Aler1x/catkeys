import { readFile } from "node:fs/promises";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import {
  asReactElement,
  backgroundGlow,
  colors,
  commandIcon,
  iconBadge,
  optionIcon,
  shiftIcon,
} from "./brand";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const screenshotsDir = join(root, "public", "screenshots");

const FONT_CANDIDATES = [
  "/System/Library/Fonts/Supplemental/Arial.ttf",
  "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
];

type SatoriElement = {
  type: string;
  props: Record<string, unknown>;
};

type KeySpec =
  | { type: "text"; label: string }
  | { type: "command" }
  | { type: "option" }
  | { type: "shift" };

type KeyCapSize = "sm" | "md";

const KEY_CAP_SIZES = {
  sm: { minWidth: 34, height: 34, icon: 15, font: 15, radius: 8, padding: "0 8px" },
  md: { minWidth: 52, height: 52, icon: 22, font: 24, radius: 12, padding: "0 14px" },
} as const;

function keyCap(spec: KeySpec, size: KeyCapSize = "md"): SatoriElement {
  const cap = KEY_CAP_SIZES[size];
  const child =
    spec.type === "text"
      ? spec.label
      : spec.type === "command"
        ? commandIcon(cap.icon)
        : spec.type === "option"
          ? optionIcon(cap.icon)
          : shiftIcon(cap.icon);

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: cap.minWidth,
        height: cap.height,
        padding: cap.padding,
        borderRadius: cap.radius,
        border: `1.5px solid ${colors.border}`,
        background: colors.card,
        color: colors.dark,
        fontSize: cap.font,
        fontWeight: 600,
        boxShadow: "0 2px 0 rgba(46, 46, 46, 0.08)",
      },
      children: child,
    },
  };
}

function shortcutRow(
  keys: KeySpec[],
  description: string,
  size: KeyCapSize = "md",
  fontSize = 28,
): SatoriElement {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        gap: size === "sm" ? 16 : 28,
        width: "100%",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: size === "sm" ? 6 : 10,
              flexShrink: 0,
            },
            children: keys.map((key) => keyCap(key, size)),
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize,
              color: colors.dark,
              fontWeight: 500,
            },
            children: description,
          },
        },
      ],
    },
  };
}

function shortcutsCard(
  size: KeyCapSize,
  options: { gap: number; padding: string; radius: number; fontSize: number },
): SatoriElement {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: options.gap,
        width: "100%",
        padding: options.padding,
        borderRadius: options.radius,
        border: `2px solid ${colors.border}`,
        background: colors.card,
        boxShadow:
          "0 2px 4px rgba(46, 46, 46, 0.05), 0 12px 32px rgba(46, 46, 46, 0.08)",
      },
      children: [
        shortcutRow(
          [{ type: "command" }, { type: "shift" }, { type: "text", label: "C" }],
          "Copy current tab URL",
          size,
          options.fontSize,
        ),
        {
          type: "div",
          props: {
            style: {
              width: "100%",
              height: 1,
              background: colors.border,
            },
          },
        },
        shortcutRow(
          [{ type: "option" }, { type: "shift" }, { type: "text", label: "D" }],
          "Duplicate current tab",
          size,
          options.fontSize,
        ),
      ],
    },
  };
}

function canvas(
  width: number,
  height: number,
  content: SatoriElement,
): SatoriElement {
  return {
    type: "div",
    props: {
      style: {
        width,
        height,
        display: "flex",
        background: colors.paper,
        position: "relative",
        overflow: "hidden",
        fontFamily: "Catkeys",
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
        content,
      ],
    },
  };
}

function titleBlock(options: {
  titleSize: number;
  subtitleSize: number;
  gap: number;
  subtitle?: string;
}): SatoriElement {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: options.gap,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              fontSize: options.titleSize,
              fontWeight: 700,
              color: colors.dark,
              letterSpacing: -1,
            },
            children: "Catkeys",
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: options.subtitleSize,
              color: colors.muted,
              fontWeight: 500,
            },
            children: options.subtitle ?? "Arc-style keyboard shortcuts for Chrome",
          },
        },
      ],
    },
  };
}

function createHeroMarkup(): SatoriElement {
  return canvas(1280, 800, {
    type: "div",
    props: {
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      },
      children: {
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 36,
            width: 920,
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                },
                children: [
                  iconBadge({
                    badgeSize: 120,
                    catSize: 90,
                    badgeRadius: 32,
                    accentWidth: 32,
                    accentHeight: 7,
                    accentTop: 12,
                  }),
                  titleBlock({ titleSize: 72, subtitleSize: 28, gap: 8 }),
                ],
              },
            },
            shortcutsCard("md", {
              gap: 20,
              padding: "32px 36px",
              radius: 24,
              fontSize: 28,
            }),
            {
              type: "div",
              props: {
                style: {
                  fontSize: 22,
                  color: colors.muted,
                  fontWeight: 500,
                  textAlign: "center",
                },
                children:
                  "Shortcuts are customizable at chrome://extensions/shortcuts",
              },
            },
          ],
        },
      },
    },
  });
}

function createSmallPromoMarkup(): SatoriElement {
  return canvas(440, 280, {
    type: "div",
    props: {
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "0 28px",
      },
      children: {
        type: "div",
        props: {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 20,
          },
          children: [
            iconBadge({
              badgeSize: 88,
              catSize: 66,
              badgeRadius: 24,
              accentWidth: 24,
              accentHeight: 5,
              accentTop: 9,
            }),
            titleBlock({
              titleSize: 40,
              subtitleSize: 15,
              gap: 6,
              subtitle: "Arc-style keyboard shortcuts",
            }),
          ],
        },
      },
    },
  });
}

function createMarqueePromoMarkup(): SatoriElement {
  return canvas(1400, 560, {
    type: "div",
    props: {
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "0 64px",
      },
      children: {
        type: "div",
        props: {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 48,
            width: "100%",
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  flexShrink: 0,
                },
                children: [
                  iconBadge({
                    badgeSize: 112,
                    catSize: 84,
                    badgeRadius: 30,
                    accentWidth: 30,
                    accentHeight: 6,
                    accentTop: 11,
                  }),
                  {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      },
                      children: [
                        titleBlock({ titleSize: 56, subtitleSize: 24, gap: 8 }),
                        {
                          type: "div",
                          props: {
                            style: {
                              fontSize: 18,
                              color: colors.muted,
                              fontWeight: 500,
                            },
                            children:
                              "Shortcuts are customizable at chrome://extensions/shortcuts",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            shortcutsCard("sm", {
              gap: 14,
              padding: "22px 28px",
              radius: 20,
              fontSize: 22,
            }),
          ],
        },
      },
    },
  });
}

const ASSETS = [
  { name: "hero-1280x800", width: 1280, height: 800, markup: createHeroMarkup },
  { name: "promo-small-440x280", width: 440, height: 280, markup: createSmallPromoMarkup },
  { name: "promo-marquee-1400x560", width: 1400, height: 560, markup: createMarqueePromoMarkup },
] as const;

async function loadFontData(): Promise<ArrayBuffer> {
  for (const path of FONT_CANDIDATES) {
    try {
      const buffer = await readFile(path);
      return buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength,
      );
    } catch {
      continue;
    }
  }

  throw new Error(
    `No usable font found. Tried:\n${FONT_CANDIDATES.map((path) => `- ${path}`).join("\n")}`,
  );
}

function fontOptions(fontData: ArrayBuffer): SatoriOptions["fonts"] {
  return [400, 500, 600, 700].map((weight) => ({
    name: "Catkeys",
    data: fontData,
    weight,
    style: "normal" as const,
  }));
}

async function renderPng(svg: string, width: number) {
  return new Resvg(svg, {
    fitTo: { mode: "width", value: width },
  })
    .render()
    .asPng();
}

async function main() {
  const fontData = await loadFontData();
  const fonts = fontOptions(fontData);

  await mkdir(screenshotsDir, { recursive: true });

  for (const asset of ASSETS) {
    const svg = await satori(asReactElement(asset.markup()), {
      width: asset.width,
      height: asset.height,
      fonts,
    });

    const outputPath = join(screenshotsDir, `${asset.name}.png`);
    const png = await renderPng(svg, asset.width);
    await writeFile(outputPath, png);
    console.log(`Generated ${outputPath} (${asset.width}x${asset.height})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
