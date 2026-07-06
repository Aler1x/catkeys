import { writeTextToClipboard } from './clipboard';
import { showToast } from './show-toast';

async function getActiveTab(): Promise<Browser.tabs.Tab | undefined> {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  return tab;
}

export async function copyActiveTabUrl(): Promise<void> {
  const tab = await getActiveTab();
  const url = tab?.url;

  if (!url) {
    return;
  }

  await writeTextToClipboard(url);

  if (tab?.id) {
    await showToast(tab.id, 'URL copied');
  }
}

export async function duplicateActiveTab(): Promise<void> {
  const tab = await getActiveTab();

  if (!tab?.id) {
    return;
  }

  await browser.tabs.duplicate(tab.id);
}
