import { useState } from 'react';
import { shortenUrl } from './services/api';
import './App.css';

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
    <div className="container">
      <div className="card">
        <h1 className="title">✨ URL Shortener</h1>
        <div className="input-container">
          <input
            className="url-input"
            type="text"
            placeholder="Enter your long URL here..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="shorten-button"
            onClick={handleShorten}
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>

        {shortenedUrl && (
          <div className="result">
            <p>Your shortened URL:</p>
            <a 
              href={shortenedUrl}
              className="shortened-url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenedUrl}
            </a>
            <button 
              className="copy-button"
              onClick={copyToClipboard}
            >
              {copied ? '✓ Copied!' : 'Copy URL'}
            </button>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
