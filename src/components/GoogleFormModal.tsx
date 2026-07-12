"use client";
import React, { useEffect, useState } from 'react';

export function GoogleFormModal({ isOpen, onClose, formUrl }: { isOpen: boolean, onClose: () => void, formUrl: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 9999,
      display: 'flex',
      alignItems: isMobile ? 'flex-end' : 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        width: '100%',
        maxWidth: isMobile ? '100%' : '800px',
        height: isMobile ? '85vh' : '80vh',
        borderRadius: isMobile ? '20px 20px 0 0' : '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Apply for Mentorship</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '0 8px' }}>&times;</button>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          {formUrl ? (
            <iframe 
              src={formUrl} 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Google Form"
            />
          ) : (
            <div style={{ padding: '40px', textAlign: 'center' }}>Form link not available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
