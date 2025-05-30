import { useState } from 'react';
import { shortenUrl } from './services/api';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
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
      const shortId = data.shortUrl.split('/').pop();
      setShortUrl({
        shortUrl: data.shortUrl,
        displayUrl: shortId  // shortId만 저장
      });
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

        {shortUrl && (
          <div className="result">
            <p>Your shortened URL:</p>
            <a 
              href={shortUrl.shortUrl}  // 실제 리다이렉트용 전체 URL 사용
              className="shortened-url" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {shortUrl.displayUrl}  // shortId만 표시
            </a>
            <button 
              className="copy-button"
              onClick={() => {
                navigator.clipboard.writeText(shortUrl.shortUrl);  // 복사할 때는 전체 URL 사용
                setCopied(true);
              }}
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
