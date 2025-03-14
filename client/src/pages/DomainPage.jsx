import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertTriangle, WifiOff } from 'lucide-react';
import './DomainPage.css';

// Hardcode the API URL to ensure it's correct
const API_BASE_URL = 'http://localhost:5001';

const DomainPage = ({ domain, description, icon }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState('unknown');
  const [debugInfo, setDebugInfo] = useState('');

  // Check if the server is running
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        console.log(`Checking server status at ${API_BASE_URL}/health`);
        setDebugInfo(`Checking server at: ${API_BASE_URL}/health`);
        
        // Use XMLHttpRequest instead of fetch for better browser compatibility
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_BASE_URL}/health`, true);
        xhr.timeout = 5000; // 5 seconds timeout
        
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              console.log('Server health check successful:', data);
              setDebugInfo(prev => `${prev}\nServer response: ${JSON.stringify(data)}`);
              setServerStatus('online');
            } catch (e) {
              console.error('Error parsing response:', e);
              setDebugInfo(prev => `${prev}\nError parsing response: ${e.message}`);
              setServerStatus('error');
            }
          } else {
            console.error('Server health check failed with status:', xhr.status);
            setDebugInfo(prev => `${prev}\nServer error: ${xhr.status}`);
            setServerStatus('error');
          }
        };
        
        xhr.ontimeout = function() {
          console.error('Server health check timed out');
          setDebugInfo(prev => `${prev}\nTimeout: Request took too long`);
          setServerStatus('offline');
        };
        
        xhr.onerror = function() {
          console.error('Server health check failed with network error');
          setDebugInfo(prev => `${prev}\nNetwork error: Could not connect to server`);
          setServerStatus('offline');
        };
        
        xhr.send();
      } catch (error) {
        console.error('Server health check failed:', error);
        setDebugInfo(prev => `${prev}\nError: ${error.message}`);
        setServerStatus('offline');
      }
    };

    checkServerStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }
    
    if (serverStatus === 'offline') {
      setError('Server is offline. Please try again later.');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // Use XMLHttpRequest for the query as well
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE_URL}/api/gemini`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.timeout = 30000; // 30 seconds timeout
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            setResponse({
              answer: data.response,
              metrics: {
                responseTime: data.metrics.responseTime,
                tokenCount: data.metrics.tokenCount
              }
            });
          } catch (e) {
            setError(`Error parsing response: ${e.message}`);
          }
        } else {
          let errorMsg = `Server error: ${xhr.status}`;
          try {
            const errorData = JSON.parse(xhr.responseText);
            errorMsg = errorData.message || errorData.error || errorMsg;
          } catch (e) {
            // Ignore parsing error
          }
          setError(errorMsg);
        }
        setLoading(false);
      };
      
      xhr.ontimeout = function() {
        setError('Request timed out. The server took too long to respond.');
        setLoading(false);
      };
      
      xhr.onerror = function() {
        setError('Failed to connect to the server. Please check your network connection and make sure the server is running.');
        setServerStatus('offline');
        setLoading(false);
      };
      
      xhr.send(JSON.stringify({
        prompt: query.trim(),
        domain: domain.toLowerCase()
      }));
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to get response. Please try again later.');
      setResponse(null);
      setLoading(false);
    }
  };

  return (
    <div className="domain-page">
      <div className="domain-header">
        <div className="domain-icon">{icon}</div>
        <h1>{domain}</h1>
      </div>
      <p className="domain-description">{description}</p>

      {serverStatus === 'offline' && (
        <div className="server-status-warning">
          <div className="status-header">
            <WifiOff className="h-5 w-5 mr-2" />
            <span>Server is offline. Please check your connection or try again later.</span>
          </div>
          <div className="debug-info">
            <pre>{debugInfo}</pre>
          </div>
        </div>
      )}

      <div className="query-section">
        <h2>Ask a Query</h2>
        <form onSubmit={handleSubmit} className="query-form">
          <input
            type="text"
            placeholder={`Ask anything about ${domain}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            disabled={loading || serverStatus === 'offline'}
          />
          <button type="submit" disabled={loading || serverStatus === 'offline'}>
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                <span>Processing...</span>
              </>
            ) : (
              'Ask'
            )}
          </button>
        </form>
        
        {error && (
          <div className="error-message">
            <AlertTriangle className="h-5 w-5 inline mr-2" />
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
    </div>
  );
};

export default DomainPage; 