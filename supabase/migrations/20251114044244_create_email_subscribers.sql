/*
  # Create Email Subscribers Table

  1. New Tables
    - `email_subscribers`
      - `id` (uuid, primary key) - Unique identifier for each subscriber
      - `email` (text, unique, not null) - Subscriber's email address
      - `subscribed_at` (timestamptz, default now()) - Timestamp when they subscribed
      - `page` (text) - Which page they subscribed from
      - `status` (text, default 'active') - Subscription status (active/unsubscribed)
  
  2. Security
    - Enable RLS on `email_subscribers` table
    - Add policy for anonymous users to insert their own email
    - Add policy for authenticated users to view all subscribers (admin access)
  
  3. Indexes
    - Index on email for fast lookups
    - Index on subscribed_at for sorting by date
*/

CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  page text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_subscribed_at ON email_subscribers(subscribed_at DESC);

-- Enable RLS
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (insert their email)
CREATE POLICY "Anyone can subscribe"
  ON email_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all subscribers (for admin dashboard)
CREATE POLICY "Authenticated users can view all subscribers"
  ON email_subscribers
  FOR SELECT
  TO authenticated
  USING (true);