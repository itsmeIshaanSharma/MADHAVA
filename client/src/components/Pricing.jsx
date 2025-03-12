import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <div className="pricing">
      <h1>Pricing Plans</h1>
      <p>Choose the plan that best fits your needs.</p>

      <div className="pricing-grid">
        {/* Freemium Model */}
        <div className="pricing-card">
          <h2>Freemium Model</h2>
          <div className="plan">
            <h3>Basic Plan (Free)</h3>
            <ul>
              <li>✅ Limited access to real-time data processing</li>
              <li>✅ Standard search with general insights</li>
              <li>✅ Community support</li>
            </ul>
          </div>
          <div className="plan">
            <h3>Pro Plan ($9.99/month)</h3>
            <ul>
              <li>✅ Faster data updates & AI-powered insights</li>
              <li>✅ Customizable filters for domain-specific reports</li>
              <li>✅ API access for external integration</li>
            </ul>
          </div>
          <div className="plan">
            <h3>Enterprise Plan ($49.99/month per user)</h3>
            <ul>
              <li>✅ Advanced AI-driven analytics & predictive insights</li>
              <li>✅ Priority customer support</li>
              <li>✅ Dedicated cloud hosting & data security</li>
            </ul>
            <p>📌 Best For: Individual users, professionals, and growing businesses</p>
          </div>
        </div>

        {/* Subscription-Based Model */}
        <div className="pricing-card">
          <h2>Subscription-Based Model</h2>
          <div className="plan">
            <h3>Monthly ($19.99/month)</h3>
            <h3>Annual ($199/year, save 20%)</h3>
            <ul>
              <li>✅ Premium features & AI-driven insights</li>
              <li>✅ Priority access to data updates</li>
            </ul>
            <p>📌 Best For: Businesses needing continuous data updates</p>
          </div>
        </div>

        {/* Pay-Per-Use Model */}
        <div className="pricing-card">
          <h2>Pay-Per-Use Model</h2>
          <div className="plan">
            <ul>
              <li>✅ $0.01 per API call</li>
              <li>✅ $5 per 1,000 processed queries</li>
            </ul>
            <p>📌 Best For: Developers, researchers, and data-intensive applications</p>
          </div>
        </div>

        {/* Enterprise Licensing */}
        <div className="pricing-card">
          <h2>Enterprise Licensing & Custom Solutions</h2>
          <div className="plan">
            <ul>
              <li>✅ Custom pricing for tailored solutions</li>
              <li>✅ White-labeling & dedicated cloud hosting</li>
              <li>✅ Priority support</li>
            </ul>
            <p>📌 Best For: Corporations, government agencies, and large-scale research firms</p>
          </div>
        </div>

        {/* One-Time Lifetime Purchase */}
        <div className="pricing-card">
          <h2>One-Time Lifetime Purchase</h2>
          <div className="plan">
            <h3>$499 (One-Time Payment)</h3>
            <ul>
              <li>✅ Lifetime access to the platform</li>
              <li>✅ Limited to specific features</li>
            </ul>
            <p>📌 Best For: Users preferring a one-time investment instead of recurring fees</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 