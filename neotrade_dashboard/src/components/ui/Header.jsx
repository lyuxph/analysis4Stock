import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'portfolio', message: 'AAPL position up 2.3%', time: '2 min ago', read: false },
    { id: 2, type: 'forum', message: 'New reply to your post', time: '5 min ago', read: false },
    { id: 3, type: 'strategy', message: 'Premium strategy alert', time: '10 min ago', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'delayed': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return 'Wifi';
      case 'delayed': return 'WifiOff';
      case 'disconnected': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  const handleNotificationClick = (notification) => {
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    setShowNotifications(false);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-100 bg-surface/95 backdrop-blur-glass border-b border-glass-border">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-text-primary">
              InvestPro
            </span>
          </div>

          {/* Center - Real-time Status */}
          <div className="hidden md:flex items-center space-x-2 glass-card px-3 py-2 rounded-lg">
            <Icon 
              name={getStatusIcon()} 
              size={16} 
              className={`${getStatusColor()} ${connectionStatus === 'connected' ? 'pulse-glow' : ''}`}
            />
            <span className="text-sm text-text-secondary">
              Live • {formatTime(lastUpdate)}
            </span>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="nav-item p-2 rounded-lg glass-hover"
              title="Search (⌘K)"
            >
              <Icon name="Search" size={20} className="text-text-secondary" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="nav-item p-2 rounded-lg glass-hover relative"
              >
                <Icon name="Bell" size={20} className="text-text-secondary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 glass-card rounded-lg shadow-strong animate-fade-in-up z-200">
                  <div className="p-4 border-b border-glass-border">
                    <h3 className="font-heading font-semibold text-text-primary">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto scrollbar-hide">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-4 border-b border-glass-border cursor-pointer hover:bg-surface/50 transition-colors ${
                          !notification.read ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-primary' : 'bg-text-secondary/30'}`} />
                          <div className="flex-1">
                            <p className="text-sm text-text-primary">{notification.message}</p>
                            <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4 glass-card rounded-lg shadow-strong animate-scale-in">
            <div className="p-4 border-b border-glass-border">
              <div className="flex items-center space-x-3">
                <Icon name="Search" size={20} className="text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search stocks, strategies, forum posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-text-primary placeholder-text-secondary outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="text-xs text-text-secondary uppercase tracking-wide">Recent Searches</div>
                <div className="space-y-1">
                  {['AAPL', 'Tesla Growth Strategy', 'Market Analysis'].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface/50 cursor-pointer">
                      <Icon name="Clock" size={16} className="text-text-secondary" />
                      <span className="text-text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside handlers */}
      {(showNotifications || showSearch) && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => {
            setShowNotifications(false);
            setShowSearch(false);
          }}
        />
      )}
    </>
  );
};

export default Header;