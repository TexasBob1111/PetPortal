import { supabase } from './supabase';

export function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function trackShareEvent(
  shareMethod: 'email' | 'facebook' | 'twitter' | 'copy_link',
  page: string,
  userEmail?: string
): Promise<string> {
  const referralCode = generateReferralCode();
  const shareUrl = `${window.location.origin}?ref=${referralCode}`;

  const { error } = await supabase
    .from('share_events')
    .insert({
      share_method: shareMethod,
      page,
      user_email: userEmail,
      share_url: shareUrl,
      referral_code: referralCode,
    });

  if (error) {
    console.error('Failed to track share event:', error);
    throw error;
  }

  return referralCode;
}

export async function trackEmailShare(
  shareEventId: string,
  senderEmail: string,
  recipientEmail: string,
  message?: string
): Promise<void> {
  const { error } = await supabase
    .from('email_shares')
    .insert({
      share_event_id: shareEventId,
      sender_email: senderEmail,
      recipient_email: recipientEmail,
      message: message || null,
    });

  if (error) {
    console.error('Failed to track email share:', error);
    throw error;
  }
}

export async function trackReferralVisit(
  referralCode: string,
  landingPage: string
): Promise<void> {
  const { error } = await supabase
    .from('referral_visits')
    .insert({
      referral_code: referralCode,
      user_agent: navigator.userAgent,
      landing_page: landingPage,
      converted_to_subscriber: false,
    });

  if (error) {
    console.error('Failed to track referral visit:', error);
  }
}

export async function markReferralAsConverted(referralCode: string): Promise<void> {
  const { error } = await supabase
    .from('referral_visits')
    .update({ converted_to_subscriber: true })
    .eq('referral_code', referralCode)
    .eq('converted_to_subscriber', false);

  if (error) {
    console.error('Failed to mark referral as converted:', error);
  }
}

export async function sendEmailShare(
  referralCode: string,
  senderEmail: string,
  recipientEmail: string,
  message?: string
): Promise<void> {
  const shareUrl = `${window.location.origin}?ref=${referralCode}`;
  const defaultMessage = "Check out PetPortal™ - stay connected with your dog when you're apart! Video calling, treat dispensing, and AI-powered insights.";

  const emailBody = `
${message || defaultMessage}

${shareUrl}

Shared by ${senderEmail}
  `.trim();

  const subject = 'Check out PetPortal™';
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  window.open(mailtoLink, '_blank');
}
