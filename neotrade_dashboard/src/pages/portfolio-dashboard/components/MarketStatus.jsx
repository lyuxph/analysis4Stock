import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MarketStatus = ({ lastUpdate }) => {
  const [marketStatus, setMarketStatus] = useState('open');
  const [timeToNext, setTimeToNext] = useState('');

  useEffect(() => {
    const updateMarketStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinute;
      
      // Market hours: 9:30 AM - 4:00 PM EST (570 - 960 minutes)
      const marketOpen = 9 * 60 + 30; // 9:30 AM
      const marketClose = 16 * 60; // 4:00 PM
      
      if (currentTime >= marketOpen && currentTime < marketClose) {
        setMarketStatus('open');
        const minutesToClose = marketClose - currentTime;
        const hoursToClose = Math.floor(minutesToClose / 60);
        const minsToClose = minutesToClose % 60;
        setTimeToNext(`Closes in ${hoursToClose}h ${minsToClose}m`);
      } else {
        setMarketStatus('closed');
        let minutesToOpen;
        if (currentTime < marketOpen) {
          minutesToOpen = marketOpen - currentTime;
        } else {
          minutesToOpen = (24 * 60) - currentTime + marketOpen;
        }
        const hoursToOpen = Math.floor(minutesToOpen / 60);
        const minsToOpen = minutesToOpen % 60;
        setTimeToNext(`Opens in ${hoursToOpen}h ${minsToOpen}m`);
      }
    };

    updateMarketStatus();
    const interval = setInterval(updateMarketStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (marketStatus) {
      case 'open': return 'text-success';
      case 'closed': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = () => {
    switch (marketStatus) {
      case 'open': return 'Circle';
      case 'closed': return 'CircleOff';
      default: return 'Circle';
    }
  };

  const getStatusBg = () => {
    switch (marketStatus) {
      case 'open': return 'bg-success/10 border-success/20';
      case 'closed': return 'bg-error/10 border-error/20';
      default: return 'bg-surface/10 border-glass-border';
    }
  };

  return (
    <div className="mb-6">
      <div className={`glass-card rounded-lg p-4 border ${getStatusBg()}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon 
                name={getStatusIcon()} 
                size={20} 
                className={`${getStatusColor()} ${marketStatus === 'open' ? 'pulse-glow' : ''}`}
              />
              {marketStatus === 'open' && (
                <div className="absolute inset-0 animate-ping">
                  <Icon name="Circle" size={20} className="text-success opacity-75" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-text-primary">
                  US Markets
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${
                  marketStatus === 'open' ?'bg-success/20 text-success' :'bg-error/20 text-error'
                }`}>
                  {marketStatus}
                </span>
              </div>
              <div className="text-sm text-text-secondary">
                {timeToNext}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-text-secondary">Last Update</div>
            <div className="font-medium text-text-primary">
              {lastUpdate.toLocaleTimeString('en-US', { 
                hour12: true, 
                hour: 'numeric', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>

        {/* Market indices preview */}
        <div className="mt-4 pt-4 border-t border-glass-border">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xs text-text-secondary mb-1">S&P 500</div>
              <div className="font-semibold text-text-primary">4,567.89</div>
              <div className="flex items-center justify-center space-x-1 text-xs text-success">
                <Icon name="TrendingUp" size={10} />
                <span>+0.85%</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-text-secondary mb-1">NASDAQ</div>
              <div className="font-semibold text-text-primary">14,234.56</div>
              <div className="flex items-center justify-center space-x-1 text-xs text-success">
                <Icon name="TrendingUp" size={10} />
                <span>+1.23%</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-text-secondary mb-1">DOW</div>
              <div className="font-semibold text-text-primary">34,567.12</div>
              <div className="flex items-center justify-center space-x-1 text-xs text-error">
                <Icon name="TrendingDown" size={10} />
                <span>-0.34%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketStatus;