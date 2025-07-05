import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} color="white" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/portfolio-dashboard')}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full glass-card text-text-primary py-3 px-6 rounded-lg font-medium hover:bg-surface/50 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;