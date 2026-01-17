import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPageInfo = async () => {
      try {
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
        if (tab.id) {
          const response = await browser.tabs.sendMessage(tab.id, { action: 'getPageInfo' });
          setPageUrl(response?.url || null);
        }
      } catch (error) {
        console.error('Error getting page info:', error);
        setPageUrl(null);
      } finally {
        setLoading(false);
      }
    };

    getPageInfo();
  }, []);

  return (
    <div style={{ padding: '20px', minWidth: '300px' }}>
      <h2>Polyindex</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pageUrl ? (
        <div>
          <p>Current page:</p>
          <a href={pageUrl} target="_blank" rel="noopener noreferrer" style={{ wordBreak: 'break-all' }}>
            {pageUrl}
          </a>
        </div>
      ) : (
        <p>Inactive</p>
      )}
    </div>
  );
}

export default App;
