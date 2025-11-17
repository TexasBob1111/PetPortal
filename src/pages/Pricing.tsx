import { Check } from 'lucide-react';
import EmailCapture from '../components/EmailCapture';
import ShareButtons from '../components/ShareButtons';
import { trackButtonClick } from '../lib/analytics';

interface PricingProps {
  onNavigate: (page: 'home' | 'pricing' | 'faq' | 'contact') => void;
}

export default function Pricing({ onNavigate }: PricingProps) {
  const scrollToEmailCapture = () => {
    trackButtonClick('reserve_yours_now', 'pricing');
    const emailSection = document.getElementById('email-capture-section');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="pt-10">
      {/* Header Section */}
      <section className="py-5 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-serif mb-4 text-dark-brown">
            Pre-Order Pricing &<br className="sm:hidden" /> Early Access
          </h1>
          <p className="text-xl text-warm-brown">
            Kickstarter launches soon — secure your spot and get the guaranteed lowest price.
          </p>
        </div>
      </section>

      {/* Product Image & Pricing */}
      <section className="py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative">
              <img
                src="/petportal24.png"
                alt="PetPortal™ Device"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>

            <div className="space-y-6">
              <div className="text-center md:text-left">
                <div className="text-warm-brown line-through text-2xl mb-2">
                  Retail Price: $249
                </div>
                <div className="text-5xl font-serif text-dark-brown mb-2">
                  $149
                </div>
                <div className="text-lg text-accent-warm font-medium">
                  Kickstarter Early-Bird Price
                </div>
              </div>
              <button
                onClick={scrollToEmailCapture}
                className="w-full bg-dark-brown text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-warm-brown transition-all hover:scale-105 active:scale-95 mt-6"
              >
                Reserve yours now
              </button>
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-8 text-dark-brown">
              Subscription Plans
            </h2>

            {/* Free Tier */}
            <div className="bg-warm-gray rounded-3xl p-8 md:p-10 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-serif text-dark-brown mb-2">Free Tier</h3>
                  <div className="text-4xl font-serif text-dark-brown">$0<span className="text-xl text-warm-brown">/month</span></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-dark-brown flex-shrink-0 mt-1" />
                  <span className="text-warm-brown">Scheduled treats and mealtimes</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-dark-brown flex-shrink-0 mt-1" />
                  <span className="text-warm-brown">On-device controls</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-dark-brown flex-shrink-0 mt-1" />
                  <span className="text-warm-brown">Fully offline operation — no camera, no internet, no AI</span>
                </div>
              </div>
            </div>

            {/* Core Plan */}
            <div className="bg-dark-brown rounded-3xl p-8 md:p-10 text-cream hover:shadow-2xl transition-shadow border-4 border-accent-warm relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-warm text-dark-brown px-6 py-2 rounded-full text-sm font-semibold">
                MOST POPULAR
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-serif mb-2">Core</h3>
                  <div className="text-4xl font-serif">$4.95<span className="text-xl text-warm-gray">/month</span></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-accent-warm font-medium mb-3">Includes everything in Free plus:</div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-accent-warm flex-shrink-0 mt-1" />
                  <span>Live video calling with your pet</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-accent-warm flex-shrink-0 mt-1" />
                  <span>Manual treat dispensing during calls</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-accent-warm flex-shrink-0 mt-1" />
                  <span>BarkSense™ basic barking alerts</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-accent-warm flex-shrink-0 mt-1" />
                  <span>MoodSense™ basic emotional summaries</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-accent-warm flex-shrink-0 mt-1" />
                  <span>Scheduled surprise treats</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-accent-warm flex-shrink-0 mt-1" />
                  <span>Basic training interactions</span>
                </div>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-warm-gray rounded-3xl p-8 md:p-10 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-serif text-dark-brown mb-2">Premium</h3>
                  <div className="text-4xl font-serif text-dark-brown">$9.95<span className="text-xl text-warm-brown">/month</span></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-dark-brown font-medium mb-3">Includes everything in Core plus:</div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-dark-brown flex-shrink-0 mt-1" />
                  <span className="text-warm-brown">PottySense™ potty-behavior detection</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-dark-brown flex-shrink-0 mt-1" />
                  <span className="text-warm-brown">Advanced MoodSense™ with daily emotional insights</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-dark-brown flex-shrink-0 mt-1" />
                  <span className="text-warm-brown">Guardian Mode alerts for unusual behavior</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-dark-brown flex-shrink-0 mt-1" />
                  <span className="text-warm-brown">Enhanced training modules</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-dark-brown flex-shrink-0 mt-1" />
                  <span className="text-warm-brown">Full behavior/mood/activity logs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Buttons Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <ShareButtons page="pricing" />
        </div>
      </section>

      {/* Email Capture for Pre-Order */}
      <section id="email-capture-section" className="py-12 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-6">
          <EmailCapture
            headline="Reserve Your Early Access"
            subheadline="Join the waitlist for exclusive early-bird pricing."
            disclaimer="You will not be charged today. This simply reserves your early-bird pricing before the Kickstarter launch."
            page="pricing"
            shouldPulse={true}
          />
        </div>
      </section>
    </main>
  );
}
