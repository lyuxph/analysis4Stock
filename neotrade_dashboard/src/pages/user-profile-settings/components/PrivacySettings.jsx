import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PrivacySettings = ({ userData, onDataChange }) => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public', // public, followers, private
    portfolioSharing: 'followers', // public, followers, private
    forumActivity: 'public',
    investmentData: 'private',
    contactInfo: 'followers',
    activityStatus: true,
    searchable: true,
    dataCollection: {
      analytics: true,
      marketing: false,
      thirdParty: false,
      performance: true
    },
    dataRetention: '2years' // 1year, 2years, 5years, indefinite
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible to everyone', icon: 'Globe' },
    { value: 'followers', label: 'Followers Only', description: 'Only your followers can see', icon: 'Users' },
    { value: 'private', label: 'Private', description: 'Only you can see', icon: 'Lock' }
  ];

  const dataRetentionOptions = [
    { value: '1year', label: '1 Year', description: 'Data deleted after 1 year of inactivity' },
    { value: '2years', label: '2 Years', description: 'Data deleted after 2 years of inactivity' },
    { value: '5years', label: '5 Years', description: 'Data deleted after 5 years of inactivity' },
    { value: 'indefinite', label: 'Indefinite', description: 'Data kept until manually deleted' }
  ];

  const privacyCategories = [
    {
      id: 'profileVisibility',
      title: 'Profile Visibility',
      description: 'Who can see your profile information and bio'
    },
    {
      id: 'portfolioSharing',
      title: 'Portfolio Sharing',
      description: 'Who can see your portfolio performance and holdings'
    },
    {
      id: 'forumActivity',
      title: 'Forum Activity',
      description: 'Who can see your posts, comments, and forum interactions'
    },
    {
      id: 'investmentData',
      title: 'Investment Data',
      description: 'Who can see your detailed investment analytics and strategies'
    },
    {
      id: 'contactInfo',
      title: 'Contact Information',
      description: 'Who can see your email and phone number'
    }
  ];

  const handleVisibilityChange = (category, value) => {
    const newSettings = {
      ...privacySettings,
      [category]: value
    };
    setPrivacySettings(newSettings);
    onDataChange({ privacySettings: newSettings });
  };

  const handleToggleChange = (setting) => {
    const newSettings = {
      ...privacySettings,
      [setting]: !privacySettings[setting]
    };
    setPrivacySettings(newSettings);
    onDataChange({ privacySettings: newSettings });
  };

  const handleDataCollectionChange = (setting) => {
    const newSettings = {
      ...privacySettings,
      dataCollection: {
        ...privacySettings.dataCollection,
        [setting]: !privacySettings.dataCollection[setting]
      }
    };
    setPrivacySettings(newSettings);
    onDataChange({ privacySettings: newSettings });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === 'DELETE') {
      // Handle account deletion
      console.log('Account deletion requested');
      setShowDeleteModal(false);
    }
  };

  const getVisibilityIcon = (value) => {
    const option = visibilityOptions.find(opt => opt.value === value);
    return option ? option.icon : 'Globe';
  };

  const getVisibilityColor = (value) => {
    switch (value) {
      case 'public': return 'text-success';
      case 'followers': return 'text-warning';
      case 'private': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy Overview */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Privacy Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <Icon name="Shield" size={32} className="text-success mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary">Protected</div>
            <div className="text-sm text-text-secondary">Your data is secure</div>
          </div>
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <Icon name="Eye" size={32} className="text-primary mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary">Controlled</div>
            <div className="text-sm text-text-secondary">You control visibility</div>
          </div>
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <Icon name="Lock" size={32} className="text-secondary mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary">Encrypted</div>
            <div className="text-sm text-text-secondary">End-to-end encryption</div>
          </div>
        </div>
      </div>

      {/* Visibility Settings */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Visibility Settings</h3>
        
        <div className="space-y-6">
          {privacyCategories.map((category) => (
            <div key={category.id} className="border-b border-glass-border pb-6 last:border-b-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-text-primary">{category.title}</h4>
                  <p className="text-sm text-text-secondary">{category.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getVisibilityIcon(privacySettings[category.id])} 
                    size={16} 
                    className={getVisibilityColor(privacySettings[category.id])} 
                  />
                  <span className={`text-sm font-medium capitalize ${getVisibilityColor(privacySettings[category.id])}`}>
                    {privacySettings[category.id]}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {visibilityOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleVisibilityChange(category.id, option.value)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      privacySettings[category.id] === option.value
                        ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={option.icon} size={16} />
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-xs opacity-80">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Settings */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Activity Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Show Activity Status</h4>
              <p className="text-sm text-text-secondary">Let others see when you're online</p>
            </div>
            <button
              onClick={() => handleToggleChange('activityStatus')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                privacySettings.activityStatus ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                privacySettings.activityStatus ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Searchable Profile</h4>
              <p className="text-sm text-text-secondary">Allow others to find you in search results</p>
            </div>
            <button
              onClick={() => handleToggleChange('searchable')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                privacySettings.searchable ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                privacySettings.searchable ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Data Collection */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Data Collection Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Analytics Data</h4>
              <p className="text-sm text-text-secondary">Help improve the platform with usage analytics</p>
            </div>
            <button
              onClick={() => handleDataCollectionChange('analytics')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                privacySettings.dataCollection.analytics ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                privacySettings.dataCollection.analytics ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Marketing Communications</h4>
              <p className="text-sm text-text-secondary">Receive personalized investment insights and offers</p>
            </div>
            <button
              onClick={() => handleDataCollectionChange('marketing')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                privacySettings.dataCollection.marketing ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                privacySettings.dataCollection.marketing ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Third-Party Sharing</h4>
              <p className="text-sm text-text-secondary">Share anonymized data with research partners</p>
            </div>
            <button
              onClick={() => handleDataCollectionChange('thirdParty')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                privacySettings.dataCollection.thirdParty ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                privacySettings.dataCollection.thirdParty ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Performance Tracking</h4>
              <p className="text-sm text-text-secondary">Track performance for personalized recommendations</p>
            </div>
            <button
              onClick={() => handleDataCollectionChange('performance')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                privacySettings.dataCollection.performance ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                privacySettings.dataCollection.performance ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Data Retention */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Data Retention</h3>
        
        <div className="space-y-4">
          {dataRetentionOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleVisibilityChange('dataRetention', option.value)}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                privacySettings.dataRetention === option.value
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="font-medium mb-1">{option.label}</div>
              <div className="text-sm opacity-80">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Account Deletion */}
      <div className="glass-card p-6 rounded-lg border border-error/20">
        <h3 className="text-lg font-heading font-semibold text-error mb-6">Danger Zone</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <h4 className="font-medium text-error mb-2">Delete Account</h4>
            <p className="text-sm text-text-secondary mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/80 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 rounded-lg max-w-md w-full"
          >
            <div className="text-center mb-6">
              <Icon name="AlertTriangle" size={48} className="text-error mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">Delete Account</h3>
              <p className="text-text-secondary mb-4">
                This will permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <p className="text-sm text-text-secondary mb-4">
                Type <strong>DELETE</strong> to confirm:
              </p>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-error"
                placeholder="Type DELETE to confirm"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
                className="flex-1 px-4 py-2 bg-surface text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE'}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  deleteConfirmation === 'DELETE' ?'bg-error text-white hover:bg-error/80' :'bg-surface text-text-secondary cursor-not-allowed'
                }`}
              >
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PrivacySettings;