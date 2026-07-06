import { COPY_MESSAGE, OFFSCREEN_PATH } from './constants';

let creatingOffscreen: Promise<void> | undefined;

async function setupOffscreenDocument(): Promise<void> {
  const offscreenUrl = browser.runtime.getURL(OFFSCREEN_PATH);
  const existingContexts = await browser.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [offscreenUrl],
  });

  if (existingContexts.length > 0) {
    return;
  }

  if (creatingOffscreen) {
    await creatingOffscreen;
    return;
  }

  creatingOffscreen = browser.offscreen.createDocument({
    url: OFFSCREEN_PATH,
    reasons: ['CLIPBOARD'],
    justification: 'Copy tab URLs to the clipboard from keyboard shortcuts.',
  });

  try {
    await creatingOffscreen;
  } finally {
    creatingOffscreen = undefined;
  }
}

async function writeViaOffscreen(text: string): Promise<void> {
  await setupOffscreenDocument();
  await browser.runtime.sendMessage({ type: COPY_MESSAGE, text });
}

async function writeViaActiveTab(text: string): Promise<void> {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id) {
    throw new Error('No active tab');
  }

  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: (value: string) => {
      void navigator.clipboard.writeText(value);
    },
    args: [text],
  });
}

export async function writeTextToClipboard(text: string): Promise<void> {
  if (browser.offscreen) {
    await writeViaOffscreen(text);
    return;
  }

  await writeViaActiveTab(text);
}
