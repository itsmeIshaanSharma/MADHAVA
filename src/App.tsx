import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { QueryInterface } from './components/QueryInterface';
import { LoginPage } from './components/LoginPage';
import { HistoryPage } from './components/HistoryPage';
import { 
  LineChart, History, LogOut, ChevronRight, CreditCard, TrendingUp, 
  DollarSign, AlertCircle, User, Stethoscope, Scale, Newspaper, ShoppingBag,
  BookOpen, Code, UserPlus, Globe, FlaskConical, Briefcase, GraduationCap, Plane,
  Home
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { motion } from 'framer-motion';
import { Domain } from './types';
import PricingCards from './components/PricingCards';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain>('finance');
  const [domainsExpanded, setDomainsExpanded] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Load custom font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: 'Poppins', sans-serif;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', sans-serif;
      }
      .app-title {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        letter-spacing: -0.5px;
      }
      .domain-subtitle {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
      }
    `;
    document.head.appendChild(style);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const domainConfig = {
    finance: {
      icon: <DollarSign className="w-5 h-5" />,
      color: 'from-blue-800 to-blue-600',
      textColor: 'text-blue-100',
      hoverColor: 'hover:bg-blue-900',
      bgActive: 'bg-blue-700',
      lightColor: 'from-blue-50 to-white',
      title: 'Financial Insights',
      symbol: '₹'
    },
    healthcare: {
      icon: <Stethoscope className="w-5 h-5" />,
      color: 'from-emerald-800 to-emerald-600',
      textColor: 'text-emerald-100',
      hoverColor: 'hover:bg-emerald-900',
      bgActive: 'bg-emerald-700',
      lightColor: 'from-emerald-50 to-white',
      title: 'Healthcare Research',
      symbol: '+'
    },
    legal: {
      icon: <Scale className="w-5 h-5" />,
      color: 'from-purple-800 to-purple-600',
      textColor: 'text-purple-100',
      hoverColor: 'hover:bg-purple-900', 
      bgActive: 'bg-purple-700',
      lightColor: 'from-purple-50 to-white',
      title: 'Legal Compliance',
      symbol: '§'
    },
    news: {
      icon: <Newspaper className="w-5 h-5" />,
      color: 'from-cyan-800 to-cyan-600',
      textColor: 'text-cyan-100',
      hoverColor: 'hover:bg-cyan-900',
      bgActive: 'bg-cyan-700',
      lightColor: 'from-cyan-50 to-white',
      title: 'News Analysis',
      symbol: '📰'
    },
    ecommerce: {
      icon: <ShoppingBag className="w-5 h-5" />,
      color: 'from-teal-800 to-teal-600',
      textColor: 'text-teal-100',
      hoverColor: 'hover:bg-teal-900',
      bgActive: 'bg-teal-700',
      lightColor: 'from-teal-50 to-white',
      title: 'Product Advisor',
      symbol: '🛍️'
    }
  };

  // Primary domains for the main selector
  const primaryDomains = ['finance', 'healthcare', 'legal', 'news', 'ecommerce'];

  const currentDomain = domainConfig[selectedDomain];

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br ${currentDomain.color}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className={`min-h-screen bg-gradient-to-br ${currentDomain.lightColor}`}>
        <header className={`bg-gradient-to-r ${currentDomain.color} shadow-lg`}>
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link to="/" className="flex items-center group">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="mr-3 text-2xl"
              >
                {currentDomain.symbol}
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white app-title">M.A.D.H.A.V.A.</h1>
                <p className="text-xs domain-subtitle text-white/80">{currentDomain.title} Intelligence</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className={`hidden md:flex items-center ${currentDomain.textColor} hover:text-white`}
              >
                <Home className="w-5 h-5 mr-1" />
                <span>Home</span>
              </Link>

              <Link
                to="/pricing"
                className={`hidden md:flex items-center ${currentDomain.textColor} hover:text-white`}
              >
                <CreditCard className="w-5 h-5 mr-1" />
                <span>Pricing</span>
              </Link>
              
              <div className="hidden xl:flex bg-opacity-20 bg-black rounded-lg p-1 space-x-1">
                {primaryDomains.map((domain) => (
                  <motion.button
                    key={domain}
                    onClick={() => setSelectedDomain(domain as Domain)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center px-3 py-1.5 rounded-md transition-all duration-200 ${
                      selectedDomain === domain 
                        ? `${domainConfig[domain as Domain].bgActive} text-white shadow-lg` 
                        : `text-white bg-transparent hover:bg-black hover:bg-opacity-20`
                    }`}
                  >
                    <motion.span 
                      className="mr-1.5"
                      animate={{ rotate: selectedDomain === domain ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {domainConfig[domain as Domain].icon}
                    </motion.span>
                    <span className="text-sm">{domain.charAt(0).toUpperCase() + domain.slice(1)}</span>
                  </motion.button>
                ))}
              </div>
              
              {user && (
                <Link
                  to="/history"
                  className={`hidden md:flex items-center ${currentDomain.textColor} hover:text-white`}
                >
                  <History className="w-5 h-5 mr-1" />
                  <span>History</span>
                </Link>
              )}
              
              {user ? (
                <button
                  onClick={handleSignOut}
                  className={`flex items-center px-3 py-1 rounded-md ${currentDomain.bgActive} ${currentDomain.hoverColor} text-white transition-colors`}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign out
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`flex items-center px-3 py-1 rounded-md ${currentDomain.bgActive} ${currentDomain.hoverColor} text-white transition-colors`}
                >
                  <User className="w-4 h-4 mr-1" />
                  Sign in
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile Domain Selector */}
          <div className="xl:hidden px-4 pb-4 flex items-center space-x-2 overflow-auto">
            {primaryDomains.map((domain) => (
              <motion.button
                key={domain}
                onClick={() => setSelectedDomain(domain as Domain)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-3 py-1.5 rounded-md transition-all duration-200 flex-shrink-0 ${
                  selectedDomain === domain 
                    ? `${domainConfig[domain as Domain].bgActive} text-white shadow-lg` 
                    : `text-white bg-black bg-opacity-10 hover:bg-opacity-20`
                }`}
              >
                <motion.span 
                  className="mr-1.5"
                  animate={{ rotate: selectedDomain === domain ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {domainConfig[domain as Domain].icon}
                </motion.span>
                <span className="text-xs whitespace-nowrap">{domain.charAt(0).toUpperCase() + domain.slice(1)}</span>
              </motion.button>
            ))}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {showLoginPrompt && !user && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-md shadow-sm"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-amber-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    Sign in to save your history and get unlimited access.
                    <Link to="/login" className="font-medium underline text-amber-700 hover:text-amber-600 ml-1">
                      Sign in now
                    </Link>
                  </p>
                </div>
                <button 
                  onClick={() => setShowLoginPrompt(false)} 
                  className="ml-auto text-amber-500 hover:text-amber-600"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
          
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/history" element={user ? <HistoryPage domain={selectedDomain} /> : <Navigate to="/login" />} />
            <Route 
              path="/" 
              element={
                <div className="space-y-8">
                  <div className="text-center max-w-4xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold mb-6">
                      Welcome to M.A.D.H.A.V.A.
                    </h1>
                    <p className="text-xl mb-4">
                      Intelligent Data Processing for Smarter Decisions
                    </p>
                    <p className="text-lg mb-8 italic text-gray-600">
                      "Turning raw data into actionable insights – instantly, accurately, and efficiently."
                    </p>
                    <p className="text-gray-600">
                      M.A.D.H.A.V.A. (Multi-domain Analytical Data Harvesting & Automated Verification Assistant) 
                      is an advanced AI-driven platform designed to provide real-time, domain-specific, and 
                      verified information for professionals.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {primaryDomains.map((domain) => (
                      <div 
                        key={domain}
                        className={`p-6 rounded-lg border border-opacity-20 hover:border-opacity-50 
                          transition-all duration-300 cursor-pointer bg-white bg-opacity-5 
                          hover:bg-opacity-10 backdrop-blur-sm`}
                        onClick={() => setSelectedDomain(domain as Domain)}
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="p-2 rounded-lg bg-opacity-20 bg-white">
                            {domainConfig[domain as Domain].icon}
                          </span>
                          <h3 className="text-xl font-semibold">
                            {domain.charAt(0).toUpperCase() + domain.slice(1)}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          {domainConfig[domain as Domain].title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              } 
            />
            <Route 
              path="/pricing" 
              element={
                <div className="bg-[hsl(224,71%,4%)] -mt-8 -mx-4 px-4 py-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold text-white mb-4">
                        Choose Your Plan
                      </h2>
                      <p className="text-gray-400 text-lg">
                        Select the perfect pricing plan for your needs
                      </p>
                    </div>
                    <PricingCards />
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>
        
        <footer className={`bg-gradient-to-r ${currentDomain.color} text-white mt-auto`}>
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center app-title">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    {currentDomain.symbol}
                  </motion.span>
                  <span>M.A.D.H.A.V.A.</span>
                </h3>
                <p className="text-sm domain-subtitle text-white/80">
                  Multi-domain Analytical Data Harvesting & Automated Verification Assistant
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Resources</h3>
                <ul className="text-sm space-y-1 text-blue-200">
                  <li><a href="#" className="hover:text-white">Documentation</a></li>
                  <li><a href="#" className="hover:text-white">API Reference</a></li>
                  <li><a href="#" className="hover:text-white">Community Forum</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-sm domain-subtitle">
                  Built on open-source data and freely accessible to all users.
                  No cost, no hidden fees.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-opacity-30">
              <p className="text-center text-sm domain-subtitle">
                © {new Date().getFullYear()} M.A.D.H.A.V.A. - Multi-Domain Intelligence Platform
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;