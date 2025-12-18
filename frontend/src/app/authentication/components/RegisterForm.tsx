'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading: boolean;
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
}

interface FormErrors {
  [key: string]: string | undefined;
}

const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    farmLocation: '',
    landArea: '',
    primaryCrop: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const indianStates = [
    'Andhra Pradesh',
    'Bihar',
    'Gujarat',
    'Haryana',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Punjab',
    'Rajasthan',
    'Tamil Nadu',
    'Telangana',
    'Uttar Pradesh',
    'West Bengal',
  ];

  const cropTypes = [
    'Rice',
    'Wheat',
    'Cotton',
    'Sugarcane',
    'Maize',
    'Pulses',
    'Groundnut',
    'Soybean',
    'Millets',
    'Vegetables',
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.farmLocation) {
      newErrors.farmLocation = 'Farm location is required';
    }

    if (!formData.landArea) {
      newErrors.landArea = 'Land area is required';
    } else if (isNaN(Number(formData.landArea)) || Number(formData.landArea) <= 0) {
      newErrors.landArea = 'Enter valid land area';
    }

    if (!formData.primaryCrop) {
      newErrors.primaryCrop = 'Primary crop is required';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-body font-medium text-foreground mb-2">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
            errors.fullName ? 'border-error' : 'border-input'
          }`}
          placeholder="Enter your full name"
          disabled={isLoading}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-error font-body">{errors.fullName}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="mobile" className="block text-sm font-body font-medium text-foreground mb-2">
            Mobile Number
          </label>
          <input
            id="mobile"
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
              errors.mobile ? 'border-error' : 'border-input'
            }`}
            placeholder="10-digit mobile"
            disabled={isLoading}
          />
          {errors.mobile && (
            <p className="mt-1 text-sm text-error font-body">{errors.mobile}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-body font-medium text-foreground mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
              errors.email ? 'border-error' : 'border-input'
            }`}
            placeholder="your@email.com"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error font-body">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-body font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className={`w-full px-4 py-3 pr-12 border rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                errors.password ? 'border-error' : 'border-input'
              }`}
              placeholder="Min 6 characters"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-colors duration-150"
              disabled={isLoading}
            >
              <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error font-body">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-body font-medium text-foreground mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className={`w-full px-4 py-3 pr-12 border rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                errors.confirmPassword ? 'border-error' : 'border-input'
              }`}
              placeholder="Re-enter password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-colors duration-150"
              disabled={isLoading}
            >
              <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-error font-body">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="farmLocation" className="block text-sm font-body font-medium text-foreground mb-2">
          Farm Location (State)
        </label>
        <select
          id="farmLocation"
          value={formData.farmLocation}
          onChange={(e) => handleChange('farmLocation', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
            errors.farmLocation ? 'border-error' : 'border-input'
          }`}
          disabled={isLoading}
        >
          <option value="">Select state</option>
          {indianStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.farmLocation && (
          <p className="mt-1 text-sm text-error font-body">{errors.farmLocation}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="landArea" className="block text-sm font-body font-medium text-foreground mb-2">
            Land Area (Acres)
          </label>
          <input
            id="landArea"
            type="number"
            step="0.1"
            value={formData.landArea}
            onChange={(e) => handleChange('landArea', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
              errors.landArea ? 'border-error' : 'border-input'
            }`}
            placeholder="Enter land area"
            disabled={isLoading}
          />
          {errors.landArea && (
            <p className="mt-1 text-sm text-error font-body">{errors.landArea}</p>
          )}
        </div>

        <div>
          <label htmlFor="primaryCrop" className="block text-sm font-body font-medium text-foreground mb-2">
            Primary Crop
          </label>
          <select
            id="primaryCrop"
            value={formData.primaryCrop}
            onChange={(e) => handleChange('primaryCrop', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
              errors.primaryCrop ? 'border-error' : 'border-input'
            }`}
            disabled={isLoading}
          >
            <option value="">Select crop</option>
            {cropTypes.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
          {errors.primaryCrop && (
            <p className="mt-1 text-sm text-error font-body">{errors.primaryCrop}</p>
          )}
        </div>
      </div>

      <div>
        <label className="flex items-start space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => handleChange('termsAccepted', e.target.checked)}
            className="w-4 h-4 mt-1 text-primary border-input rounded focus:ring-2 focus:ring-primary"
          />
          <span className="text-sm font-body text-text-secondary">
            I accept the{' '}
            <button type="button" className="text-primary hover:text-primary/80">
              Terms and Conditions
            </button>{' '}
            and{' '}
            <button type="button" className="text-primary hover:text-primary/80">
              Privacy Policy
            </button>
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="mt-1 text-sm text-error font-body">{errors.termsAccepted}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-body font-medium text-base hover:bg-primary/90 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            <span>Creating Account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
