import { useState } from 'react';
import { trackButtonClick } from '../lib/analytics';
import { supabase } from '../lib/supabase';
import { markReferralAsConverted } from '../lib/shareTracking';

interface EmailCaptureProps {
  headline: string;
  subheadline: string;
  disclaimer?: string;
  page?: string;
  shouldPulse?: boolean;
}

export default function EmailCapture({ headline, subheadline, disclaimer, page = 'unknown', shouldPulse = false }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email) {
      trackButtonClick('email_submit', page);

      if (typeof gtag === 'function') {
        gtag('event', 'lead_submit', {
          event_category: 'lead',
          event_label: page
        });
      }

      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: page,
          content_category: 'email_signup'
        });
      }

      const { error: insertError } = await supabase
        .from('email_subscribers')
        .insert([{ email, page }]);

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
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-serif mb-3 text-dark-brown">{headline}</h2>
      <p className="text-lg text-warm-brown mb-6">{subheadline}</p>

      {!submitted ? (
        <>
          <form id="emailcapture-form" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-4 rounded-full border border-warm-brown/30 focus:outline-none focus:border-dark-brown focus:ring-2 focus:ring-dark-brown/20 transition-all text-dark-brown placeholder:text-warm-brown/50"
            />
            <button
              type="submit"
              data-cta="Notify Me at Launch"
              className={`bg-dark-brown text-cream px-8 py-4 rounded-full font-medium hover:bg-warm-brown transition-all hover:scale-105 active:scale-95 whitespace-nowrap ${
                shouldPulse ? 'animate-pulse shadow-lg shadow-dark-brown/50' : ''
              }`}
            >
              Notify Me at Launch
            </button>
          </form>
          {error && (
            <div className="py-3 px-6 bg-red-50 border border-red-200 rounded-full text-red-800 text-sm mb-4">
              {error}
            </div>
          )}
        </>
      ) : (
        <div className="py-4 px-6 bg-green-50 border border-green-200 rounded-full text-green-800 font-medium">
          Thanks! We'll notify you at launch.
        </div>
      )}

      {disclaimer && (
        <p className="text-sm text-warm-brown/70">{disclaimer}</p>
      )}
    </div>
  );
}
