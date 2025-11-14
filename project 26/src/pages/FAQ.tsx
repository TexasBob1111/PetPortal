import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { trackButtonClick } from '../lib/analytics';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-warm-brown/20 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-accent-warm transition-colors group"
      >
        <span className="text-lg font-medium text-dark-brown group-hover:text-accent-warm transition-colors pr-8">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-warm-brown flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-6 text-warm-brown leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

interface FAQProps {
  onNavigate: (page: 'home' | 'pricing' | 'faq' | 'contact') => void;
}

export default function FAQ({ onNavigate }: FAQProps) {
  const handlePreOrder = () => {
    trackButtonClick('preorder_faq', 'faq');
    onNavigate('pricing');
    setTimeout(() => {
      const emailSection = document.getElementById('email-capture-section');
      if (emailSection) {
        emailSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  const deviceBasics = [
    {
      question: 'What is PetPortal™?',
      answer: "PetPortal™ is a smart device that lets your dog see you, hear you, and feel comforted when you're away — while also giving you insight into their behavior and well-being. It includes feeding and treat dispensing capabilities to keep your pet nourished and rewarded throughout the day.",
    },
    {
      question: 'Can my dog really see me?',
      answer: "Yes. Dogs recognize faces on screens and respond to live video — especially yours.",
    },
    {
      question: 'Does it work with all pet sizes?',
      answer: 'Yes. Camera angle may be adjusted.',
    },
    {
      question: 'What treats can I use?',
      answer: 'Any small, dry, non-crumbly treats or standard kibble.',
    },
    {
      question: 'Can it dispense meals?',
      answer: "Yes. Meal dispensing is optional — PetPortal™ works as both a treat dispenser and programmable feeder.",
    },
  ];

  const aiFeatures = [
    {
      question: 'What is BarkSense™?',
      answer: 'It analyzes bark patterns to distinguish excitement, signaling, boredom, and possible distress.',
    },
    {
      question: 'What is MoodSense™?',
      answer: "It detects posture, movement, facial cues, and energy levels to understand your dog's emotional state.",
    },
    {
      question: 'What is PottySense™?',
      answer: 'It identifies pre-potty signals such as circling, sniffing, or hesitation, helping prevent accidents.',
    },
    {
      question: 'How accurate is the AI?',
      answer: "It improves continuously as it learns your dog's unique behaviors over time.",
    },
  ];

  const connectivity = [
    {
      question: 'Does PetPortal™ require Wi-Fi?',
      answer: "Yes — live video and AI updates rely on a secure Wi-Fi connection.",
    },
    {
      question: 'Can multiple people use the app?',
      answer: "Up to three logins per subscription.",
    },
  ];

  const safety = [
    {
      question: 'What if power goes out?',
      answer: 'Battery backup if using for food.',
    },
    {
      question: 'Can my dog knock it over?',
      answer: 'It has a stable base and low center of gravity designed for safety.',
    },
  ];

  const kickstarter = [
    {
      question: 'When does Kickstarter launch?',
      answer: "Soon — join the early-access list to be notified.",
    },
    {
      question: 'Am I charged today?',
      answer: 'No. Signup only reserves your early-bird pricing.',
    },
    {
      question: 'Why Kickstarter?',
      answer: 'To give early supporters the lowest price and help finalize production.',
    },
    {
      question: 'What does "early access" mean?',
      answer: "You'll be notified first and receive the best possible price.",
    },
  ];

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-8 text-center bg-warm-gray">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-dark-brown">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-warm-brown">
            Everything you need to know about PetPortal™
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* Device Basics */}
          <div>
            <h2 className="text-3xl font-serif text-dark-brown mb-8">Device Basics</h2>
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              {deviceBasics.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* AI Features */}
          <div>
            <h2 className="text-3xl font-serif text-dark-brown mb-8">AI Features</h2>
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              {aiFeatures.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Connectivity */}
          <div>
            <h2 className="text-3xl font-serif text-dark-brown mb-8">Connectivity</h2>
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              {connectivity.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Safety & Use */}
          <div>
            <h2 className="text-3xl font-serif text-dark-brown mb-8">Safety & Use</h2>
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              {safety.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Kickstarter & Pre-Order */}
          <div>
            <h2 className="text-3xl font-serif text-dark-brown mb-8">Kickstarter & Pre-Order</h2>
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              {kickstarter.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Image */}
      <section className="py-6">
        <div className="max-w-5xl mx-auto px-6">
          <img
            src="/petportal20.png"
            alt="Pet video calling with PetPortal"
            className="w-full h-auto rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      {/* Pre-Order CTA */}
      <section className="py-8 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <button
            onClick={handlePreOrder}
            className="bg-dark-brown text-cream px-12 py-5 rounded-full text-lg font-medium hover:bg-warm-brown transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Pre-Order PetPortal™
          </button>
        </div>
      </section>

      {/* Share Buttons Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <ShareButtons page="faq" />
        </div>
      </section>
    </main>
  );
}
