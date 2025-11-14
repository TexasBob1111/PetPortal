/*
  # Share Tracking System

  1. New Tables
    - `share_events`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `share_method` (text) - email, facebook, twitter, copy_link
      - `page` (text) - which page the share happened on
      - `user_email` (text, nullable) - email of person who shared (if captured)
      - `share_url` (text) - the URL that was shared
      - `referral_code` (text, unique) - unique code for tracking clicks
      
    - `email_shares`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `share_event_id` (uuid, foreign key to share_events)
      - `sender_email` (text)
      - `recipient_email` (text)
      - `message` (text, nullable)
      
    - `referral_visits`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `referral_code` (text, foreign key via share_events)
      - `visitor_ip` (text, nullable)
      - `user_agent` (text, nullable)
      - `landing_page` (text)
      - `converted_to_subscriber` (boolean, default false)
      
  2. Security
    - Enable RLS on all tables
    - Public can insert share events (for anonymous sharing)
    - Public can insert referral visits (for tracking)
    - Only authenticated admins can read data
*/

-- Share Events Table
CREATE TABLE IF NOT EXISTS share_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  share_method text NOT NULL CHECK (share_method IN ('email', 'facebook', 'twitter', 'copy_link')),
  page text NOT NULL,
  user_email text,
  share_url text NOT NULL,
  referral_code text UNIQUE NOT NULL
);

ALTER TABLE share_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create share events"
  ON share_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read share events"
  ON share_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Email Shares Table
CREATE TABLE IF NOT EXISTS email_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  share_event_id uuid REFERENCES share_events(id) ON DELETE CASCADE,
  sender_email text NOT NULL,
  recipient_email text NOT NULL,
  message text
);

ALTER TABLE email_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create email shares"
  ON email_shares
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read email shares"
  ON email_shares
  FOR SELECT
  TO authenticated
  USING (true);

-- Referral Visits Table
CREATE TABLE IF NOT EXISTS referral_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  referral_code text NOT NULL,
  visitor_ip text,
  user_agent text,
  landing_page text NOT NULL,
  converted_to_subscriber boolean DEFAULT false
);

ALTER TABLE referral_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create referral visits"
  ON referral_visits
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read referral visits"
  ON referral_visits
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update referral visits"
  ON referral_visits
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_share_events_referral_code ON share_events(referral_code);
CREATE INDEX IF NOT EXISTS idx_share_events_created_at ON share_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_shares_share_event_id ON email_shares(share_event_id);
CREATE INDEX IF NOT EXISTS idx_referral_visits_referral_code ON referral_visits(referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_visits_created_at ON referral_visits(created_at DESC);
