"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit, Trash, Plus, LogOut } from 'lucide-react';
import { Notification } from '../../components/Notification';

export default function AdminDashboard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{type: 'success'|'error', message: string} | null>(null);
  const [deleteItem, setDeleteItem] = useState<string | null>(null);
  const router = useRouter();

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    fetch('/api/auth/verify').then(res => {
      if (!res.ok) {
        router.push('/administrator/login');
      } else {
        loadNews();
      }
    });
  }, [router]);

  const loadNews = async () => {
    const res = await fetch('/api/news');
    if (res.ok) {
      setNews(await res.json());
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    try {
      const res = await fetch(`/api/news/${deleteItem}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      showNotification('success', 'News item deleted!');
      loadNews();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete');
    } finally {
      setDeleteItem(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/administrator/login');
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <Notification notification={notification} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>News & Events Admin</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/administrator/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> Add New
          </Link>
          <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Type</th>
              <th style={{ padding: '12px' }}>Date</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item: any) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{item.title}</td>
                <td style={{ padding: '12px', textTransform: 'capitalize' }}>{item.type}</td>
                <td style={{ padding: '12px' }}>{new Date(item.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '12px', display: 'flex', gap: '12px' }}>
                  <Link href={`/administrator/edit/${item.id}`} style={{ color: '#0066cc' }} title="Edit">
                    <Edit size={20} />
                  </Link>
                  <button onClick={() => setDeleteItem(item.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }} title="Delete">
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
                  No news items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteItem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: 'white', padding: '24px', borderRadius: '12px',
            width: '90%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem' }}>Confirm Delete</h3>
            <p style={{ margin: '0 0 24px 0', color: '#555' }}>
              Are you sure you want to delete this news item? This action cannot be undone, and the associated image will be permanently removed.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setDeleteItem(null)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button>
              <button onClick={confirmDelete} className="btn" style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none' }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
