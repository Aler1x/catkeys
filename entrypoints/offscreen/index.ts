import { COPY_MESSAGE } from '../../utils/constants';

browser.runtime.onMessage.addListener((message) => {
  if (message?.type !== COPY_MESSAGE || typeof message.text !== 'string') {
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = message.text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
});
