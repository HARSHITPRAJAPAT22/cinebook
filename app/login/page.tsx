'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const email = (form.email as any).value;
    const password = (form.password as any).value;

    if (isLogin) {
      // Login route
      const res = await fetch('/api/Auth/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('cinebook_token', data.token);
        setSuccessMsg('Login successful!');
        window.location.href = '/'; 
      } else {
        setErrorMsg(data.message || 'Login failed');
      }
    } else {
      // Signup route
      const name = (form.name as any)?.value;
      const confirmPassword = (form.confirmPassword as any)?.value;
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match');
        setLoading(false);
        return;
      }
      const res = await fetch('/api/Auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('cinebook_token', data.token);
        setSuccessMsg('Account created! Logging in...');
        window.location.href = '/'; // Redirect to home or dashboard
      }else if(data.status === 409) {
        setErrorMsg("User already exists with Google or Facebook account. Please sign in using those methods.");
      }
       else {
        setErrorMsg(data.message || 'Signup failed');
      }
    }
    setLoading(false);
  };

  // Google OAuth handler
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const scope = 'email profile';
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(scope)}`;

    window.addEventListener('message', async (event) => {
      if (event.origin === window.location.origin && event.data.googleOAuth) {
        const token = event.data.googleOAuth.accessToken;
        localStorage.setItem('googleAccessToken', token);

        // Fetch user info from Google
        const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userInfo = await res.json();

        // Store user in your database via signUp API
        const signupRes = await fetch('/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            googleId: userInfo.id,
            authProvider: 'google'
          })
        });
        const signupData = await signupRes.json();
        if (signupData.success) {
          localStorage.setItem('cinebook_token', signupData.token);
          window.location.href = '/';
        } else {
          toast.error(signupData.message || 'Google login failed');
        }
      }
    });

    window.open(url, 'google-oauth', 'width=500,height=600');
  };

  // Facebook OAuth handler
  const handleFacebookLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/facebook/callback`;
    const scope = 'email,public_profile';
    const url =
      `https://www.facebook.com/v18.0/dialog/oauth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(scope)}`;

    window.addEventListener('message', (event) => {
      if (event.origin === window.location.origin && event.data.facebookOAuth) {
        const token = event.data.facebookOAuth.accessToken;
        localStorage.setItem('facebookAccessToken', token);
      }
    });

    window.open(url, 'facebook-oauth', 'width=500,height=600');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {isLogin ? 'Sign in to your account' : 'Create new account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-medium text-red-600 hover:text-red-500"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <form id="auth-form" className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="John Doe"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                    </div>
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Confirm your password"
                  />
                </div>
              )}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-500">
                    Forgot password?
                  </Link>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
              {errorMsg && (
                <div className="mt-4 text-red-600 text-sm text-center">{errorMsg}</div>
              )}
              {successMsg && (
                <div className="mt-4 text-green-600 text-sm text-center">{successMsg}</div>
              )}
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-google-fill text-red-500"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Continue with Google</span>
                </button>
                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-facebook-fill text-blue-600"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Continue with Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
