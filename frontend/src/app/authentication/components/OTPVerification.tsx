'use client';
import { useState } from 'react';

interface Props {
  mobile: string;
  onVerified: () => void;
}

export default function OTPVerification({ mobile, onVerified }: Props) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const verifyOtp = async () => {
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, otp }),
    });

    if (res.ok) {
      onVerified();
    } else {
      setError('Invalid or expired OTP');
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Verify OTP</h2>
      <p className="text-sm text-text-secondary">
        OTP sent to <strong>{mobile}</strong>
      </p>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        placeholder="Enter 6-digit OTP"
        className="w-full px-4 py-3 border rounded-lg"
      />

      {error && <p className="text-sm text-error">{error}</p>}

      <button
        onClick={verifyOtp}
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg"
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </div>
  );
}
