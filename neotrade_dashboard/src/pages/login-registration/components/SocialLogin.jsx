import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-red-500/10 hover:border-red-500/20',
      textColor: 'hover:text-red-400'
    },
    {
      name: 'Apple',
      icon: 'Apple',
      color: 'hover:bg-gray-500/10 hover:border-gray-500/20',
      textColor: 'hover:text-gray-400'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders.map((provider) => (
        <button
          key={provider.name}
          onClick={() => onSocialLogin(provider.name.toLowerCase())}
          disabled={isLoading}
          className={`w-full glass-card border border-glass-border rounded-lg py-3 px-4 flex items-center justify-center space-x-3 transition-all duration-200 ${provider.color} ${provider.textColor} disabled:opacity-50`}
        >
          <Icon name={provider.icon} size={20} className="text-current" />
          <span className="font-medium text-text-primary">
            Continue with {provider.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SocialLogin;