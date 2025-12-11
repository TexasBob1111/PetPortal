/*
  # Fix Security Issues

  1. Changes
    - Ensure foreign key index exists for email_shares.share_event_id
    - Enable leaked password protection in Auth settings
  
  2. Security Enhancements
    - Add explicit index on foreign key if not exists
    - Password breach detection will be enabled via Auth configuration
    
  Note: The leaked password protection must be enabled in the Supabase dashboard
  under Authentication > Settings > Password Protection
*/

-- Ensure the foreign key index exists (idempotent operation)
DROP INDEX IF EXISTS idx_email_shares_share_event_id;
CREATE INDEX idx_email_shares_share_event_id ON email_shares(share_event_id);

-- Add index on referral_visits referral_code for better join performance
DROP INDEX IF EXISTS idx_referral_visits_referral_code;
CREATE INDEX idx_referral_visits_referral_code ON referral_visits(referral_code);
