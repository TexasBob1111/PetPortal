import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Failed to initialize Supabase client for analytics:', err);
  }
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

export async function trackButtonClick(buttonName: string, page: string): Promise<void> {
  if (!supabase) {
    console.log('Analytics tracking skipped - Supabase not configured');
    return;
  }

  try {
    const { error } = await supabase
      .from('button_analytics')
      .insert({
        button_name: buttonName,
        page: page,
        session_id: getSessionId(),
        user_agent: navigator.userAgent,
      });

    if (error) {
      console.error('Analytics tracking error:', error);
    }
  } catch (err) {
    console.error('Failed to track button click:', err);
  }
}
