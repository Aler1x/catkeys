import { copyActiveTabUrl, duplicateActiveTab } from '../utils/tab-actions';

export default defineBackground(() => {
  browser.commands.onCommand.addListener((command) => {
    handleCommand(command).catch((error) => {
      console.error(`[catkeys] Command "${command}" failed:`, error);
    });
  });
});

async function handleCommand(command: string): Promise<void> {
  switch (command) {
    case 'copy-url':
      await copyActiveTabUrl();
      break;
    case 'duplicate-tab':
      await duplicateActiveTab();
      break;
  }
}
