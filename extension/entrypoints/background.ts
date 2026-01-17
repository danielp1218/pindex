export default defineBackground(() => {
  browser.runtime.onMessage.addListener(async (message, sender) => {
    if (message.action === 'openPopup') {
      // Store the user selection in storage so popup can access it
      if (message.userSelection) {
        await browser.storage.local.set({ 
          lastUserSelection: message.userSelection,
          selectionTimestamp: Date.now()
        });
      }
      await browser.action.openPopup();
    }
  });
});
