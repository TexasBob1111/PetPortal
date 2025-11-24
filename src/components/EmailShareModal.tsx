import { X } from 'lucide-react';
import { useState } from 'react';

interface EmailShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (senderEmail: string, recipientEmail: string, message: string) => Promise<void>;
  shareUrl: string;
}

export default function EmailShareModal({ isOpen, onClose, onSubmit, shareUrl }: EmailShareModalProps) {
  const [senderEmail, setSenderEmail] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onSubmit(senderEmail, recipientEmail, message);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSenderEmail('');
        setRecipientEmail('');
        setMessage('');
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError('Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setSenderEmail('');
      setRecipientEmail('');
      setMessage('');
      setSuccess(false);
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div
        className="bg-cream rounded-3xl max-w-lg w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-warm-brown hover:text-dark-brown transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-serif text-dark-brown mb-6">Share via Email</h2>

        {success ? (
          <div className="text-center py-8">
            <p className="text-2xl text-dark-brown mb-2">✓ Sent!</p>
            <p className="text-warm-brown">Your friend will receive the email shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="senderEmail" className="block text-sm font-medium text-dark-brown mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="senderEmail"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-warm-gray focus:border-dark-brown focus:outline-none transition-colors"
                placeholder="you@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="recipientEmail" className="block text-sm font-medium text-dark-brown mb-2">
                Friend's Email
              </label>
              <input
                type="email"
                id="recipientEmail"
                required
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-warm-gray focus:border-dark-brown focus:outline-none transition-colors"
                placeholder="friend@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-dark-brown mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-warm-gray focus:border-dark-brown focus:outline-none transition-colors resize-none"
                placeholder="Add a personal note..."
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 rounded-full border-2 border-warm-gray text-warm-brown hover:border-dark-brown hover:text-dark-brown transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-dark-brown text-cream px-6 py-3 rounded-full font-medium hover:bg-warm-brown transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
