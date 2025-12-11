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
              data-cta="Footer: Home"
              className="hover:text-accent-warm transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              data-cta="Footer: Pricing"
              className="hover:text-accent-warm transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => onNavigate('faq')}
              data-cta="Footer: FAQ"
              className="hover:text-accent-warm transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => onNavigate('contact')}
              data-cta="Footer: Contact"
              className="hover:text-accent-warm transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="text-center space-y-1">
            <div className="text-sm text-warm-gray">
              © {new Date().getFullYear()} PetPortal<sup className="text-xs">™</sup>
            </div>
            <div className="text-xs text-warm-gray/80">
              Patent Pending
            </div>
          </div>

          <button
            onClick={() => onNavigate('login')}
            data-cta="Footer: Admin"
            className="text-xs text-warm-gray/50 hover:text-warm-gray transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
