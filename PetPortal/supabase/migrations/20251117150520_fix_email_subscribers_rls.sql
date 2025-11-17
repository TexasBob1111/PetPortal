/*
  # Fix Email Subscribers RLS Policy

  1. Changes
    - Drop the restrictive INSERT policy that only allows anon users
    - Create new INSERT policy that allows both anonymous and authenticated users
    - This ensures the email capture works regardless of authentication state

  2. Security
    - Still protected by RLS
    - Anyone can insert their own email (anon or authenticated)
    - Only authenticated users can view all subscribers (admin access remains unchanged)
*/

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Anyone can subscribe" ON email_subscribers;

-- Create a new policy that works for both anon and authenticated users
CREATE POLICY "Anyone can subscribe"
  ON email_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
