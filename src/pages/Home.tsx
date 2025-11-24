import { useState } from 'react';
import { trackButtonClick } from '../lib/analytics';
import { supabase } from '../lib/supabase';
import { markReferralAsConverted } from '../lib/shareTracking';

interface HomeProps {
  onNavigate: (page: 'home' | 'features' | 'pricing' | 'faq' | 'contact') => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [bottomEmail, setBottomEmail] = useState('');
  const [bottomSubmitted, setBottomSubmitted] = useState(false);
  const [bottomError, setBottomError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email) {
      trackButtonClick('email_submit', 'landing_page');

      if (typeof gtag === 'function') {
        gtag('event', 'lead_submit', {
          event_category: 'lead',
          event_label: 'landing_page'
        });
      }

      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: 'landing_page',
          content_category: 'email_signup'
        });
      }

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

  const handleBottomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBottomError('');

    if (bottomEmail) {
      trackButtonClick('email_submit', 'bottom_signup');

      if (typeof gtag === 'function') {
        gtag('event', 'lead_submit', {
          event_category: 'lead',
          event_label: 'bottom_signup'
        });
      }

      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: 'bottom_signup',
          content_category: 'email_signup'
        });
      }

      const { error: insertError } = await supabase
        .from('email_subscribers')
        .insert([{ email: bottomEmail, page: 'bottom_signup' }]);

      if (insertError) {
        if (insertError.code === '23505') {
          setBottomError('This email is already subscribed!');
        } else {
          setBottomError('Something went wrong. Please try again.');
        }
        return;
      }

      const referralCode = sessionStorage.getItem('referralCode');
      if (referralCode) {
        await markReferralAsConverted(referralCode);
        sessionStorage.removeItem('referralCode');
      }

      setBottomSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-cream px-6 pt-20 pb-16">
      <div className="max-w-4xl mx-auto space-y-12">

        <section className="text-center space-y-5">
          <div className="max-w-2xl mx-auto">
            <img
              src="/image copy copy copy copy copy copy.png"
              alt="Dog interacting with PetPortal"
              className="w-full rounded-2xl shadow-2xl mb-4 sm:mb-6 max-h-[40vh] sm:max-h-none object-cover"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-dark-brown">
              They don't understand "busy." They only know you're gone.
            </h1>
            <p className="text-xl sm:text-2xl text-warm-brown max-w-2xl mx-auto pt-2 leading-relaxed">
              PetPortal™ helps them feel close even when life pulls you away. See them. Talk to them. Treat them. Stay connected.
            </p>
            <p className="text-base text-warm-brown/80 max-w-2xl mx-auto pt-1">
              A standalone device that brings you back into their day — your face, your voice, your comfort — exactly when they need you most.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-lg border border-warm-brown/10 max-w-xl mx-auto">
            {!submitted ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-serif text-dark-brown mb-2">
                  Get Early Access Pricing
                </h2>
                <p className="text-base text-warm-brown mb-6">
                  Be first to know when PetPortal™ launches on Kickstarter.
                </p>

                <form id="homepage-email-form" onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full px-6 py-4 rounded-full border border-warm-brown/30 focus:outline-none focus:border-dark-brown focus:ring-2 focus:ring-dark-brown/20 transition-all text-dark-brown placeholder:text-warm-brown/50 bg-white"
                  />
                  <button
                    type="submit"
                    data-cta="Get Early Access Pricing"
                    className="w-full bg-dark-brown text-cream px-8 py-4 rounded-full font-medium hover:bg-warm-brown transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Get Early Access Pricing
                  </button>
                </form>

                {error && (
                  <div className="mt-4 py-3 px-6 bg-red-50 border border-red-200 rounded-full text-red-800 text-sm">
                    {error}
                  </div>
                )}

                <p className="text-xs text-warm-brown/70 mt-4">
                  No spam. No sharing. Only launch updates.
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
        </section>

        <section className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-dark-brown">
            Why PetPortal™
          </h2>
          <p className="text-xl text-warm-brown max-w-2xl mx-auto italic">
            A comforting presence when you can't be there.
          </p>
          <ul className="max-w-2xl mx-auto text-left space-y-2 text-lg text-dark-brown">
            <li className="flex items-start">
              <span className="text-warm-brown mr-3 mt-1">•</span>
              <span>Your face on a real screen at dog height</span>
            </li>
            <li className="flex items-start">
              <span className="text-warm-brown mr-3 mt-1">•</span>
              <span>Two-way talk to settle them instantly</span>
            </li>
            <li className="flex items-start">
              <span className="text-warm-brown mr-3 mt-1">•</span>
              <span>Treat or meal dispensing from anywhere</span>
            </li>
            <li className="flex items-start">
              <span className="text-warm-brown mr-3 mt-1">•</span>
              <span>Reduces anxiety and loneliness during long days</span>
            </li>
            <li className="flex items-start">
              <span className="text-warm-brown mr-3 mt-1">•</span>
              <span>Simple setup — works in any home</span>
            </li>
            <li className="flex items-start">
              <span className="text-warm-brown mr-3 mt-1">•</span>
              <span>Designed for dogs of all ages, sizes, and temperaments</span>
            </li>
          </ul>
          <p className="text-lg text-warm-brown max-w-2xl mx-auto pt-4">
            Built to strengthen the bond between you and your dog.
          </p>
          <button
            onClick={() => onNavigate('features')}
            data-cta="See All Features Link"
            className="text-warm-brown hover:text-dark-brown transition-colors font-medium"
          >
            See all features →
          </button>
        </section>

        <section className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-dark-brown leading-snug whitespace-nowrap">
            Why Join the Early Access List
          </h2>
          <ul className="max-w-2xl mx-auto text-left space-y-2 text-lg text-dark-brown">
            <li className="flex items-start">
              <span className="text-warm-brown mr-3 mt-1">•</span>
              <span>Early access pricing when Kickstarter launches</span>
            </li>
            <li className="flex items-start">
              <span className="text-warm-brown mr-3 mt-1">•</span>
              <span>First access to reserve one of the initial units</span>
            </li>
            <li className="flex items-start">
              <span className="text-warm-brown mr-3 mt-1">•</span>
              <span>Exclusive behind-the-scenes updates and demos</span>
            </li>
            <li className="flex items-start">
              <span className="text-warm-brown mr-3 mt-1">•</span>
              <span>Priority access before public release</span>
            </li>
          </ul>
        </section>

        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-dark-brown">
            The Moment That Matters
          </h2>
          <p className="text-xl text-warm-brown leading-relaxed">
            When you're away, they wait for the sound of your voice and the sight of your face. That's the moment that settles them — the moment PetPortal™ brings back into their day.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-3xl sm:text-4xl font-serif text-dark-brown text-center">
            Common Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-warm-brown/10">
              <h3 className="text-xl font-medium text-dark-brown mb-2">
                When does PetPortal™ launch?
              </h3>
              <p className="text-warm-brown">
                Kickstarter opens soon. Early access subscribers get notified first.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-warm-brown/10">
              <h3 className="text-xl font-medium text-dark-brown mb-2">
                Will there be early access discounts?
              </h3>
              <p className="text-warm-brown">
                Yes. The early access list receives the lowest pricing.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-warm-brown/10">
              <h3 className="text-xl font-medium text-dark-brown mb-2">
                Does it work with any dog?
              </h3>
              <p className="text-warm-brown">
                PetPortal™ is designed for all sizes and breeds.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-warm-brown/10">
              <h3 className="text-xl font-medium text-dark-brown mb-2">
                Do I need any special setup?
              </h3>
              <p className="text-warm-brown">
                No. Just plug it in, connect to Wi-Fi, download the app, and you're ready.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-serif text-dark-brown">
            Stay Updated on the Launch
          </h2>
          <p className="text-base text-warm-brown max-w-2xl mx-auto">
            Get early access pricing and be first in line when PetPortal™ goes live.
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-lg border border-warm-brown/10 max-w-xl mx-auto">
            {!bottomSubmitted ? (
              <>
                <form id="bottom-email-form" onSubmit={handleBottomSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={bottomEmail}
                    onChange={(e) => setBottomEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full px-6 py-4 rounded-full border border-warm-brown/30 focus:outline-none focus:border-dark-brown focus:ring-2 focus:ring-dark-brown/20 transition-all text-dark-brown placeholder:text-warm-brown/50 bg-white"
                  />
                  <button
                    type="submit"
                    data-cta="Get Early Access Pricing Bottom"
                    className="w-full bg-dark-brown text-cream px-8 py-4 rounded-full font-medium hover:bg-warm-brown transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Get Early Access Pricing
                  </button>
                </form>

                {bottomError && (
                  <div className="mt-4 py-3 px-6 bg-red-50 border border-red-200 rounded-full text-red-800 text-sm">
                    {bottomError}
                  </div>
                )}

                <p className="text-xs text-warm-brown/70 mt-4">
                  No spam. No sharing. Only launch updates.
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
        </section>
      </div>
    </main>
  );
}
