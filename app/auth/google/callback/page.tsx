// filepath: c:\Users\Lenovo\Desktop\cinebook\app\auth\google\callback\page.tsx
'use client';

import { useEffect } from 'react';

export default function GoogleCallback() {
  useEffect(() => {
    // Get token from URL hash
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const accessToken = params.get('access_token');
    if (accessToken) {
      // Send token to opener window
      window.opener.postMessage({ googleOAuth: { accessToken } }, window.location.origin);
      window.close();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="text-lg text-gray-700">Completing Google login...</span>
    </div>
  );
}