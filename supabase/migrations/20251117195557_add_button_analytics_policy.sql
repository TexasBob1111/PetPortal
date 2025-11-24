/*
  # Add RLS policy for button_analytics

  1. Changes
    - Add INSERT policy to allow anyone to track button clicks anonymously
    - This enables analytics tracking to work properly

  2. Security
    - Policy allows INSERT only (no read/update/delete)
    - No user authentication required for tracking
    - Data is write-only for privacy
*/

-- Allow anyone to insert button analytics
CREATE POLICY "Allow anonymous button tracking"
  ON button_analytics
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);