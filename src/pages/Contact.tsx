import { Mail } from 'lucide-react';
import { trackButtonClick } from '../lib/analytics';

export default function Contact() {
  return (
    <main className="pt-24">
      <section className="py-12 text-center bg-warm-gray">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center mb-8">
            <img
              src="/petportal19.png"
              alt="PetPortal - Stay connected with your pet"
              className="w-full max-w-2xl h-auto rounded-3xl shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-dark-brown">
            Contact Us
          </h1>
          <p className="text-xl text-warm-brown leading-relaxed mb-12">
            Have questions or feedback? We'd love to hear from you.
          </p>

          <div className="max-w-xl mx-auto">
            <div className="bg-cream rounded-2xl p-10 shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <Mail className="w-10 h-10 text-warm-brown" />
              </div>
              <h2 className="text-3xl font-serif text-dark-brown mb-4">Get in Touch</h2>
              <p className="text-warm-brown mb-8 text-lg">
                For support, product questions, feedback, or general inquiries
              </p>
              <a
                href="mailto:Hello@PetPortal.co"
                onClick={() => trackButtonClick('contact_email', 'contact')}
                data-cta="Contact Email"
                className="inline-block bg-dark-brown text-cream px-10 py-4 rounded-full text-lg font-medium hover:bg-warm-brown transition-all hover:scale-105 active:scale-95"
              >
                Hello@PetPortal.co
              </a>
            </div>
          </div>

          <div className="mt-16 max-w-2xl mx-auto">
            <p className="text-lg text-warm-brown leading-relaxed">
              We typically respond within 24-48 hours during business days.
              <br />
              Thank you for your interest in PetPortal™!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
