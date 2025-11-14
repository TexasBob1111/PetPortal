import { useState, useEffect } from 'react';

interface NavigationProps {
  currentPage: 'home' | 'pricing' | 'faq' | 'contact';
  onNavigate: (page: 'home' | 'pricing' | 'faq' | 'contact') => void;
}

const scrollToEmailCapture = () => {
  const emailSection = document.getElementById('email-capture-section');
  if (emailSection) {
    emailSection.scrollIntoView({ behavior: 'smooth' });
  }
};

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
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="text-xl md:text-2xl font-serif font-semibold text-dark-brown hover:text-warm-brown transition-colors flex-shrink-0"
        >
          PetPortal<sup className="text-xs">™</sup>
        </button>

        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <button
            onClick={() => onNavigate('home')}
            className={`text-xs sm:text-sm font-medium transition-colors ${
              currentPage === 'home' ? 'text-dark-brown' : 'text-warm-brown hover:text-dark-brown'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className={`text-xs sm:text-sm font-medium transition-colors ${
              currentPage === 'pricing' ? 'text-dark-brown' : 'text-warm-brown hover:text-dark-brown'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => onNavigate('faq')}
            className={`text-xs sm:text-sm font-medium transition-colors ${
              currentPage === 'faq' ? 'text-dark-brown' : 'text-warm-brown hover:text-dark-brown'
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`text-xs sm:text-sm font-medium transition-colors ${
              currentPage === 'contact' ? 'text-dark-brown' : 'text-warm-brown hover:text-dark-brown'
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => {
              onNavigate('pricing');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="bg-dark-brown text-cream px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-warm-brown transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Pre-Order
          </button>
        </div>
      </div>
    </nav>
  );
}
