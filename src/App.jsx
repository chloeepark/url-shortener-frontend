import { useState } from 'react';
import { shortenUrl } from './services/api';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!originalUrl) {
      setError('Please enter a URL!');
      return;
    }

    setLoading(true);
    setError('');
    setCopied(false);

    try {
      const data = await shortenUrl(originalUrl);
      setShortenedUrl(data.shortUrl);
    } catch (err) {
      setError(err.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleShorten();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🚀 URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter your long URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={handleShorten} style={{ marginLeft: '10px', padding: '10px' }}>
        {loading ? 'Shortening...' : 'Shorten'}
      </button>

      {shortenedUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Shortened URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
          <div>
            <button onClick={copyToClipboard} style={{ marginTop: '10px', padding: '5px 10px' }}>
              {copied ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
