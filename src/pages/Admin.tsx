import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { signOut } from '../lib/auth';
import { Mail, Calendar, MapPin, Download, LogOut } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  page: string;
  status: string;
}

interface AdminProps {
  onLogout: () => void;
}

export default function Admin({ onLogout }: AdminProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      setError('You must be logged in to view this page');
      setLoading(false);
      return;
    }

    fetchSubscribers();
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('email_subscribers')
      .select('*')
      .eq('status', 'active')
      .order('subscribed_at', { ascending: false });

    if (fetchError) {
      setError('Unable to load subscribers. This page requires authentication.');
      setLoading(false);
      return;
    }

    setSubscribers(data || []);
    setLoading(false);
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Subscribed Date', 'Page'];
    const csvContent = [
      headers.join(','),
      ...subscribers.map(sub =>
        `${sub.email},${new Date(sub.subscribed_at).toLocaleDateString()},${sub.page}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const copyAllEmails = () => {
    const emails = subscribers.map(sub => sub.email).join(', ');
    navigator.clipboard.writeText(emails);
    alert('All emails copied to clipboard!');
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif text-dark-brown mb-2">Email Subscribers</h1>
            <p className="text-warm-brown">
              Total Active Subscribers: <span className="font-bold text-dark-brown">{subscribers.length}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={copyAllEmails}
              className="flex items-center gap-2 px-4 py-2 bg-warm-brown text-cream rounded-lg hover:bg-dark-brown transition-colors"
            >
              <Mail size={18} />
              Copy All
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-dark-brown text-cream rounded-lg hover:bg-warm-brown transition-colors"
            >
              <Download size={18} />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-dark-brown border-t-transparent"></div>
            <p className="mt-4 text-warm-brown">Loading subscribers...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="bg-warm-brown/10 border border-warm-brown/30 rounded-lg p-12 text-center">
            <Mail size={48} className="mx-auto text-warm-brown mb-4" />
            <p className="text-dark-brown text-lg">No subscribers yet</p>
            <p className="text-warm-brown mt-2">Subscribers will appear here once they sign up</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-dark-brown text-cream">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">Email</th>
                  <th className="px-6 py-4 text-left font-medium">Subscribed</th>
                  <th className="px-6 py-4 text-left font-medium">Source Page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-brown/20">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-warm-brown" />
                        <span className="text-dark-brown">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-warm-brown">
                        <Calendar size={16} />
                        <span>{new Date(subscriber.subscribed_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-warm-brown">
                        <MapPin size={16} />
                        <span className="capitalize">{subscriber.page}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
