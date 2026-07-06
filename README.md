# Catkeys

Arc-style keyboard shortcuts for Chrome/Firefox.

## Shortcuts

Default shortcuts match Arc/Zen. Rebind them at `chrome://extensions/shortcuts` (Firefox: `about:addons`).

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Copy current tab URL | `⌘⇧C` | `Ctrl+Shift+C` |
| Duplicate current tab | `⌥⇧D` | `Alt+Shift+D` |

## Development

```bash
pnpm install
pnpm generate:icons   # optional: regenerate public/icons/*.png
pnpm dev
```

Load the unpacked extension from `output/chrome-mv3` in `chrome://extensions`.

```bash
pnpm build        # Chrome
pnpm build:firefox
```
