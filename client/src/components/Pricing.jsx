import React, { useEffect } from 'react';
import './Pricing.css';

const Pricing = () => {
  useEffect(() => {
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.pricing-card, .pricing-header, .pricing-faq');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('animated');
        }
      });
    };
    
    // Run once on mount
    setTimeout(animateOnScroll, 100);
    
    // Add scroll listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>Choose Your Perfect Plan</h1>
        <p className="pricing-subtitle">
          Access M.A.D.H.A.V.A.'s powerful multi-domain intelligence with a pricing plan that fits your needs
        </p>
      </div>

      <div className="pricing-cards">
        <div className="pricing-card free">
          <div className="starter-tag">Get Started</div>
          <div className="card-header">
            <h2>Free Tier</h2>
            <div className="price">$0<span>/month</span></div>
            <p className="price-description">Perfect for casual users</p>
          </div>
          <div className="card-body">
            <ul className="features-list">
              <li>Basic access to all domains</li>
              <li>5 queries per day</li>
              <li>Standard response time</li>
              <li>Community support</li>
              <li>Basic analytics</li>
            </ul>
            <button className="cta-button">Get Started</button>
            <p className="no-credit-card">No credit card required</p>
          </div>
        </div>

        <div className="pricing-card premium">
          <div className="popular-tag">Most Popular</div>
          <div className="card-header">
            <h2>Premium</h2>
            <div className="price">$19<span>/month</span></div>
            <p className="price-description">For professionals and businesses</p>
          </div>
          <div className="card-body">
            <ul className="features-list">
              <li>Full access to all domains</li>
              <li>100 queries per day</li>
              <li>Priority response time</li>
              <li>Email support</li>
              <li>Advanced analytics</li>
              <li>API access</li>
            </ul>
            <button className="cta-button">Subscribe Now</button>
          </div>
        </div>

        <div className="pricing-card enterprise">
          <div className="enterprise-tag">Custom Solution</div>
          <div className="card-header">
            <h2>Enterprise</h2>
            <div className="price">Custom<span> pricing</span></div>
            <p className="price-description">For large organizations</p>
          </div>
          <div className="card-body">
            <ul className="features-list">
              <li>Unlimited access to all domains</li>
              <li>Unlimited queries</li>
              <li>Fastest response time</li>
              <li>Dedicated support team</li>
              <li>Custom integrations</li>
              <li>Advanced security features</li>
              <li>White-labeling options</li>
            </ul>
            <button className="cta-button">Contact Sales</button>
            <p className="enterprise-note">Includes personalized onboarding</p>
          </div>
        </div>
      </div>

      <div className="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Can I switch plans later?</h3>
          <p>Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
        </div>
        <div className="faq-item">
          <h3>Do you offer refunds?</h3>
          <p>We offer a 14-day money-back guarantee for all paid plans if you're not satisfied with our service.</p>
        </div>
        <div className="faq-item">
          <h3>What payment methods do you accept?</h3>
          <p>We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
        </div>
        <div className="faq-item">
          <h3>Is there a long-term commitment?</h3>
          <p>No, all our plans are billed monthly with no long-term commitment. You can cancel anytime.</p>
        </div>
        <div className="faq-item">
          <h3>Do you offer discounts for annual billing?</h3>
          <p>Yes, you can save 20% by choosing annual billing on any of our premium plans.</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 