import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SideMenu from './components/SideMenu.jsx';
import DomainPage from './pages/DomainPage.jsx';
import Profile from './components/Profile';
import Team from './components/Team';
import LoadingScreen from './components/LoadingScreen';
 // Keep logo for header
import './App.css';

// Icons (you can replace these with actual icons)
const icons = {
  finance: '💰',
  healthcare: '🏥',
  legal: '⚖️',
  'code-assistant': '💻',
  news: '📰',
  ecommerce: '🛍️'
};

const domainDescriptions = {
  finance: 'Analyze financial data, market trends, and investment opportunities with AI-powered insights.',
  healthcare: 'Access medical information, research, and healthcare analytics with advanced natural language processing.',
  legal: 'Navigate legal documents, cases, and regulations with intelligent document analysis.',
  'code-assistant': 'Get intelligent debugging assistance, code reviews, and optimization suggestions powered by AI.',
  news: 'Stay updated with real-time news analysis and trend detection across multiple sources.',
  ecommerce: 'Track market trends, analyze consumer behavior, and optimize e-commerce operations.'
};

const domainDisplayNames = {
  finance: 'Finance',
  healthcare: 'Healthcare',
  legal: 'Legal',
  'code-assistant': 'Code Assistant',
  news: 'News',
  ecommerce: 'E-commerce'
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [menuOpen]);

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          {isLoading && <LoadingScreen />}

          <header className="App-header">
            <div className="header-content">
              <div className="header-logo">

              </div>
              <div className="header-text">
                <h2>Welcome to M.A.D.H.A.V.A. – Intelligent Data Processing for Smarter Decisions</h2>
                <p>"Turning raw data into actionable insights – instantly, accurately, and efficiently."</p>
                <p>
                  M.A.D.H.A.V.A. (Multi-domain Analytical Data Harvesting & Automated Verification Assistant) is an advanced AI-driven platform designed to provide real-time, domain-specific, and verified information for professionals in finance, healthcare, legal, and education.
                </p>
              </div>
            </div>
          </header>

          <Navbar 
            onMenuClick={() => setMenuOpen(true)}
          />
          
          <SideMenu 
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
          />

          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <div className="home">
                  <main className="domain-grid">
                    {Object.entries(icons).map(([domain, icon]) => (
                      <Link 
                        key={domain} 
                        to={`/${domain}`}
                        className="domain-card"
                      >
                        <div className="domain-icon">{icon}</div>
                        <h2>{domainDisplayNames[domain]}</h2>
                        <p>{domainDescriptions[domain]}</p>
                        {domain === 'code-assistant' && (
                          <div className="code-features">
                            <ul>
                              <li>🔍 AI Debugging</li>
                              <li>📝 Code Review</li>
                              <li>🔄 Refactoring</li>
                              <li>⚡ Performance Optimization</li>
                              <li>🔒 Security Analysis</li>
                            </ul>
                          </div>
                        )}
                      </Link>
                    ))}
                  </main>
                </div>
              } />
              
              {/* Team Route */}
              <Route 
                path="/team" 
                element={
                  <React.Suspense fallback={<LoadingScreen />}>
                    <Team />
                  </React.Suspense>
                } 
              />
              
              {/* Domain Routes */}
              {Object.entries(icons).map(([domain, icon]) => (
                <Route
                  key={domain}
                  path={`/${domain}`}
                  element={
                    <React.Suspense fallback={<LoadingScreen />}>
                      <DomainPage
                        domain={domainDisplayNames[domain]}
                        description={domainDescriptions[domain]}
                        icon={icon}
                      />
                    </React.Suspense>
                  }
                />
              ))}

              {/* Profile Routes */}
              <Route 
                path="/profile/settings" 
                element={
                  <React.Suspense fallback={<LoadingScreen />}>
                    <Profile section="settings" />
                  </React.Suspense>
                } 
              />
              <Route 
                path="/account/settings" 
                element={
                  <React.Suspense fallback={<LoadingScreen />}>
                    <Profile section="account" />
                  </React.Suspense>
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  <React.Suspense fallback={<LoadingScreen />}>
                    <Profile section="notifications" />
                  </React.Suspense>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <React.Suspense fallback={<LoadingScreen />}>
                    <Profile section="analytics" />
                  </React.Suspense>
                } 
              />
              <Route 
                path="/support" 
                element={
                  <React.Suspense fallback={<LoadingScreen />}>
                    <Profile section="support" />
                  </React.Suspense>
                } 
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
