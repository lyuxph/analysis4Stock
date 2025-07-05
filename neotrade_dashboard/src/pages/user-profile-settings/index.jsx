import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import AccountSettings from './components/AccountSettings';
import SubscriptionSettings from './components/SubscriptionSettings';
import NotificationSettings from './components/NotificationSettings';
import PrivacySettings from './components/PrivacySettings';
import SecuritySettings from './components/SecuritySettings';
import InvestmentPreferences from './components/InvestmentPreferences';
import ThemeCustomization from './components/ThemeCustomization';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: `Experienced investor with 8+ years in equity markets. Focused on growth stocks and tech sector investments. Active community member sharing insights on market trends and investment strategies.`,
    investmentExperience: "advanced",
    riskTolerance: "moderate",
    preferredSectors: ["technology", "healthcare", "finance"],
    tradingStyle: "swing",
    subscription: "premium",
    joinDate: "2022-03-15",
    totalPosts: 127,
    totalStrategies: 23,
    followers: 1847
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: 'User' },
    { id: 'subscription', label: 'Subscription', icon: 'Crown' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'security', label: 'Security', icon: 'Lock' },
    { id: 'preferences', label: 'Investment', icon: 'Target' },
    { id: 'theme', label: 'Theme', icon: 'Palette' }
  ];

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setSaveSuccess(true);
    setHasUnsavedChanges(false);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDataChange = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
    setHasUnsavedChanges(true);
  };

  const renderTabContent = () => {
    const tabProps = {
      userData,
      onDataChange: handleDataChange
    };

    switch (activeTab) {
      case 'account':
        return <AccountSettings {...tabProps} />;
      case 'subscription':
        return <SubscriptionSettings {...tabProps} />;
      case 'notifications':
        return <NotificationSettings {...tabProps} />;
      case 'privacy':
        return <PrivacySettings {...tabProps} />;
      case 'security':
        return <SecuritySettings {...tabProps} />;
      case 'preferences':
        return <InvestmentPreferences {...tabProps} />;
      case 'theme':
        return <ThemeCustomization {...tabProps} />;
      default:
        return <AccountSettings {...tabProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="lg:ml-60 pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image 
                      src={userData.avatar} 
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                    {userData.name}
                  </h1>
                  <p className="text-text-secondary flex items-center space-x-2">
                    <Icon name="Calendar" size={16} />
                    <span>Member since {new Date(userData.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-text-secondary">
                    <span className="flex items-center space-x-1">
                      <Icon name="MessageSquare" size={14} />
                      <span>{userData.totalPosts} posts</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Target" size={14} />
                      <span>{userData.totalStrategies} strategies</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{userData.followers.toLocaleString()} followers</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex items-center space-x-3">
                {hasUnsavedChanges && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 text-warning text-sm"
                  >
                    <Icon name="AlertCircle" size={16} />
                    <span>Unsaved changes</span>
                  </motion.div>
                )}
                
                <motion.button
                  onClick={handleSave}
                  disabled={!hasUnsavedChanges || isSaving}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    hasUnsavedChanges && !isSaving
                      ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90' :'bg-surface text-text-secondary cursor-not-allowed'
                  }`}
                  whileHover={hasUnsavedChanges ? { scale: 1.02 } : {}}
                  whileTap={hasUnsavedChanges ? { scale: 0.98 } : {}}
                >
                  {isSaving ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </motion.button>

                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center space-x-2 text-success text-sm"
                    >
                      <Icon name="CheckCircle" size={16} />
                      <span>Saved!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="glass-card rounded-lg p-1">
              <div className="flex flex-wrap gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default UserProfileSettings;