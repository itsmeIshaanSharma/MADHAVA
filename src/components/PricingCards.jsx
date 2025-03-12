import React from 'react';

const PricingCards = () => {
  return (
    <div className="pricing-container">
      {/* Freemium Model */}
      <div className="pricing-card">
        <h3>Freemium Model</h3>
        <div className="plan">
          <h4>Basic Plan (Free)</h4>
          <ul>
            <li>✅ Limited access to real-time data processing</li>
            <li>✅ Standard search with general insights</li>
            <li>✅ Community support</li>
          </ul>
        </div>
        <div className="plan">
          <h4>Pro Plan ($9.99/month)</h4>
          <ul>
            <li>✅ Faster data updates & AI-powered insights</li>
            <li>✅ Customizable filters for domain-specific reports</li>
            <li>✅ API access for external integration</li>
          </ul>
        </div>
        <div className="plan">
          <h4>Enterprise Plan ($49.99/month per user)</h4>
          <ul>
            <li>✅ Advanced AI-driven analytics & predictive insights</li>
            <li>✅ Priority customer support</li>
            <li>✅ Dedicated cloud hosting & data security</li>
          </ul>
        </div>
        <p className="best-for">📌 Best For: Individual users, professionals, and growing businesses</p>
      </div>

      {/* Subscription-Based Model */}
      <div className="pricing-card">
        <h3>Subscription-Based Model</h3>
        <div className="plan">
          <h4>Monthly Plan ($19.99/month)</h4>
          <ul>
            <li>✅ Premium features & AI-driven insights</li>
            <li>✅ Priority access to new features</li>
            <li>✅ Continuous data updates</li>
          </ul>
        </div>
        <div className="plan">
          <h4>Annual Plan ($199/year)</h4>
          <ul>
            <li>✅ Save 20% compared to monthly</li>
            <li>✅ All monthly plan features</li>
            <li>✅ Early access to beta features</li>
          </ul>
        </div>
        <p className="best-for">📌 Best For: Businesses needing continuous data updates</p>
      </div>

      {/* Pay-Per-Use Model */}
      <div className="pricing-card">
        <h3>Pay-Per-Use Model</h3>
        <div className="plan">
          <h4>API Calls ($0.01/call)</h4>
          <ul>
            <li>✅ Pay only for what you use</li>
            <li>✅ Flexible pricing structure</li>
            <li>✅ Real-time usage tracking</li>
          </ul>
        </div>
        <div className="plan">
          <h4>Data Processing ($5/1,000 queries)</h4>
          <ul>
            <li>✅ Cost-effective for large datasets</li>
            <li>✅ Automatic scaling</li>
            <li>✅ Detailed usage reports</li>
          </ul>
        </div>
        <p className="best-for">📌 Best For: Developers, researchers, and data-intensive applications</p>
      </div>

      {/* Enterprise Licensing */}
      <div className="pricing-card">
        <h3>Enterprise Licensing</h3>
        <div className="plan">
          <h4>Custom Solutions</h4>
          <ul>
            <li>✅ Tailored data solutions</li>
            <li>✅ White-labeling options</li>
            <li>✅ Dedicated cloud hosting</li>
            <li>✅ Priority support</li>
          </ul>
        </div>
        <p className="best-for">📌 Best For: Corporations, government agencies, and large-scale research firms</p>
      </div>

      {/* One-Time Purchase */}
      <div className="pricing-card">
        <h3>One-Time Purchase</h3>
        <div className="plan">
          <h4>Lifetime Access ($499)</h4>
          <ul>
            <li>✅ One-time payment</li>
            <li>✅ Access to core features</li>
            <li>✅ No recurring fees</li>
            <li>❌ Advanced tools may require subscription</li>
          </ul>
        </div>
        <p className="best-for">📌 Best For: Users preferring a one-time investment</p>
      </div>
    </div>
  );
};

export default PricingCards;

// CSS Styles
const styles = `
  .pricing-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
  }

  .pricing-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }

  .pricing-card:hover {
    transform: translateY(-5px);
  }

  .pricing-card h3 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .plan {
    margin-bottom: 1.5rem;
  }

  .plan h4 {
    color: #444;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .plan ul {
    list-style: none;
    padding: 0;
  }

  .plan li {
    margin-bottom: 0.5rem;
    color: #666;
    font-size: 0.95rem;
  }

  .best-for {
    font-style: italic;
    color: #888;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet); 