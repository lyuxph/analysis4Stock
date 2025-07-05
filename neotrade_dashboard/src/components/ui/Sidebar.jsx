import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userSubscription, setUserSubscription] = useState('premium'); // 'free', 'premium'
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/portfolio-dashboard',
      tooltip: 'Portfolio overview and performance tracking',
      activePattern: '/portfolio-dashboard'
    },
    {
      label: 'Markets',
      icon: 'TrendingUp',
      path: '/stock-detail-analysis',
      tooltip: 'Individual stock analysis and market data',
      activePattern: '/stock-detail-analysis'
    },
    {
      label: 'Community',
      icon: 'Users',
      path: '/community-investment-forum',
      tooltip: 'Public forum discussions and social trading',
      activePattern: '/community-investment-forum'
    },
    {
      label: 'Strategies',
      icon: 'Target',
      path: '/premium-strategy-hub',
      tooltip: 'Premium strategy sharing and analysis',
      activePattern: '/premium-strategy-hub',
      premiumRequired: true
    },
    {
      label: 'Profile',
      icon: 'Settings',
      path: '/user-profile-settings',
      tooltip: 'Account management and settings',
      activePattern: '/user-profile-settings'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (item) => {
    return location.pathname === item.path || location.pathname.startsWith(item.activePattern);
  };

  const handleNavigation = (item) => {
    if (item.premiumRequired && userSubscription === 'free') {
      // Show premium upgrade modal or redirect
      return;
    }
    navigate(item.path);
  };

  const handleUpgrade = () => {
    // Handle premium upgrade flow
    console.log('Upgrade to premium');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-surface/95 backdrop-blur-glass border-r border-glass-border z-100 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-glass-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} color="white" />
                </div>
                <span className="text-lg font-heading font-semibold text-text-primary">
                  InvestPro
                </span>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-surface/50 transition-colors"
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={16} 
                className="text-text-secondary" 
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const active = isActive(item);
              const isPremiumLocked = item.premiumRequired && userSubscription === 'free';
              
              return (
                <div key={item.path} className="relative group">
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      active 
                        ? 'bg-primary/10 border-l-2 border-primary text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                    } ${isPremiumLocked ? 'opacity-60' : ''}`}
                    title={isCollapsed ? item.tooltip : ''}
                  >
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className={active ? 'text-primary' : 'text-current'} 
                    />
                    {!isCollapsed && (
                      <>
                        <span className="font-medium">{item.label}</span>
                        {isPremiumLocked && (
                          <Icon name="Lock" size={14} className="text-warning ml-auto" />
                        )}
                      </>
                    )}
                  </button>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-surface border border-glass-border rounded text-sm text-text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-200">
                      {item.label}
                      {isPremiumLocked && ' (Premium)'}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Premium Upgrade */}
          {userSubscription === 'free' && !isCollapsed && (
            <div className="p-4 border-t border-glass-border">
              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Crown" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-text-primary">Upgrade to Premium</span>
                </div>
                <p className="text-xs text-text-secondary mb-3">
                  Unlock advanced strategies and exclusive content
                </p>
                <button
                  onClick={handleUpgrade}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 px-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          )}

          {/* Connection Status */}
          <div className="p-4 border-t border-glass-border">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full pulse-glow"></div>
              {!isCollapsed && (
                <span className="text-xs text-text-secondary">Live Market Data</span>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-glass border-t border-glass-border z-100 lg:hidden">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const active = isActive(item);
            const isPremiumLocked = item.premiumRequired && userSubscription === 'free';
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  active ? 'text-primary' : 'text-text-secondary'
                } ${isPremiumLocked ? 'opacity-60' : ''}`}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className="text-current" 
                  />
                  {isPremiumLocked && (
                    <Icon 
                      name="Lock" 
                      size={10} 
                      className="absolute -top-1 -right-1 text-warning bg-surface rounded-full" 
                    />
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;