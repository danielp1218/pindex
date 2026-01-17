export default defineBackground(() => {
  browser.runtime.onMessage.addListener(async (message, sender) => {
    if (message.action === 'openPopup') {
      await browser.action.openPopup();
    }
  });
});
