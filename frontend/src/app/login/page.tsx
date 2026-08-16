'use client';

import React, { useState } from 'react';
import { User, Lock, Mail, Phone, Building2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'INDIVIDUAL' | 'INSTITUTION'>('INDIVIDUAL');
  const [collegeName, setCollegeName] = useState('');
  const [gstin, setGstin] = useState('');
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignup) {
        const payload: any = { email, phone, password, role };
        if (role === 'INSTITUTION') {
          payload.collegeName = collegeName;
          payload.gstin = gstin;
          payload.address = address;
          payload.designation = designation;
        }
        const res: any = await api.post('/auth/signup', payload);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('userRole', res.data.user.role);
        alert('Signup successful! SMS OTP sent for verification.');
        window.location.href = '/products';
      } else {
        const res: any = await api.post('/auth/login', { email, password });
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('userRole', res.data.user.role);
        alert('Login successful!');
        if (res.data.user.role === 'ADMIN') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/products';
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
        <p className="text-slate-600 text-sm">
          {isSignup ? 'Sign up for individual or institutional buyer access' : 'Login with your registered credentials'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3.5 rounded-lg flex items-center gap-2 text-sm border border-red-200">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-4">
        {isSignup && (
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 mb-4">
            <button
              type="button"
              onClick={() => setRole('INDIVIDUAL')}
              className={`py-2 text-xs font-bold rounded-md transition-colors ${role === 'INDIVIDUAL' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600'}`}
            >
              Individual Buyer
            </button>
            <button
              type="button"
              onClick={() => setRole('INSTITUTION')}
              className={`py-2 text-xs font-bold rounded-md transition-colors ${role === 'INSTITUTION' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600'}`}
            >
              Institution / Library
            </button>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-sky-500"
              placeholder="librarian@medicalcollege.edu.in"
            />
          </div>
        </div>

        {isSignup && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone (for SMS OTP & Updates)</label>
            <div className="relative">
              <Phone className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-sky-500"
                placeholder="+919876543210"
              />
            </div>
          </div>
        )}

        {isSignup && role === 'INSTITUTION' && (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Medical College / Institute Name *</label>
              <input
                type="text"
                required
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none"
                placeholder="AIIMS / Kasturba Medical College"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">College GSTIN (Optional)</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none"
                placeholder="07AAAAA0000A1Z5"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-sky-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-400 text-white font-bold py-3 rounded-lg shadow transition-colors"
        >
          {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-xs text-sky-600 hover:underline font-semibold"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}
