import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { supabase } from './lib/supabase';
import { trackReferralVisit } from './lib/shareTracking';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'pricing' | 'faq' | 'contact' | 'admin' | 'login'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    trackReferralIfPresent();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setIsAuthenticated(!!session);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const trackReferralIfPresent = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');

    if (referralCode) {
      const landingPage = window.location.pathname || '/';
      trackReferralVisit(referralCode, landingPage);

      sessionStorage.setItem('referralCode', referralCode);

      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  };

  const handleNavigate = (page: 'home' | 'pricing' | 'faq' | 'contact' | 'admin' | 'login') => {
    if (page === 'admin' && !isAuthenticated) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'pricing':
        return <Pricing onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQ onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return isAuthenticated ? <Admin onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />;
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const showNavAndFooter = currentPage !== 'login' && !(currentPage === 'admin' && !isAuthenticated);

  return (
    <div className="min-h-screen bg-cream">
      {showNavAndFooter && <Navigation currentPage={currentPage} onNavigate={handleNavigate} />}
      {renderPage()}
      {showNavAndFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
