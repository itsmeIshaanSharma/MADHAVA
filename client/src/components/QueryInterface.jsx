import React, { useState } from 'react';
import './QueryInterface.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const QueryInterface = ({ domain }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/gemini`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: query.trim(),
          domain: domain.toLowerCase()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setResponse({
        answer: data.response,
        metrics: {
          responseTime: data.metrics.responseTime,
          tokenCount: data.metrics.tokenCount
        }
      });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to get response. Please try again later.');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-interface">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask anything about ${domain}...`}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Ask'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {response && (
        <div className="response-section">
          <div className="answer">
            <h3>Answer:</h3>
            <p>{response.answer}</p>
          </div>

          {response.metrics && (
            <div className="metrics">
              <h3>Metrics:</h3>
              <div className="metrics-grid">
                <div className="metric-item">
                  <span className="metric-label">Response Time:</span>
                  <span className="metric-value">{response.metrics.responseTime}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Token Count:</span>
                  <span className="metric-value">{response.metrics.tokenCount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QueryInterface; 