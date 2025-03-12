import React, { useState } from 'react';
import './DomainPage.css';

const DomainPage = ({ domain, description, icon }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a response for demonstration
    setResponse(`Processing your query about ${domain}...`);
    setTimeout(() => {
      setResponse(`Here is the response to your query about ${domain}.`);
    }, 2000); // Simulate a delay for processing
  };

  return (
    <div className="domain-page">
      <div className="domain-header">
        <div className="domain-icon">{icon}</div>
        <h1>{domain}</h1>
      </div>
      <p className="domain-description">{description}</p>

      <div className="query-section">
        <h2>Ask a Query</h2>
        <form onSubmit={handleSubmit} className="query-form">
          <input
            type="text"
            placeholder="Enter your query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit">Ask</button>
        </form>
        {response && (
          <div className="response-section fade-in">
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainPage; 