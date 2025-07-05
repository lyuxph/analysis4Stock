// src/pages/login-registration/components/AuthForm.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import RiskProfileSurvey from './RiskProfileSurvey';

const AuthForm = ({ mode, onSubmit, isLoading, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    experienceLevel: 'beginner',
    rememberMe: false,
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [showRiskProfile, setShowRiskProfile] = useState(false);
  const [riskProfile, setRiskProfile] = useState(null);

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-5 years)' },
    { value: 'advanced', label: 'Advanced (5+ years)' },
    { value: 'professional', label: 'Professional Trader' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'password' && mode === 'register') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'register') {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }

      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (mode === 'register') {
        // Show risk profile survey for registration
        setShowRiskProfile(true);
      } else {
        // Direct submit for login
        onSubmit(formData);
      }
    }
  };

  const handleRiskProfileComplete = (profile) => {
    setRiskProfile(profile);
    // Combine form data with risk profile
    const completeRegistrationData = {
      ...formData,
      riskProfile: profile
    };
    onSubmit(completeRegistrationData);
  };

  const handleBackFromRiskProfile = () => {
    setShowRiskProfile(false);
  };

  // Show risk profile survey for registration
  if (mode === 'register' && showRiskProfile) {
    return (
      <RiskProfileSurvey 
        onComplete={handleRiskProfileComplete}
        onBack={handleBackFromRiskProfile}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name - Register only */}
      {mode === 'register' && (
        <div>
          <label className="block text-text-primary text-sm font-medium mb-2">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full bg-surface/50 border rounded-lg px-4 py-3 pl-12 text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors ${
                errors.fullName ? 'border-error' : 'border-glass-border'
              }`}
            />
            <Icon 
              name="User" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
          </div>
          {errors.fullName && (
            <p className="text-error text-sm mt-1">{errors.fullName}</p>
          )}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-text-primary text-sm font-medium mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={`w-full bg-surface/50 border rounded-lg px-4 py-3 pl-12 text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors ${
              errors.email ? 'border-error' : 'border-glass-border'
            }`}
          />
          <Icon 
            name="Mail" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
        </div>
        {errors.email && (
          <p className="text-error text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone - Register only */}
      {mode === 'register' && (
        <div>
          <label className="block text-text-primary text-sm font-medium mb-2">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className={`w-full bg-surface/50 border rounded-lg px-4 py-3 pl-12 text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors ${
                errors.phone ? 'border-error' : 'border-glass-border'
              }`}
            />
            <Icon 
              name="Phone" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
          </div>
          {errors.phone && (
            <p className="text-error text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      )}

      {/* Password */}
      <div>
        <label className="block text-text-primary text-sm font-medium mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className={`w-full bg-surface/50 border rounded-lg px-4 py-3 pl-12 pr-12 text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors ${
              errors.password ? 'border-error' : 'border-glass-border'
            }`}
          />
          <Icon 
            name="Lock" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.password && (
          <p className="text-error text-sm mt-1">{errors.password}</p>
        )}
        
        {/* Password Strength - Register only */}
        {mode === 'register' && formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-surface/50 rounded-full h-2">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
              <span className="text-xs text-text-secondary">
                {getPasswordStrengthText()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password - Register only */}
      {mode === 'register' && (
        <div>
          <label className="block text-text-primary text-sm font-medium mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className={`w-full bg-surface/50 border rounded-lg px-4 py-3 pl-12 pr-12 text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors ${
                errors.confirmPassword ? 'border-error' : 'border-glass-border'
              }`}
            />
            <Icon 
              name="Lock" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      )}

      {/* Experience Level - Register only */}
      {mode === 'register' && (
        <div>
          <label className="block text-text-primary text-sm font-medium mb-2">
            Investment Experience
          </label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleInputChange}
            className="w-full bg-surface/50 border border-glass-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
          >
            {experienceLevels.map(level => (
              <option key={level.value} value={level.value} className="bg-surface text-text-primary">
                {level.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Remember Me / Accept Terms */}
      <div className="space-y-3">
        {mode === 'login' && (
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary bg-surface/50 border-glass-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="ml-2 text-text-secondary text-sm">Remember me</span>
          </label>
        )}

        {mode === 'register' && (
          <div>
            <label className="flex items-start">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary bg-surface/50 border-glass-border rounded focus:ring-primary focus:ring-2 mt-0.5"
              />
              <span className="ml-2 text-text-secondary text-sm">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-error text-sm mt-1">{errors.acceptTerms}</p>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <Icon name="Loader2" size={20} className="animate-spin" />
        ) : (
          <>
            <span>{mode === 'login' ? 'Sign In' : 'Continue to Risk Profile'}</span>
            <Icon name="ArrowRight" size={20} />
          </>
        )}
      </button>

      {/* Forgot Password - Login only */}
      {mode === 'login' && (
        <div className="text-center">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-primary hover:underline text-sm"
          >
            Forgot your password?
          </button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;