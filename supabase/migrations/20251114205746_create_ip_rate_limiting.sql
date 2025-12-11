/*
  # Create IP rate limiting table

  1. New Tables
    - `email_submission_ips`
      - `id` (uuid, primary key)
      - `ip_address` (text, not null) - The IP address that submitted an email
      - `submitted_at` (timestamptz, default now) - When the submission occurred
      - `email` (text, not null) - The email that was submitted
  
  2. Indexes
    - Index on `ip_address` and `submitted_at` for efficient rate limit queries
  
  3. Security
    - Enable RLS on `email_submission_ips` table
    - Add policy for service role only access (no public access needed)
  
  4. Notes
    - This table tracks IP addresses to prevent spam submissions
    - Records are used to enforce a limit of 2 submissions per IP per hour
*/

CREATE TABLE IF NOT EXISTS email_submission_ips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  email text NOT NULL,
  submitted_at timestamptz DEFAULT now()
);

-- Create index for efficient rate limit lookups
CREATE INDEX IF NOT EXISTS idx_email_submission_ips_lookup 
  ON email_submission_ips(ip_address, submitted_at DESC);

-- Enable RLS
ALTER TABLE email_submission_ips ENABLE ROW LEVEL SECURITY;

-- Only service role can access this table (for edge function use)
CREATE POLICY "Service role can manage IP tracking"
  ON email_submission_ips
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);