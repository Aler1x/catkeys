import { defineConfig } from 'wxt';

export default defineConfig({
  outDir: 'output',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Catkeys',
    description: 'Arc-style keyboard shortcuts for Chrome: copy the current tab URL and duplicate the tab. Shortcuts are fully customizable.',
    permissions: ['tabs', 'clipboardWrite', 'offscreen', 'scripting', 'activeTab'],
    commands: {
      'copy-url': {
        suggested_key: {
          default: 'Ctrl+Shift+C',
          mac: 'Command+Shift+C',
        },
        description: 'Copy the current tab URL',
      },
      'duplicate-tab': {
        suggested_key: {
          default: 'Alt+Shift+D',
        },
        description: 'Duplicate the current tab',
      },
    },
  },
});
