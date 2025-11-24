import { useState, useEffect } from 'react';

interface NavigationProps {
  currentPage: 'home' | 'features' | 'pricing' | 'faq' | 'contact';
  onNavigate: (page: 'home' | 'features' | 'pricing' | 'faq' | 'contact') => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between gap-4 sm:gap-8">
        <button
          onClick={() => onNavigate('home')}
          data-cta="Nav: Logo"
          className="text-xl md:text-2xl font-serif font-semibold text-dark-brown hover:text-warm-brown transition-colors flex-shrink-0"
        >
          PetPortal<sup className="text-xs">™</sup>
        </button>

        <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
          <button
            onClick={() => onNavigate('home')}
            data-cta="Nav: Home"
            className={`text-xs sm:text-sm font-medium transition-colors ${
              currentPage === 'home' ? 'text-dark-brown' : 'text-warm-brown hover:text-dark-brown'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('features')}
            data-cta="Nav: Features"
            className={`text-xs sm:text-sm font-medium transition-colors ${
              currentPage === 'features' ? 'text-dark-brown' : 'text-warm-brown hover:text-dark-brown'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            data-cta="Nav: Pricing"
            className={`text-xs sm:text-sm font-medium transition-colors ${
              currentPage === 'pricing' ? 'text-dark-brown' : 'text-warm-brown hover:text-dark-brown'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => onNavigate('faq')}
            data-cta="Nav: FAQ"
            className={`text-xs sm:text-sm font-medium transition-colors ${
              currentPage === 'faq' ? 'text-dark-brown' : 'text-warm-brown hover:text-dark-brown'
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate('contact')}
            data-cta="Nav: Contact"
            className={`text-xs sm:text-sm font-medium transition-colors ${
              currentPage === 'contact' ? 'text-dark-brown' : 'text-warm-brown hover:text-dark-brown'
            }`}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
