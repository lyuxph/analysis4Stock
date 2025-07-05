import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthForm from './components/AuthForm';
import SocialLogin from './components/SocialLogin';
import TwoFactorModal from './components/TwoFactorModal';
import BackgroundAnimation from './components/BackgroundAnimation';

const LoginRegistration = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for authentication
  const mockCredentials = {
    email: "investor@neotrade.com",
    password: "NeoTrade2024!",
    twoFactorCode: "123456"
  };

  const handleAuthSubmit = async (formData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (authMode === 'login') {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        setShowTwoFactor(true);
      } else {
        alert('Invalid credentials. Use: investor@neotrade.com / NeoTrade2024!');
      }
    } else {
      // Registration success
      setAuthMode('login');
      alert('Registration successful! Please login with your credentials.');
    }
    
    setIsLoading(false);
  };

  const handleTwoFactorSubmit = async (code) => {
    if (code === mockCredentials.twoFactorCode) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/portfolio-dashboard');
    } else {
      alert('Invalid 2FA code. Use: 123456');
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/portfolio-dashboard');
  };

  const handleForgotPassword = async (email) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Password reset link sent to your email!');
    setShowForgotPassword(false);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Animation */}
      <BackgroundAnimation />
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={24} color="white" />
          </div>
          <span className="text-2xl font-bold text-text-primary">
            NeoTrade
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="glass-card rounded-2xl p-8 shadow-strong animate-fade-in-up">
            {/* Mode Toggle */}
            <div className="flex bg-surface/50 rounded-lg p-1 mb-8">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  authMode === 'login' ?'bg-primary text-white shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  authMode === 'register' ?'bg-primary text-white shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-text-secondary">
                {authMode === 'login' ?'Sign in to access your investment dashboard' :'Join thousands of successful investors'
                }
              </p>
            </div>

            {/* Forgot Password Form */}
            {showForgotPassword ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-2">Reset Password</h2>
                  <p className="text-text-secondary text-sm mb-4">
                    Enter your email address and we'll send you a reset link.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-surface/50 border border-glass-border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleForgotPassword(e.target.value);
                        }
                      }}
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowForgotPassword(false)}
                      className="flex-1 glass-card text-text-primary py-3 px-4 rounded-lg font-medium hover:bg-surface/50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        const email = e.target.parentElement.parentElement.querySelector('input').value;
                        handleForgotPassword(email);
                      }}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Icon name="Loader2" size={20} className="animate-spin mx-auto" />
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Auth Form */}
                <AuthForm
                  mode={authMode}
                  onSubmit={handleAuthSubmit}
                  isLoading={isLoading}
                  onForgotPassword={() => setShowForgotPassword(true)}
                />

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-glass-border"></div>
                  <span className="px-4 text-text-secondary text-sm">or</span>
                  <div className="flex-1 h-px bg-glass-border"></div>
                </div>

                {/* Social Login */}
                <SocialLogin onSocialLogin={handleSocialLogin} isLoading={isLoading} />
              </>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-text-secondary text-sm">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>

      {/* Two Factor Modal */}
      {showTwoFactor && (
        <TwoFactorModal
          onSubmit={handleTwoFactorSubmit}
          onClose={() => setShowTwoFactor(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default LoginRegistration;