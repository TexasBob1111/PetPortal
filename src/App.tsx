import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Features from './pages/Features';
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
  const [currentPage, setCurrentPage] = useState<'home' | 'features' | 'pricing' | 'faq' | 'contact' | 'admin' | 'login'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      checkAuth();
      trackReferralIfPresent();
      handleInitialRoute();

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        (async () => {
          setIsAuthenticated(!!session);
        })();
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }, []);

  useEffect(() => {
    const pagePath = currentPage === 'home' ? '/' : `/${currentPage}`;

    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: document.title
      });
    }

    if (typeof fbq === 'function') {
      fbq('track', 'PageView');
    }
  }, [currentPage]);

  const handleInitialRoute = () => {
    const path = window.location.pathname;
    if (path === '/login') {
      setCurrentPage('login');
    } else if (path === '/admin') {
      setCurrentPage('admin');
    } else if (path === '/features') {
      setCurrentPage('features');
    } else if (path === '/pricing') {
      setCurrentPage('pricing');
    } else if (path === '/faq') {
      setCurrentPage('faq');
    } else if (path === '/contact') {
      setCurrentPage('contact');
    }
  };

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
    }
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

  const handleNavigate = (page: 'home' | 'features' | 'pricing' | 'faq' | 'contact' | 'admin' | 'login') => {
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
      case 'features':
        return <Features onNavigate={handleNavigate} />;
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
