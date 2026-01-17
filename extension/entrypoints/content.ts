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

    // Function to extract profile image from Polymarket page
    const getProfileImage = (): string | null => {
      try {
        // Look for common Polymarket profile image selectors
        // Try multiple selectors to find the profile picture
        const selectors = [
          // Polymarket-specific selectors
          'img[alt*="profile"]',
          'img[alt*="Profile"]',
          'img[src*="profile"]',
          'img[src*="avatar"]',
          'div[class*="avatar"] img',
          'div[class*="profile"] img',
          'div[class*="Profile"] img',
          'div[class*="Avatar"] img',
          // Look for circular images near the event title
          'img[style*="border-radius"]',
          // Common Polymarket structure - image near event header
          'header img',
          'div[class*="EventHeader"] img',
          'div[class*="event-header"] img',
          'div[class*="Event"] img',
          // Look for images in the main content area near the title
          'main img',
          'section img',
        ];

        for (const selector of selectors) {
          const images = document.querySelectorAll(selector);
          for (const img of images) {
            const imgElement = img as HTMLImageElement;
            if (imgElement && imgElement.src) {
              const style = window.getComputedStyle(imgElement);
              const width = parseInt(style.width) || imgElement.width || 0;
              const height = parseInt(style.height) || imgElement.height || 0;
              
              // Check if it's a reasonable size for a profile picture
              if (width >= 30 && width <= 300 && height >= 30 && height <= 300) {
                // Check if it's circular or square
                const borderRadius = style.borderRadius;
                const isCircular = borderRadius && (
                  borderRadius.includes('50%') || 
                  parseInt(borderRadius) >= Math.min(width, height) / 2
                );
                
                // Accept circular images or roughly square images
                if (isCircular || Math.abs(width - height) < width * 0.3) {
                  const src = imgElement.src;
                  // Make sure it's a valid image URL (not a placeholder or broken image)
                  if (src && (src.startsWith('http') || src.startsWith('data:')) && !src.includes('placeholder')) {
                    // Prefer images that are already loaded
                    if (imgElement.complete && imgElement.naturalWidth > 0) {
                      return src;
                    }
                    // Also return if not loaded yet (will load async)
                    return src;
                  }
                }
              }
            }
          }
        }

        // Fallback: look for any img element that's circular and reasonably sized
        const allImages = document.querySelectorAll('img');
        for (const img of allImages) {
          const imgElement = img as HTMLImageElement;
          if (!imgElement.src) continue;
          
          const style = window.getComputedStyle(imgElement);
          const width = parseInt(style.width) || imgElement.width || 0;
          const height = parseInt(style.height) || imgElement.height || 0;
          
          // Look for roughly square images (profile pics are usually square)
          if (width > 30 && width < 300 && height > 30 && height < 300) {
            const borderRadius = style.borderRadius;
            const isCircular = borderRadius && (
              borderRadius.includes('50%') || 
              parseInt(borderRadius) >= Math.min(width, height) / 2
            );
            
            if (isCircular || Math.abs(width - height) < 30) {
              const src = imgElement.src;
              if (src && (src.startsWith('http') || src.startsWith('data:')) && !src.includes('placeholder')) {
                return src;
              }
            }
          }
        }
      } catch (error) {
        console.error('Error extracting profile image:', error);
      }
      return null;
    };

    // Alias function for backward compatibility (used by graph nodes)
    const getMarketImageUrl = getProfileImage;

    // Listen for requests from the popup
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'getPageInfo') {
        if (window.location.pathname.startsWith('/event/')) {
          const profileImage = getProfileImage();
          sendResponse({ 
            url: window.location.href,
            userSelection: userSelection,
            profileImage: profileImage,
            marketImageUrl: profileImage // Also provide as marketImageUrl for backward compatibility
          });
        } else {
          sendResponse({ url: null, userSelection: null, profileImage: null, marketImageUrl: null });
        }
      }
      return true;
    });
  },
});
