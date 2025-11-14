/*
  # Remove Unused Database Indexes

  1. Changes
    - Drop unused indexes that are redundant or not being utilized
    - Keep essential indexes for primary keys and unique constraints
    
  2. Indexes Being Removed
    - `idx_button_analytics_timestamp` - unused
    - `idx_button_analytics_button_name` - unused
    - `idx_button_analytics_page` - unused
    - `idx_email_subscribers_email` - redundant (unique constraint already exists)
    - `idx_email_subscribers_subscribed_at` - unused
    - `idx_share_events_referral_code` - redundant (unique constraint already exists)
    - `idx_share_events_created_at` - unused
    - `idx_email_shares_share_event_id` - unused
    - `idx_referral_visits_referral_code` - unused
    - `idx_referral_visits_created_at` - unused
    
  3. Notes
    - These indexes can be recreated later if query patterns change
    - Primary key and unique constraint indexes are retained
*/

-- Drop unused indexes on button_analytics
DROP INDEX IF EXISTS idx_button_analytics_timestamp;
DROP INDEX IF EXISTS idx_button_analytics_button_name;
DROP INDEX IF EXISTS idx_button_analytics_page;

-- Drop unused/redundant indexes on email_subscribers
DROP INDEX IF EXISTS idx_email_subscribers_email;
DROP INDEX IF EXISTS idx_email_subscribers_subscribed_at;

-- Drop unused/redundant indexes on share_events
DROP INDEX IF EXISTS idx_share_events_referral_code;
DROP INDEX IF EXISTS idx_share_events_created_at;

-- Drop unused indexes on email_shares
DROP INDEX IF EXISTS idx_email_shares_share_event_id;

-- Drop unused indexes on referral_visits
DROP INDEX IF EXISTS idx_referral_visits_referral_code;
DROP INDEX IF EXISTS idx_referral_visits_created_at;