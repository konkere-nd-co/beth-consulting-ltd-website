"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNewsForm } from '../../../components/AdminNewsForm';

export default function NewNewsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    fetch('/api/auth/verify').then(res => {
      if (!res.ok) router.push('/administrator/login');
      else setAuth(true);
    });
  }, [router]);

  if (!auth) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto' }}>
      <AdminNewsForm />
    </div>
  );
}
