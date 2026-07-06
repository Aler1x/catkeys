export async function showToast(tabId: number, message: string): Promise<void> {
  try {
    await browser.scripting.executeScript({
      target: { tabId },
      func: (text: string) => {
        const id = 'catkeys-toast';
        document.getElementById(id)?.remove();

        const toast = document.createElement('div');
        toast.id = id;
        toast.textContent = text;
        Object.assign(toast.style, {
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 16px',
          borderRadius: '8px',
          background: 'rgba(0, 0, 0, 0.85)',
          color: '#fff',
          font: '13px system-ui, sans-serif',
          zIndex: '2147483647',
          pointerEvents: 'none',
          opacity: '0',
          transition: 'opacity 150ms ease',
        });

        document.body.appendChild(toast);
        requestAnimationFrame(() => {
          toast.style.opacity = '1';
        });

        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 150);
        }, 2000);
      },
      args: [message],
    });
  } catch {}
}
