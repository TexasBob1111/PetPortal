interface FooterProps {
  onNavigate: (page: 'home' | 'pricing' | 'faq' | 'contact' | 'login') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-dark-brown text-cream py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="text-2xl font-serif font-semibold">PetPortal<sup className="text-xs">™</sup></div>

          <div className="flex gap-8 text-sm">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-accent-warm transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="hover:text-accent-warm transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className="hover:text-accent-warm transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-accent-warm transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="text-sm text-warm-gray">
            © {new Date().getFullYear()} PetPortal<sup className="text-xs">™</sup>
          </div>

          <button
            onClick={() => onNavigate('login')}
            className="text-xs text-warm-gray/50 hover:text-warm-gray transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
