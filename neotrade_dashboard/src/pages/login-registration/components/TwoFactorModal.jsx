import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TwoFactorModal = ({ onSubmit, onClose, isLoading }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      onSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(newCode);
    
    // Focus the next empty input or last input
    const nextEmptyIndex = newCode.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      onSubmit(fullCode);
    }
  };

  return (
    <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 w-full max-w-md shadow-strong animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Two-Factor Authentication
          </h2>
          <p className="text-text-secondary">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        {/* Code Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 bg-surface/50 border border-glass-border rounded-lg text-center text-xl font-bold text-text-primary focus:outline-none focus:border-primary transition-colors"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || code.some(digit => digit === '')}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Icon name="Loader2" size={20} className="animate-spin" />
            ) : (
              <>
                <span>Verify Code</span>
                <Icon name="ArrowRight" size={20} />
              </>
            )}
          </button>

          {/* Help Text */}
          <div className="text-center space-y-2">
            <p className="text-text-secondary text-sm">
              Didn't receive a code?{' '}
              <button type="button" className="text-primary hover:underline">
                Resend
              </button>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary text-sm"
            >
              Use a different method
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
    </div>
  );
};

export default TwoFactorModal;