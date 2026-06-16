import { useEffect, useState } from "react";
import {
  createUrl,
  deleteUrl,
  getUrls,
} from "../../services/urlService";
import "../../styles/UrlShortener.css"
import { API_URL } from "../../config/api";

function UrlShortenerPage({ goBack }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUrls = async () => {
    try {
      const res = await getUrls();
      setUrls(res.data || []);
    } catch (err) {
      console.error("Failed to fetch URLs", err);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;
    
    setIsLoading(true);
    try {
      await createUrl({ originalUrl });
      setOriginalUrl("");
      await loadUrls();
    } catch (err) {
      console.error("Failed to create URL", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await deleteUrl(id);
        await loadUrls();
      } catch (err) {
        console.error("Failed to delete URL", err);
      }
    }
  };

  return (
    <div className="url-page-wrapper">
      <div className="url-container">
        {/* Header Actions */}
        <header className="url-header">
          <button className="btn-back" onClick={goBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Dashboard
          </button>
        </header>

        {/* Main Card */}
        <div className="main-card">
          <div className="brand-section">
            <h2>Trim Your Links</h2>
            <p>Paste your long URL below to create a clean, trackable short link.</p>
          </div>

          {/* Shortener Form */}
          <form className="shortener-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </div>
              <input
                type="url"
                placeholder="https://example.com/very-long-link-to-shorten"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? "Shortening..." : "Shorten URL"}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <h3>Your Shortened Links ({urls.length})</h3>
          
          {urls.length === 0 ? (
            <div className="empty-state">
              <p>No links shortened yet. Your history will appear here.</p>
            </div>
          ) : (
            <div className="links-grid">
              {urls.map((url) => (
                <div key={url._id} className="link-card">
                  <div className="link-details">
                    <span className="url-label">Original Link</span>
                    <p className="original-url-text" title={url.originalUrl}>
                      {url.originalUrl}
                    </p>
                    
                    <span className="url-label">Shortened Code</span>
                    <div className="short-link-row">
                      <a
                        href={`${API_URL}/api/url/${url.shortCode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="short-url-anchor"
                      >
                        {url.shortCode}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="link-stats-actions">
                    <div className="click-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      <span>{url.clicks || 0} clicks</span>
                    </div>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(url._id)}
                      title="Delete link"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UrlShortenerPage;