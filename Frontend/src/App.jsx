import { useState } from "react";
import axios from 'axios';

export default function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  
  const handleSubmit = () => {
    console.log('Original URL:', originalUrl);
    axios.post('http://localhost:3000/api/short', { originalUrl })
      .then((res) => {
        console.log('Full Response:', res.data);
        console.log('Short URL:', res.data.url.shortUrl);
        setShortUrl(res.data.url.shortUrl);
      })
      .catch((err) => {
        console.log('Error:', err);
        console.log('Error Response:', err.response);
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  };
  
  return (
    <>
    <style>{`
      body, html, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
    `}</style>
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      margin: '0',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        padding: '48px',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#2563eb',
          textAlign: 'center',
          marginBottom: '32px',
          marginTop: '0'
        }}>
          URL Shortener
        </h1>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}>
          <input
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            type="text"
            name="originalUrl"
            id="originalUrl"
            placeholder="Enter URL to shorten"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              color: '#374151',
              backgroundColor: '#ffffff',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#60a5fa';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          
          <button
            onClick={handleSubmit}
            type="button"
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Shorten
          </button>

          {shortUrl && (
            <div style={{
              marginTop: '8px',
              padding: '16px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ 
                  margin: '0 0 4px 0', 
                  fontSize: '12px', 
                  color: '#166534',
                  fontWeight: '500'
                }}>
                  Shortened URL:
                </p>
                <a 
                  href={shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    wordBreak: 'break-all',
                    fontSize: '14px'
                  }}
                >
                  {shortUrl}
                </a>
              </div>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}