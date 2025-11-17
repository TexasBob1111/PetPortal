import { useState } from 'react';
import { trackButtonClick } from '../lib/analytics';
import { supabase } from '../lib/supabase';
import { markReferralAsConverted } from '../lib/shareTracking';

interface HomeProps {
  onNavigate: (page: 'home' | 'pricing' | 'faq' | 'contact') => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email) {
      trackButtonClick('email_submit', 'landing_page');

      const { error: insertError } = await supabase
        .from('email_subscribers')
        .insert([{ email, page: 'landing_page' }]);

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already subscribed!');
        } else {
          setError('Something went wrong. Please try again.');
        }
        return;
      }

      const referralCode = sessionStorage.getItem('referralCode');
      if (referralCode) {
        await markReferralAsConverted(referralCode);
        sessionStorage.removeItem('referralCode');
      }

      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-cream/30 to-warm-gray/20 px-6 pt-12 pb-12 flex items-center justify-center">
      <div className="max-w-2xl w-full text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-dark-brown">
            They don't understand "busy."
          </h1>
          <p className="text-2xl sm:text-3xl font-light text-dark-brown/90">
            They only know you're gone.
          </p>
          <p className="text-xl sm:text-2xl font-light text-dark-brown/90 pt-2">
            PetPortal™ helps them feel close even when life pulls you away.
          </p>
          <p className="text-lg sm:text-xl text-warm-brown max-w-xl mx-auto pt-2">
            See them. Talk to them. Feed them.
            <br />
            Stay connected.
          </p>
        </div>

        <div className="py-2">
          <img
            src="/PETPORTAL11.png"
            alt="PetPortal Device"
            className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
          />
        </div>

        <div className="space-y-3 max-w-md mx-auto text-left">
          <ul className="space-y-2 text-base sm:text-lg text-dark-brown">
            <li className="flex items-start">
              <span className="mr-3 mt-1">•</span>
              <span>Live video so they can see YOU</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1">•</span>
              <span>Two-way talk to comfort them instantly</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1">•</span>
              <span>Calming presence that reduces anxiety</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1">•</span>
              <span>Reward with treats or dispense meals remotely</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1">•</span>
              <span>Simple setup — works in any home</span>
            </li>
          </ul>
          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('features')}
              className="text-sm text-warm-brown hover:text-dark-brown transition-colors"
            >
              See all features →
            </button>
          </div>
        </div>

        <div className="bg-cream/50 rounded-2xl p-8 space-y-4 border border-warm-brown/10">
          {!submitted ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-light text-dark-brown">
                Get Early Access
              </h2>
              <p className="text-base text-warm-brown">
                Be first to know when PetPortal™ launches.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full px-5 py-3 rounded-full border border-warm-brown/30 focus:outline-none focus:border-dark-brown focus:ring-2 focus:ring-dark-brown/10 transition-all text-dark-brown placeholder:text-warm-brown/50 bg-white"
                />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name (optional)"
                  className="w-full px-5 py-3 rounded-full border border-warm-brown/30 focus:outline-none focus:border-dark-brown focus:ring-2 focus:ring-dark-brown/10 transition-all text-dark-brown placeholder:text-warm-brown/50 bg-white"
                />
                <button
                  type="submit"
                  className="w-full bg-dark-brown text-cream px-8 py-3 rounded-full font-medium hover:bg-warm-brown transition-all hover:scale-[1.02] active:scale-95"
                >
                  Get Early Access
                </button>
              </form>

              {error && (
                <div className="py-2 px-4 bg-red-50 border border-red-200 rounded-full text-red-800 text-sm">
                  {error}
                </div>
              )}

              <p className="text-xs text-warm-brown/60 pt-2">
                Launch updates only. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <div className="py-8">
              <p className="text-xl text-dark-brown font-medium">
                You're on the list! We'll keep you updated.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
