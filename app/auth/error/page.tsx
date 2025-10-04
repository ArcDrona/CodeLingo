'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      switch (errorParam) {
        case 'OAuthSignin':
          setError('Error starting the OAuth sign-in flow.');
          break;
        case 'OAuthCallback':
          setError('Error during the OAuth callback.');
          break;
        case 'OAuthCreateAccount':
          setError('Error creating OAuth account.');
          break;
        case 'EmailCreateAccount':
          setError('Error creating email account.');
          break;
        case 'Callback':
          setError('Error during callback processing.');
          break;
        case 'AccessDenied':
          setError('Access denied.');
          break;
        default:
          setError('An unknown error occurred during authentication.');
          break;
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Authentication Error</h2>
          <p className="mt-2 text-center text-sm text-gray-600">{error}</p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <Link href="/auth/login" className="font-medium text-teal-600 hover:text-teal-500">
              Try signing in again
            </Link>
          </div>
          <div className="text-center">
            <Link href="/" className="font-medium text-teal-600 hover:text-teal-500">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}