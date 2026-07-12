import React from 'react';

export function Notification({ notification }: { notification: { type: 'success' | 'error', message: string } | null }) {
  if (!notification) return null;
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      backgroundColor: notification.type === 'success' ? '#28a745' : '#dc3545',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '500',
      transition: 'opacity 0.3s ease-in-out'
    }}>
      {notification.type === 'success' ? '✅' : '❌'} {notification.message}
    </div>
  );
}
