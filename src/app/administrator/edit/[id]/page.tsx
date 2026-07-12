"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminNewsForm } from '../../../../components/AdminNewsForm';

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/auth/verify').then(res => {
      if (!res.ok) {
        router.push('/administrator/login');
      } else {
        fetch(`/api/news/${params.id}`)
          .then(r => r.json())
          .then(d => {
            if (d.error) setError(d.error);
            else setData(d);
          });
      }
    });
  }, [router, params.id]);

  if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!data) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto' }}>
      <AdminNewsForm initialData={data} />
    </div>
  );
}
