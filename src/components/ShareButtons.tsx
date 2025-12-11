import { Mail, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { trackButtonClick } from '../lib/analytics';
import { trackShareEvent, trackEmailShare, sendEmailShare } from '../lib/shareTracking';
import EmailShareModal from './EmailShareModal';

interface ShareButtonsProps {
  page: string;
}

export default function ShareButtons({ page }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const shareUrl = window.location.origin;
  const shareText = "Check out PetPortal™ - stay connected with your dog when you're apart! Video calling, treat dispensing, and AI-powered insights.";

  const handleCopyLink = async () => {
    trackButtonClick('share_copy_link', page);
    try {
      const referralCode = await trackShareEvent('copy_link', page);
      const urlWithRef = `${shareUrl}?ref=${referralCode}`;
      await navigator.clipboard.writeText(urlWithRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEmailShare = () => {
    trackButtonClick('share_email', page);
    setIsEmailModalOpen(true);
  };

  const handleEmailSubmit = async (senderEmail: string, recipientEmail: string, message: string) => {
    const referralCode = await trackShareEvent('email', page, senderEmail);

    const { supabase } = await import('../lib/supabase');
    const { data: shareEvent } = await supabase
      .from('share_events')
      .select('id')
      .eq('referral_code', referralCode)
      .maybeSingle();

    if (shareEvent) {
      await trackEmailShare(shareEvent.id, senderEmail, recipientEmail, message);
      await sendEmailShare(referralCode, senderEmail, recipientEmail, message);
    }
  };

  const handleFacebookShare = async () => {
    trackButtonClick('share_facebook', page);
    try {
      const referralCode = await trackShareEvent('facebook', page);
      const urlWithRef = `${shareUrl}?ref=${referralCode}`;
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlWithRef)}`, '_blank', 'width=600,height=400');
    } catch (err) {
      console.error('Failed to track Facebook share:', err);
    }
  };

  const handleTwitterShare = async () => {
    trackButtonClick('share_twitter', page);
    try {
      const referralCode = await trackShareEvent('twitter', page);
      const urlWithRef = `${shareUrl}?ref=${referralCode}`;
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(urlWithRef)}&text=${encodeURIComponent(shareText)}`, '_blank', 'width=600,height=400');
    } catch (err) {
      console.error('Failed to track Twitter share:', err);
    }
  };

  return (
    <>
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-serif text-[#3d3226]">
          Share with a Friend
        </h3>
        <p className="text-[#6b5d52] text-base">
          Know someone who'd love PetPortal™? Spread the word!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleEmailShare}
            data-cta="Share: Email"
            className="flex items-center gap-2 bg-[#e8e4de] hover:bg-[#d8d2cc] text-[#3d3226] px-5 py-3 rounded-lg text-sm font-normal transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
          <button
            onClick={handleFacebookShare}
            data-cta="Share: Facebook"
            className="flex items-center gap-2 bg-[#e8e4de] hover:bg-[#d8d2cc] text-[#3d3226] px-5 py-3 rounded-lg text-sm font-normal transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Facebook
          </button>
          <button
            onClick={handleTwitterShare}
            data-cta="Share: Twitter"
            className="flex items-center gap-2 bg-[#e8e4de] hover:bg-[#d8d2cc] text-[#3d3226] px-5 py-3 rounded-lg text-sm font-normal transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Twitter
          </button>
          <button
            onClick={handleCopyLink}
            data-cta="Share: Copy Link"
            className="flex items-center gap-2 bg-[#e8e4de] hover:bg-[#d8d2cc] text-[#3d3226] px-5 py-3 rounded-lg text-sm font-normal transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>

      <EmailShareModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSubmit={handleEmailSubmit}
        shareUrl={shareUrl}
      />
    </>
  );
}
