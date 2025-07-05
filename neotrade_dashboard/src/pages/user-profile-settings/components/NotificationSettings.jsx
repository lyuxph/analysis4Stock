import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const NotificationSettings = ({ userData, onDataChange }) => {
  const [notifications, setNotifications] = useState({
    portfolio: {
      priceAlerts: true,
      dailyReports: true,
      weeklyReports: false,
      performanceAlerts: true,
      dividendAlerts: true
    },
    forum: {
      newReplies: true,
      mentions: true,
      newFollowers: false,
      trendingPosts: false,
      weeklyDigest: true
    },
    market: {
      breakingNews: true,
      marketOpen: false,
      marketClose: false,
      volatilityAlerts: true,
      economicEvents: true
    },
    strategies: {
      newStrategies: true,
      strategyUpdates: false,
      performanceAlerts: true,
      premiumContent: true
    }
  });

  const [deliveryMethods, setDeliveryMethods] = useState({
    email: true,
    push: true,
    sms: false,
    inApp: true
  });

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    start: '22:00',
    end: '08:00',
    timezone: 'America/New_York'
  });

  const notificationCategories = [
    {
      id: 'portfolio',
      title: 'Portfolio & Investments',
      description: 'Notifications about your portfolio performance and holdings',
      icon: 'TrendingUp',
      settings: [
        { key: 'priceAlerts', label: 'Price Alerts', description: 'When stocks hit your target prices' },
        { key: 'dailyReports', label: 'Daily Reports', description: 'Daily portfolio performance summary' },
        { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly portfolio analysis' },
        { key: 'performanceAlerts', label: 'Performance Alerts', description: 'Significant gains or losses' },
        { key: 'dividendAlerts', label: 'Dividend Alerts', description: 'Dividend payments and announcements' }
      ]
    },
    {
      id: 'forum',
      title: 'Community & Forum',
      description: 'Notifications about forum activity and social interactions',
      icon: 'Users',
      settings: [
        { key: 'newReplies', label: 'New Replies', description: 'Replies to your posts and comments' },
        { key: 'mentions', label: 'Mentions', description: 'When someone mentions you in a post' },
        { key: 'newFollowers', label: 'New Followers', description: 'When someone follows your profile' },
        { key: 'trendingPosts', label: 'Trending Posts', description: 'Popular discussions in your interests' },
        { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Summary of top forum activity' }
      ]
    },
    {
      id: 'market',
      title: 'Market & News',
      description: 'Real-time market updates and financial news',
      icon: 'Globe',
      settings: [
        { key: 'breakingNews', label: 'Breaking News', description: 'Important market-moving news' },
        { key: 'marketOpen', label: 'Market Open', description: 'Daily market opening notifications' },
        { key: 'marketClose', label: 'Market Close', description: 'Daily market closing summary' },
        { key: 'volatilityAlerts', label: 'Volatility Alerts', description: 'High volatility in your holdings' },
        { key: 'economicEvents', label: 'Economic Events', description: 'Important economic announcements' }
      ]
    },
    {
      id: 'strategies',
      title: 'Investment Strategies',
      description: 'Updates about investment strategies and premium content',
      icon: 'Target',
      settings: [
        { key: 'newStrategies', label: 'New Strategies', description: 'New investment strategies published' },
        { key: 'strategyUpdates', label: 'Strategy Updates', description: 'Updates to strategies you follow' },
        { key: 'performanceAlerts', label: 'Performance Alerts', description: 'Strategy performance milestones' },
        { key: 'premiumContent', label: 'Premium Content', description: 'New premium strategy content' }
      ]
    }
  ];

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  const handleNotificationToggle = (category, setting) => {
    const newNotifications = {
      ...notifications,
      [category]: {
        ...notifications[category],
        [setting]: !notifications[category][setting]
      }
    };
    setNotifications(newNotifications);
    onDataChange({ notifications: newNotifications });
  };

  const handleDeliveryMethodToggle = (method) => {
    const newMethods = {
      ...deliveryMethods,
      [method]: !deliveryMethods[method]
    };
    setDeliveryMethods(newMethods);
    onDataChange({ deliveryMethods: newMethods });
  };

  const handleQuietHoursChange = (field, value) => {
    const newQuietHours = {
      ...quietHours,
      [field]: value
    };
    setQuietHours(newQuietHours);
    onDataChange({ quietHours: newQuietHours });
  };

  return (
    <div className="space-y-8">
      {/* Delivery Methods */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Delivery Methods</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(deliveryMethods).map(([method, enabled]) => (
            <div key={method} className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={method === 'email' ? 'Mail' : method === 'push' ? 'Bell' : method === 'sms' ? 'MessageSquare' : 'Monitor'} 
                  size={20} 
                  className={enabled ? 'text-primary' : 'text-text-secondary'} 
                />
                <span className="font-medium text-text-primary capitalize">{method}</span>
              </div>
              <button
                onClick={() => handleDeliveryMethodToggle(method)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  enabled ? 'bg-primary' : 'bg-surface'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Quiet Hours</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-text-primary">Enable Quiet Hours</h4>
              <p className="text-sm text-text-secondary">Pause non-urgent notifications during specified hours</p>
            </div>
            <button
              onClick={() => handleQuietHoursChange('enabled', !quietHours.enabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                quietHours.enabled ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                quietHours.enabled ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {quietHours.enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-glass-border"
            >
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Start Time</label>
                <input
                  type="time"
                  value={quietHours.start}
                  onChange={(e) => handleQuietHoursChange('start', e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">End Time</label>
                <input
                  type="time"
                  value={quietHours.end}
                  onChange={(e) => handleQuietHoursChange('end', e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Timezone</label>
                <select
                  value={quietHours.timezone}
                  onChange={(e) => handleQuietHoursChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Notification Categories */}
      {notificationCategories.map((category) => (
        <div key={category.id} className="glass-card p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={category.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-text-primary">{category.title}</h3>
              <p className="text-sm text-text-secondary">{category.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            {category.settings.map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-text-primary">{setting.label}</h4>
                  <p className="text-sm text-text-secondary">{setting.description}</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle(category.id, setting.key)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    notifications[category.id][setting.key] ? 'bg-primary' : 'bg-surface'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    notifications[category.id][setting.key] ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Test Notifications */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Test Notifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/20 transition-colors">
            <Icon name="Bell" size={20} />
            <span>Send Test Push</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary hover:bg-secondary/20 transition-colors">
            <Icon name="Mail" size={20} />
            <span>Send Test Email</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;