import { Heart, Activity, Brain, Phone, Cookie, Shield, BarChart3, Sparkles } from 'lucide-react';
import EmailCapture from '../components/EmailCapture';
import ShareButtons from '../components/ShareButtons';

interface HomeProps {
  onNavigate: (page: 'home' | 'pricing' | 'faq' | 'contact') => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-cream to-warm-gray/30">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-8">
          <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-center">
            <div className="relative md:hidden mb-2">
              <img
                src="/PETPORTAL11.png"
                alt="Dog interacting with PetPortal™"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-serif leading-tight text-dark-brown">
                Seeing your dog<br />
                makes your day.<br />
                <span className="text-warm-brown">Seeing you<br />
                makes their world.</span>
              </h1>
              <p className="text-xl text-warm-brown leading-relaxed">
                Emotional connection and well-being — for both of you. Anytime you're apart.
              </p>
              <p className="text-xl text-warm-brown leading-relaxed">
                Plus smart treat & meal dispensing — so you can reward, feed, and comfort them throughout the day.
              </p>
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={() => onNavigate('pricing')}
                  className="bg-dark-brown text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-warm-brown transition-all hover:scale-105 active:scale-95"
                >
                  Pre-Order PetPortal™
                </button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <img
                src="/PETPORTAL11.png"
                alt="Dog interacting with PetPortal™"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-12 md:py-16 bg-warm-gray">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 text-dark-brown">
            When you walk<br />out the door,<br />they're left wondering<br />when you'll come back.
          </h2>
          <p className="text-xl text-warm-brown leading-relaxed">
            They long for the sound of your voice and the sight of your face —<br />
            the moment that calms their whole world, brightens their heart…<br />
            and fills yours at the same time.
          </p>
        </div>
      </section>

      {/* The Moment Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 text-dark-brown">
            Sometimes all they<br />need is a<br />moment with you.
          </h2>
          <p className="text-xl text-warm-brown leading-relaxed">
            Your face appears. Their eyes<br />soften. That tiny tail wag? That's relief.<br />
            It's the same feeling they get when you walk through the door —<br />
            now possible anytime you're apart.
          </p>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-12 md:py-16 bg-warm-gray">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-dark-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-cream" />
              </div>
              <h3 className="text-2xl font-serif text-dark-brown">BarkSense™</h3>
              <p className="text-warm-brown leading-relaxed">
                Understands barking patterns — excitement,<br />
                distress, boredom, or alerting — and sends<br />
                you meaningful notifications.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-dark-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-cream" />
              </div>
              <h3 className="text-2xl font-serif text-dark-brown">MoodSense™</h3>
              <p className="text-warm-brown leading-relaxed">
                Analyzes posture, tail movement, pacing,<br />
                facial cues, and energy levels to recognize<br />
                happiness, restlessness, calm, or anxiety.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-dark-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-cream" />
              </div>
              <h3 className="text-2xl font-serif text-dark-brown">PottySense™</h3>
              <p className="text-warm-brown leading-relaxed">
                Identifies pre-potty behaviors like circling,<br />
                sniffing patterns, pausing, and tail positioning.<br />
                Optional extra cameras expand home coverage<br />
                for more accurate detection.
              </p>
            </div>
          </div>

          <p className="text-center text-lg text-warm-brown italic">
            All three systems learn your pet over time.
          </p>
        </div>
      </section>

      {/* Your Dog Can Call You Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-dark-brown rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-cream" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-dark-brown">
            Sometimes they<br />
            need you first.
          </h2>
          <p className="text-xl text-warm-brown leading-relaxed">
            When they're anxious, lonely, or looking for your face,<br />
            PetPortal<sup className="text-xs">™</sup> reaches out for you.<br />
            And if you can't answer, your own recorded video reassures them<br />
            in the way only you can.
          </p>
        </div>
      </section>

      {/* Treats & Training Section */}
      <section className="py-12 md:py-16 bg-warm-gray">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-dark-brown rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-8 h-8 text-cream" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-dark-brown">
            Training, bonding, reassuring —<br />now you can be part of their day,<br />even when you're not home.
          </h2>
          <p className="text-xl text-warm-brown leading-relaxed">
            Reinforce good habits, reward sweet moments,<br />
            or surprise them with a little love throughout the day —<br />
            all from wherever you are.
          </p>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-warm-gray p-8 rounded-3xl space-y-4 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-dark-brown rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-cream" />
              </div>
              <h3 className="text-2xl font-serif text-dark-brown">Guardian Mode</h3>
              <p className="text-warm-brown leading-relaxed">
                Alerts you to unusual pacing, excessive barking,<br />
                or behavior spikes that may indicate<br />
                anxiety or stress.
              </p>
            </div>

            <div className="bg-warm-gray p-8 rounded-3xl space-y-4 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-dark-brown rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-cream" />
              </div>
              <h3 className="text-2xl font-serif text-dark-brown">Behavior Logs</h3>
              <p className="text-warm-brown leading-relaxed">
                Automatically tracks trends in barking, movement,<br />
                mood signals, and potty cues — giving you<br />
                insight into their emotional well-being.
              </p>
            </div>

            <div className="bg-warm-gray p-8 rounded-3xl space-y-4 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-dark-brown rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-cream" />
              </div>
              <h3 className="text-2xl font-serif text-dark-brown">Anxiety Reduction</h3>
              <p className="text-warm-brown leading-relaxed">
                Soothing videos, calming tones, and your<br />
                prerecorded messages help your dog feel safe<br />
                when you're away.
              </p>
            </div>

            <div className="bg-warm-gray p-8 rounded-3xl space-y-4 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-dark-brown rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cream" />
              </div>
              <h3 className="text-2xl font-serif text-dark-brown">Training Sessions</h3>
              <p className="text-warm-brown leading-relaxed">
                Short AI-guided routines help reinforce<br />
                good habits with treat-based rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Order Email Capture Section */}
      <section className="py-12 md:py-16 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-6">
          <EmailCapture
            headline="Be first to get PetPortal™."
            subheadline="Kickstarter launches soon - get early access and exclusive pricing."
            disclaimer="No payment required. Reserve early access and early-bird pricing."
            page="home"
          />
        </div>
      </section>

      {/* Share Buttons Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <ShareButtons page="home" />
        </div>
      </section>
    </main>
  );
}
