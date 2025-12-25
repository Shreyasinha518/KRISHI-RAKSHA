'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthTabs from './AuthTabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import TrustIndicators from './TrustIndicators.tsx';
import TestimonialCard from './TestimonialCard';

interface LoginFormData {
  identifier: string;
  password: string;
}

interface RegisterFormData {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  farmLocation: string;
  landArea: string;
  primaryCrop: string;
  termsAccepted: boolean;
  // Bank details
  bankName?: string;
  accountHolderName?: string;
  ifscCode?: string;
  accountType?: 'savings' | 'current' | '';
  aadhaarNumber?: string;
}

interface Testimonial {
  name: string;
  location: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
}

const AuthenticationInteractive = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockCredentials = {
    identifier: 'farmer@agriinsure.com',
    password: 'farmer123'
  };

  const testimonials: Testimonial[] = [
  {
    name: 'Rajesh Kumar',
    location: 'Punjab',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d7437585-1763294112440.png",
    alt: 'Middle-aged Indian farmer in white turban and blue shirt standing in wheat field',
    rating: 5,
    text: 'AgriInsure helped me get instant payout when my crop failed. Very easy to use!'
  },
  {
    name: 'Lakshmi Devi',
    location: 'Tamil Nadu',
    image: "https://images.unsplash.com/photo-1709207516801-c8cd368ca089",
    alt: 'Indian woman farmer in green saree with red border smiling in rice paddy field',
    rating: 5,
    text: 'The AI prediction saved my harvest. I got early warning about pest attack.'
  }];


  const handleLogin = (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      if (
      data.identifier === mockCredentials.identifier &&
      data.password === mockCredentials.password)
      {
        if (isHydrated && typeof window !== 'undefined') {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userName', 'Rajesh Kumar');
        }
        router.push('/main-dashboard');
      } else {
        setErrorMessage(
          `Invalid credentials. Use email: ${mockCredentials.identifier} and password: ${mockCredentials.password}`
        );
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleRegister = (data: RegisterFormData) => {
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      if (isHydrated && typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', data.fullName);
      }
      router.push('/main-dashboard');
    }, 2000);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      if (isHydrated && typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', 'Social User');
      }
      router.push('/main-dashboard');
    }, 1500);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Form */}
          <div className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Welcome to KRISHI RAKSHA
              </h1>
              <p className="text-base font-body text-text-secondary">
                Secure your harvest with AI-powered insurance
              </p>
            </div>

            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {errorMessage &&
            <div className="mb-4 p-4 bg-error/10 border border-error rounded-lg">
                <p className="text-sm font-body text-error">{errorMessage}</p>
              </div>
            }

            {activeTab === 'login' ?
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} /> :

            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
            }

            <div className="mt-6">
             
            </div>

            {activeTab === 'login' &&
            <div className="mt-6 p-4 bg-accent/10 border border-accent rounded-lg">
                <p className="text-sm font-body text-foreground">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Email: {mockCredentials.identifier}
                  <br />
                  Password: {mockCredentials.password}
                </p>
              </div>
            }
          </div>

          {/* Right Column - Trust Indicators & Testimonials */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-card p-6">
              <TrustIndicators />
            </div>

            
            
          </div>
        </div>
      </div>
    </div>);

};

export default AuthenticationInteractive;
