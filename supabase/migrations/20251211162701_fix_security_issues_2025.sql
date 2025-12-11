/*
  # Fix Security Issues

  1. Changes
    - Add missing index on email_shares.share_event_id foreign key
    - Remove duplicate RLS policy on button_analytics table
    
  2. Security Enhancements
    - Foreign key index improves query performance and prevents N+1 queries
    - Single clear policy for button analytics INSERT operations
    
  3. Notes
    - Auth DB connection strategy and leaked password protection require 
      configuration changes in Supabase Dashboard (not SQL)
*/

-- Add index on email_shares foreign key for optimal query performance
CREATE INDEX IF NOT EXISTS idx_email_shares_share_event_id 
ON email_shares(share_event_id);

-- Remove duplicate INSERT policy (keeping the more descriptive one)
DROP POLICY IF EXISTS "Anyone can insert analytics" ON button_analytics;
