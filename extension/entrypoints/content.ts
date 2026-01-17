export default defineContentScript({
  matches: ['*://*.polymarket.com/*'],
  main() {
    let userSelection: 'yes' | 'no' | null = null;
    let lastPopupOpenTime = 0;
    const POPUP_DEBOUNCE_MS = 500; // Prevent rapid-fire popup opens

    // Function to detect and handle Yes/No button clicks
    const setupYesNoListeners = () => {
      // Remove existing listeners to avoid duplicates
      document.removeEventListener('click', handleClick, true);
      document.addEventListener('click', handleClick, true);
    };

    const handleClick = (event: MouseEvent) => {
      if (!window.location.pathname.startsWith('/event/')) {
        return;
      }

      const target = event.target as HTMLElement;
      if (!target) return;

      // Check if clicked element or its parents contain "Yes" or "No" text
      const buttonText = target.textContent?.trim().toLowerCase() || '';
      const parentText = target.closest('button')?.textContent?.trim().toLowerCase() || '';
      
      // Look for Yes/No buttons - checking for exact matches or common patterns
      const isYesButton = buttonText === 'yes' || 
                         parentText === 'yes' ||
                         buttonText.includes('yes') && buttonText.length < 10 ||
                         target.closest('[data-testid*="yes"], [data-testid*="Yes"]') ||
                         target.closest('button')?.getAttribute('aria-label')?.toLowerCase().includes('yes');
      
      const isNoButton = buttonText === 'no' || 
                        parentText === 'no' ||
                        buttonText.includes('no') && buttonText.length < 10 ||
                        target.closest('[data-testid*="no"], [data-testid*="No"]') ||
                        target.closest('button')?.getAttribute('aria-label')?.toLowerCase().includes('no');

      // Check debounce to prevent rapid-fire opens
      const now = Date.now();
      const timeSinceLastOpen = now - lastPopupOpenTime;

      if (isYesButton && !isNoButton && timeSinceLastOpen > POPUP_DEBOUNCE_MS) {
        userSelection = 'yes';
        lastPopupOpenTime = now;
        browser.runtime.sendMessage({ 
          action: 'openPopup', 
          userSelection: 'yes' 
        });
      } else if (isNoButton && !isYesButton && timeSinceLastOpen > POPUP_DEBOUNCE_MS) {
        userSelection = 'no';
        lastPopupOpenTime = now;
        browser.runtime.sendMessage({ 
          action: 'openPopup', 
          userSelection: 'no' 
        });
      }
    };

    // Setup listeners when page loads
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupYesNoListeners);
    } else {
      setupYesNoListeners();
    }

    // Monitor URL changes for polymarket's SPA and reset state
    let lastUrl = window.location.href;
    const observer = new MutationObserver(() => {
      const currentUrl = window.location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        // Reset state on navigation
        userSelection = null;
        lastPopupOpenTime = 0;
        // Re-setup listeners for new page
        setTimeout(setupYesNoListeners, 500);
      }
    });

    observer.observe(document, { subtree: true, childList: true });

    // Also listen to popstate events (back/forward navigation)
    window.addEventListener('popstate', () => {
      userSelection = null;
      lastPopupOpenTime = 0;
      setTimeout(setupYesNoListeners, 500);
    });

    // Listen for requests from the popup
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'getPageInfo') {
        if (window.location.pathname.startsWith('/event/')) {
          sendResponse({ 
            url: window.location.href,
            userSelection: userSelection 
          });
        } else {
          sendResponse({ url: null, userSelection: null });
        }
      }
      return true;
    });
  },
});
