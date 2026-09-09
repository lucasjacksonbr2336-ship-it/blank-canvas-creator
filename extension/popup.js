document.getElementById('action').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => alert('Hello from Minimal Starter Extension!'),
    });
  }
});
